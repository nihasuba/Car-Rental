import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

//Check Availability of car for a given Date
export const checkAvailability = async (car, pickupDate,returnDate) => {
    try {
        const bookings = await Booking.find({
            car,
            pickupDate:{$lte:returnDate},
            returnDate:{$gte:pickupDate}
        })
        return bookings.length === 0; // If no bookings found, car is available
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
        
    }
}

// Api to check availability of cars for the given date range
export const checkCarAvailability = async (req, res) => {
    try {
        const{location,pickupDate,returnDate} = req.body;
        // fetch all available cars in the given location
        const cars = await Car.find({location,isAvailable:true});
        // check for availability for the given date using promise
        const  availableCarsPromises = cars.map(async(car)=>{
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
            return{...car._doc, isAvailable : isAvailable};
        })
        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true);
        res.json({ success: true, availableCars });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
        
    }
}



//Book the Car API
export const createBooking = async (req, res) => {
    try {
        const{_id} = req.user;
        const {car,pickupDate,returnDate} = req.body;
        const isAvailable = await checkAvailability(car,pickupDate,returnDate)
        if(!isAvailable){
            return res.json({success:false, message:"Car is not Available"})
        }
        const carData = await Car.findById({car})
        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)
        const noOfDays = Math.ceil(returned-picked)/(1000*60*60*24)
        const price = carData.pricePerDay*noOfDays;
        await Booking.create({car,owner:carData.owner,user:_id,pickupDate,returnDate,price});
        res.json({ success: true, message: "Car booked successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
        
    }
}


//Api to list bookings
export const getUserBooking = async(req,res)=>{
    try {
        const{_id} = req.user;
        const bookings = await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
        res.json({success:true,bookings})
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
    }
}

//Api to getOwnerBookings
export const getOwnerBooking = async(req,res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.json({ success: false, message: "UnAuthorized" });
        }
        const bookings = await Booking.find({owner:req.user._id}).populate("car user").select("-user.password").sort({createdAt:-1})
        res.json({success:true,bookings})
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
    }
}

//Api change to booking status
export const changeBookingStatus = async(req,res)=>{
    try {
        const{_id} = req.user;
        const {bookingId,status} = req.body
        const booking = await Booking.findById(bookingId);
        if(booking.owner.toString !==_id.toString){
            return res.json({ success: false, message: "UnAuthorized" });
        }
        booking.status = status
        await booking.save();
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
    }
}

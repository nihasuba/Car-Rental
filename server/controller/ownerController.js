import Car from '../models/Car.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import fs, { access } from 'fs';
import imagekit from '../config/imagekit.js';
import Booking from '../models/Booking.js';



export const changeRoleToOwner = async (req, res) => {
    try {
        const {_id} = req.user;
        //printf("Changing role to owner for user with ID: %s", req.user);
        await User.findByIdAndUpdate(_id,{role:"owner"});
        res.json({ success: true, message: "Role changed to owner && You can List Cars" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
        
    }
}
//Add-Car Api 
export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        //upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/cars"
        })

        // optimization through imagekit url transformation
        var optimizediImageURL = imagekit.url({
            path : response.filePath,
            transformation : [
                {width:'1280'},
                {quality: 'auto'},
                {format: 'webp'}
            ]
        });
        const image = optimizediImageURL;
        await Car.create({...car,owner:_id, image});
        res.json({ success: true, message: "Car Added Successfully" });
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
        
    }
}

// List Cars Api
export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id });
        res.json({ success: true, cars });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
        
    }
    
}

// APIto Toggle Car Availability
export const toggleCarAvailability = async (req, res) => {
    try {
        const{_id} = req.user;
        const{carId} = req.body;
        const car = await Car.findById(carId);
        //checking the car belongs to user
        if(car.owner.toString() !== _id.toString()){
            return res.json({success:false, message:"You are not authorized to change this car's availability"})
        }
        car.isAvailable = !car.isAvailable;
        await car.save();
        res.json({success:true, car})
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
        
    }
}

//delete car API
export const deleteCar = async (req, res) => {
    try {
        const{_id} = req.user;
        const{carId} = req.body;
        const car = await Car.findById(carId);
        //checking the car belongs to user
        if(car.owner.toString() !== _id.toString()){
            return res.json({success:false, message:"You are not authorized to change this car's availability"})
        }
        car.owner = null;
        car.isAvailable = false;
        await car.save();
        res.json({success:true, car})
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
        
    }
}

//API to get Dashboard Data
export const getDashboardData = async (req, res) => {
    try {
        const{_id,role} = req.user;
        if(role!== "owner"){
            return res.json({success:false, message:"You are not authorized to access this data"})
        }
        const cars = await Car.find({owner:_id});
        const bookings = await Booking.find({owner:_id}).populate("car").sort({createdAt:-1});
        const pendingBookings = await Booking.find({owner:_id, status:"pending"});
        const completedBookings = await Booking.find({owner:_id, status:"confirmed"})
        const monthlyRevenue= bookings.slice().filter((booking) => {booking.status === 'confirmed'}).reduce(acc,booking => acc + booking.price, 0);
        const dashboardData = {
            toggleCarAvailability: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        }
        res.json({success:true, dashboardData})
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
        
    }
}

//uploadImage Api
export const updateUserImage = async (req, res) => {
    try {
        const{_id} = req.user;
        const imageFile = req.file;
        //upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/users"
        })

        // optimization through imagekit url transformation
        var optimizediImageURL = imagekit.url({
            path : response.filePath,
            transformation : [
                {width:'1280'},
                {quality: 'auto'},
                {format: 'webp'}
            ]
        });
        const image = optimizediImageURL;
        await User.findByIdAndUpdate(_id, {image});
        res.json({ success: true, message: "Image uploaded successfully", image });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error: error.stack });
        
    }
}

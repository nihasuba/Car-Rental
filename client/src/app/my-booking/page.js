"use client";
import Image from "next/image";
import { assets, dummyMyBookingsData } from "@/assets/assets";
import { useEffect, useState } from "react";


const MyBookings = () => {
    const [bookings ,setBookings] = useState([])
    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const fetchMyBookings = async () =>{
        setBookings(dummyMyBookingsData)
    }
    useEffect(()=>{
        fetchMyBookings();
    },[])

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-12 mb-32">
        <Title  title="My Bookings" subTitle="View and manage your car bookings"/>
        <div className="flex flex-col gap-8">
            {bookings.map((booking,index) => (
            <div key={booking._id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6 md:items-center shadow-sm">
                <div className="md:cols-span-1">
                    <div className="rounded-md overflow-hidden mb-3">
                        <Image src = {booking.image.car} alt="" className="w-full h-auto"/>
                    </div>
                    <p className="text-lg font-medium mt-2">{booking.car.brand}. {booking.car.model}</p>
                    <p className="text-gray-500">{booking.car.year}. {booking.car.category}. {booking.car.location}</p>
                </div>
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                        <p className="px-3 py-1.5 bg-light rounded">Booking #{index+1}</p>
                        <p className={`px-3 py-1 text-xs rounded-full ${booking.status === 'confirmed' ? 'bg-green-400/15 text-green-600':'bg-red-400/15'}`}>{booking.status}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <Image src = {assets.calendar_icon_colored} alt="" className="w-4 h-4 mt-1"/>
                        <div>
                            <p className="text-gray-500">Rental Period</p>
                            <p>{booking.pickupDate.split('T')[0]}To {booking.returnDate.split('T')[0]}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <Image src = {assets.location_icon_colored} alt="" className="w-4 h-4 mt-1"/>
                        <div>
                            <p className="text-gray-500">Pickup Location</p>
                            <p>{booking.car.location}</p>
                        </div>
                    </div>
                </div>
                <div className="md-col-span-1 flex flex-col justify-between gap-6">
                    <div className="text-sm text-gray-500 text-right">
                        <p>Total Price</p>
                        <h1 className="text-2xl font-semibold text-primary">{currency}{booking.price}</h1>
                        <p>Booked On {booking.createdAt.split('T')[0]}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
            
        
      
    
  );
}
export default MyBookings;
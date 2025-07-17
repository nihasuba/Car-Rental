"use client";
import Image from "next/image";
import { assets, dummyMyBookingsData } from "@/assets/assets";
import { useEffect, useState } from "react";
import Title from "@/components/title";

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
                {/* Car Info - left */}
                <div className="min-w-[220px] md:w-[220px] flex-shrink-0">
                    <div className="rounded-md overflow-hidden mb-3">
                        <Image src = {booking.car.image} alt="" className="w-full h-auto"/>
                    </div>
                    <p className="text-lg font-medium mt-2">{booking.car.brand} {booking.car.model}</p>
                    <p className="text-gray-500 text-sm">{booking.car.year} • {booking.car.category} • {booking.car.location}</p>
                </div>
                {/* Booking Details - center */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="px-3 py-1.5 bg-light rounded text-xs font-medium">Booking #{index+1}</p>
                        <p className={`px-3 py-1 text-xs rounded-full font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{booking.status}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <Image src = {assets.calendar_icon_colored} alt="" className="w-4 h-4 mt-1"/>
                        <div>
                            <p className="text-gray-500 text-xs">Rental Period</p>
                            <p className="text-sm">{booking.pickupDate.split('T')[0]} - {booking.returnDate.split('T')[0]}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <Image src = {assets.location_icon_colored} alt="" className="w-4 h-4 mt-1"/>
                        <div>
                            <p className="text-gray-500 text-xs">Pick-up Location</p>
                            <p className="text-sm">{booking.car.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <Image src = {assets.location_icon_colored} alt="" className="w-4 h-4 mt-1"/>
                        <div>
                            <p className="text-gray-500 text-xs">Return Location</p>
                            <p className="text-sm">{booking.car.location}</p>
                        </div>
                    </div>
                </div>
                {/* Total Price - right */}
                <div className="min-w-[140px] md:w-[140px] flex flex-col justify-center items-end text-right">
                    <div className="text-sm text-gray-500">
                        <p className="font-medium">Total Price</p>
                        <h1 className="text-2xl font-semibold text-primary">{currency}{booking.price}</h1>
                        <p className="text-xs mt-2">Booked on {booking.createdAt.split('T')[0]}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
}
export default MyBookings;
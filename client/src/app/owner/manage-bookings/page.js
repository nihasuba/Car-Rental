"use client"
import { assets, dummyCarData, dummyMyBookingsData } from "@/assets/assets";
import OwnerTitle from "@/components/ownertitle";
import { useEffect, useState } from "react";
import Image from "next/image";


const ManageBookingsPage = () => {
  
  const [bookings, setBookings] = useState([])
  const fetchOwnerBooking = async() => {
    setBookings(dummyMyBookingsData)
  }
  
  useEffect(()=>{
    fetchOwnerBooking();
  },[])

  const currency= process.env.NEXT_PUBLIC_CURRENCY || "Rs.";

  return (
    <div className="px-4 pt-10 md:px-1- w-full">
      <OwnerTitle title="Manage bookings" subTitle=" Track All Customers bookings,approve or cancel request, and manage booking status"/>
      
      <div className='max-w-3x1 w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
        <thead className='text-gray-500'>
        <tr>
        <th className="p-3 font-medium">Car</th>
        <th className="p-3 font-medium max-md:hidden">DateRange</th>
        <th className="p-3 font-medium">Total</th>
        <th className="p-3 font-medium max-md:hidden">Payment</th>
        <th className="p-3 font-medium">Actions</th>
        </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="border-t border-borderColor text-gray-500">
              <td className="p-3 flex items-center gap-3">
                <Image src={booking.car.image} alt="" className="h-12 w-12 aspect-square rounded-md object-cover" />
                <p className="font-medium max-md:hidden"> {booking.car.brand} {booking.car.model}</p>
              </td>
              <td className="p-3 max-md:hidden">
                {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
              </td>
              <td className="p-3">{currency} {booking.price}</td>
              <td className="p-3 max-md:hidden">
                <span className='px-3 py-1 rounded-full bg-gray-100 text-xs'>
                  offline
                </span>
              </td>
              <td className=" p-3">
                {booking.status === 'pending' ? (<select value={booking.status} className="px-2 py-1.5 mt-1 text-gray-500 border-t border-borderColor rounded-md outline-none">
                  <option value='pending'>Pending</option>
                  <option value='cancelled'>Cancelled</option>
                  <option value='confirmed'>Confirmed</option>
                </select>):(
                  <span className={`px-3 py-1 rounded-full font-semibold  text-xs ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' :
                    'bg-red-100 text-red-500'
                  }`}>
                    {booking.status}
                  </span>
                )}
               
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
       
    </div>
  );
};


export default ManageBookingsPage;

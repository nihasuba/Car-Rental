"use client"
import { assets, dummyCarData } from "@/assets/assets";
import OwnerTitle from "@/components/ownertitle";
import { useEffect, useState } from "react";
import Image from "next/image";

const ManageCarsPage = () => {
  const [cars,setCar] = useState([])
  const fetchOwnerCars = async() => {
    setCar(dummyCarData)
  }
  useEffect(()=>{
    fetchOwnerCars();
  },[])

  const currency= process.env.NEXT_PUBLIC_CURRENCY || "Rs.";
  
  return (
    <div className="px-4 pt-10 md:px-1- w-full">
      <OwnerTitle title="Manage Cars" subTitle=" View All listed cars, update their details, or remove them from the booking platform"/>
      
      <div className='max-w-3x1 w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
        <thead className='text-gray-500'>
        <tr>
        <th className="p-3 font-medium">Car</th>
        <th className="p-3 font-medium max-md:hidden">Category</th>
        <th className="p-3 font-medium">Price</th>
        <th className="p-3 font-medium max-md:hidden">Status</th>
        <th className="p-3 font-medium">Actions</th>
        </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={index} className="border-t border-borderColor">
              <td className="p-3 flex items-center gap-3">
                <Image src={car.image} alt="" className="h-12 w-12 aspect-square rounded-md object-cover" />
                <div className="max-md:hidden">
                  <p className="font-medium">{car.brand} {car.model}</p>
                  <p className="font-medium">{car.seating_capacity}.{car.transmission}</p>
                </div>
              </td>
              <td className="p-3 max-md:hidden">{car.category}</td>
              <td className="p-3">{currency} {car.pricePerDay}</td>
              <td className="p-3 max-md:hidden">
                <span className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                  {car.isAvailable ? "Available" : "UnAvailable"}
                </span>
              </td>
              <td className="flex items-center p-3">
                <Image src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="" className="cursor-pointer"/>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
       
    </div>
  );
};

export default ManageCarsPage;

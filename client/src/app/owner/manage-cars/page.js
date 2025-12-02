"use client"
import { assets, dummyCarData } from "@/assets/assets";
import OwnerTitle from "@/components/ownertitle";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ManageCarsPage = () => {

  const {axios, currency, isOwner, route} = useAppContext();
  
  const [cars,setCar] = useState([])
  const fetchOwnerCars = async() => {
    try {
      const {data} = await axios.get('api/owner/cars');
      if(data.success) {
        setCar(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const toggleAvailability = async(carId) => {
    try {
      const {data} = await axios.get('api/owner/toggle-car', {carId});
      if(data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching cars:", error);
    }
  }
  const deleteCar = async(carId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this car?");
      if(!confirm) return null;
      const {data} = await axios.get('api/owner/delete-car', {carId});
      if(data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching cars:", error);
    }
  }

  useEffect(()=>{
    isOwner && fetchOwnerCars();
  },[isOwner])

  
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="px-4 pt-10 md:px-1- w-full"
    >
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
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
              className="border-t border-borderColor"
            >
              <td className="p-3 flex items-center gap-3">
                <Image src={car.image} alt="" width={48} height={48} className="h-12 w-12 aspect-square rounded-md object-cover" />
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
                <Image  onClick= {()=>toggleAvailability(car._id)} src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="" className="cursor-pointer" />
                <Image  onClick={()=>deleteCar(car._id)}src={assets.delete_icon} alt="" className="cursor-pointer" />
              </td>
            </motion.tr>
          ))}
        </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageCarsPage;

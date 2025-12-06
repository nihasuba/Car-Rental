"use client"
import { assets, cityList } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import {motion} from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [pickupLocation, setPickupLocation] = useState('')
  const router = useRouter();
  const {pickupDate, setPickupDate, returnDate, setReturnDate} = useAppContext()
  const handleSearch = (e)=>{
    e.preventDefault()
    router.push('/cars?pickupLocation=' + pickupLocation + "&pickupDate=" + pickupDate + '&returnDate=' + returnDate)
  }
  return (
    <motion.div 
    initial={{  opacity: 0 }}
    animate={{  opacity: 1 }}  
    transition={{ duration: 0.8, delay: 0.2  }}
    className="min-h-screen flex flex-col items-center justify-center gap-6 bg-light text-center p-24">
      <motion.h1 initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
      className="text-4xl md:text-4xl font-semibold">Luxury cars on Rent</motion.h1>
      <motion.form onSubmit={handleSearch}
      initial={{ y: 50, opacity: 0,scale:0.95 }}
      animate={{ y: 0, opacity: 1, scale:1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-lg md:rounded-full  max-w-160 md:max-w-200 bg-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8"> 
          <div>
            <select required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)}>
              <option value="">Pickup Location</option>
              {cityList.map((city) =><option key={city} value={city}>{city}</option>)}
            </select>
            <p className="px-1 text-sm text-gray-500">{pickupLocation ? pickupLocation :'Please Select location'}</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date">Pickup-Date</label>
            <input type='date' value={pickupDate} onChange={e=>setPickupDate(e.target.value)} id="pickup-date" min={new Date().toISOString().split('T')[0]} className="text-sm text-gray-500" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date">Return-Date</label>
            <input type='date' value={returnDate} onChange={e=>setReturnDate(e.target.value)}  id="return-date" min={new Date().toISOString().split('T')[0]} className="text-sm text-gray-500" />
          </div>
        </div>
        <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className="flex items-center justify-center gap-2 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primarydull text-white rounded-full cursor-pointer">
            <motion.div
                initial={{ y:100, opacity: 0 }}  
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <Image src={assets.search_icon} alt="Search" className="brightness-300 "/>
            </motion.div>
            Search
          </motion.button>
      </motion.form>
      <Image src={assets.main_car} alt="car" className="max-h-74"/>
    </motion.div>
  );
}

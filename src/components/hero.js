"use client"
import { assets, cityList } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [pickupLocation, setPickupLocation] = useState('')
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-light text-center p-24">
      <h1 className="text-4xl md:text-4xl font-semibold">Luxury cars on Rent</h1>
      <form className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-lg md:rounded-full  max-w-160 md:max-w-200 bg-white shadow-lg">
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
            <input type='date' id="pickup-date" min={new Date().toISOString().split('T')[0]} className="text-sm text-gray-500" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date">Return-Date</label>
            <input type='date' id="return-date" min={new Date().toISOString().split('T')[0]} className="text-sm text-gray-500" />
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primarydull text-white rounded-full cursor-pointer">
            <Image src={assets.search_icon} alt="Search" className="brightness-300"/>
            Search
          </button>
      </form>
      <Image src={assets.main_car} alt="car" className="max-h-74"/>
    </div>
  );
}

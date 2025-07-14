"use client";
import { assets, dummyCarData } from "@/assets/assets";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const CarDetail = () => {
  const { id } = useParams();
  const route = useRouter();
  const [car, setCar] = useState(null);

  useEffect(() => {
    setCar(dummyCarData.find(car => car._id === id));
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 mb-32">
      <button 
        onClick={() => route.back()} 
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <Image src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <Image 
            src={car.image} 
            alt="" 
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <div>
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
              <p className="text-lg text-gray-500">{car.category} {car.year}</p>
            </div>
            <hr className="border-border my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {icon: assets.users_icon, text: `${car.seating_capacity} Seats`},
                {icon: assets.fuel_icon, text: car.fuel_type},
                {icon: assets.car_icon, text: car.transmission},
                {icon: assets.location_icon, text: car.location},
              ].map(({icon, text}, index) => (
                <div key={index} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <Image src={icon} alt="" className='h-5 mb-2'/>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            
            {/* Description */}
            <div className="mt-8">
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{car.description}</p>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item) => (
                  <li key={item} className='flex items-center text-gray-500'>
                    <Image src={assets.check_icon} className='h-4 mr-2' alt="" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="lg:col-span-1">
          <form className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
            <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
              $ {car.pricePerDay}
              <span className='text-base text-gray-400 font-normal'>per day</span>
            </p>

            <hr className='border-borderColor my-6'/>

            <div className='flex flex-col gap-2'>
              <label htmlFor="pickup-date">Pickup Date</label>
              <input 
                type="date" 
                className='border border-borderColor px-3 py-2 rounded-lg' 
                required 
                id='pickup-date' 
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="return-date">Return Date</label>
              <input 
                type="date" 
                className='border border-borderColor px-3 py-2 rounded-lg' 
                required 
                id='return-date'
              />
            </div>

            <button 
              type="submit"
              className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'
            >
              Book Now
            </button>

            <p className='text-center text-sm'>No credit card required to reserve</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
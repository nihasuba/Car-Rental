"use client"
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="flex flex-col mb-12 md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden">
          <div className="space-y-8 text-white p-8">
            <div className="space-y-4 text-white">
              <h2 className="text-xl md:text-2xl font-bold ">
                Do You Own a Luxury Car?
              </h2>
            </div>
            
            <p className="text-md leading-relaxed max-w-lg">
              Discover our premium collection of luxury vehicles. From sleek sedans to powerful SUVs, 
              we offer the perfect ride for every occasion. Book your dream car today and enjoy 
              exceptional service and comfort.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <Link href="/cars" className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primarydull text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                <Image src={assets.car_icon} alt="Car" className=" text-white w-5 h-5 mr-2" />
                List Your Cars
              </Link>
            </div>
          </div>
          
          
            <div className="relative z-10 p-16">
              <Image 
                src={assets.banner_car_image} 
                alt="Luxury Car" 
                className="w-full h-auto"
                priority
              />
            </div>
          
      </div>
  );
}
"use client"
import { assets, dummyCarData } from "@/assets/assets"
import CarCard from "@/components/carcard";
import Title from "@/components/title"
import { useState } from "react"
import Image from "next/image"

const CarsPage = () => {
  const [input, setInput] = useState("");
  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4 mb-6">
        <Title  title="Available Cars" subTitle="Browse Our Selection of Premium Vehicles available for you next adventure"/>
        <div className="flex items-center bg-white px-4 mt-6 max-w-80 w-full h-12 rounded-full shadow">
          <Image src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2"/>
          <input type="text" onChange={(e)=> setInput(e.target.value)} value={input} placeholder="Search" className="w-full outline-none text-gray-500" />
          <Image src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2"/>
        </div>
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p>Showing { dummyCarData.length}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {dummyCarData.map((car,index)=>(
            <div key={index}>
              <CarCard car={car}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarsPage
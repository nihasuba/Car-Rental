"use client"
import { assets, dummyCarData } from "@/assets/assets"
import CarCard from "@/components/carcard";
import Title from "@/components/title"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion";
import { useParams, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const CarsPage = () => {
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const {cars, axios} = useAppContext()
  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])

  const applyFilter = async ()=>{
    if(input === ''){
      setFilteredCars(cars)
      return null
    }
    const filtered = cars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase())
      || car.model.toLowerCase().includes(input.toLowerCase())
      || car.category.toLowerCase().includes(input.toLowerCase())
      || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }
  const searchCarAvailability = async () =>{
    const {data} = await axios.post('/api/booking/check-availability',{location:pickupLocation, pickupDate,returnDate})
    if(data.success){
      setFilteredCars(data.availableCars)
      if(data.availableCars.length === 0){
        toast('No cars availabe')
      }
      return null
    }
  }

  useEffect(()=>{
    isSearchData && searchCarAvailability()
  },[])

  useEffect(()=>{
    cars.length >0  &&  !isSearchData && applyFilter()
  },[input,cars])
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center py-20 bg-light max-md:px-4 mb-6"
      >
        <Title  title="Available Cars" subTitle="Browse Our Selection of Premium Vehicles available for you next adventure"/>
        <div className="flex items-center bg-white px-4 mt-6 max-w-80 w-full h-12 rounded-full shadow">
          <Image src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2"/>
          <input type="text" onChange={(e)=> setInput(e.target.value)} value={input} placeholder="Search" className="w-full outline-none text-gray-500" />
          <Image src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2"/>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10"
      >
        <p>Showing { filteredCars.length}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car,index)=>(
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
            >
              <CarCard car={car}/>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default CarsPage
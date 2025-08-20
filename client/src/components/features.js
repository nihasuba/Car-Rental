import { assets, dummyCarData } from "@/assets/assets"
import CarCard from "./carcard"
import { useRouter } from "next/navigation"
import Title from "./title";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";


const Features = () => {

    const router = useRouter();
    const {cars} = useAppContext();

  return (
    <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut"}}
    className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
        <motion.div
            className="mb-6 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay:1 }}
        >
            <Title title='Featured Vehicles' subTitle="Explore our selection of premium vehicles available for your next adventure"/>
        </motion.div>
        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay:0.5}}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 mb-8">
            {
                cars.slice(0,6).map((car)=> (
                    <motion.div key={car._id}
                    initial={{ opacity: 0, scale:0.95 }}
                    whileInView={{ opacity: 1, scale:1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}>
                        <CarCard car={car} />
                    </motion.div>
                ))
            }

        </motion.div>
        <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay:0.6}}
         onClick={() =>{router.push('/cars'); scrollTo(0,0)}} className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer">
            Explore all cars
            <Image  src={assets.arrow_icon} alt="arrow"/>
        </motion.button>
    </motion.div>
  )
}

export default Features
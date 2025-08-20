import { assets } from "@/assets/assets";
import Title from "./title";
import Image from "next/image";
import { motion } from "framer-motion";


const Testimonial = () => {
    const testimonials = [
        {  name: "Emma Rodriguez", location: "Barcelona, Spain", image: assets.testimonial_image_1, testimonial: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" },
        {  name: "Liam Johnson", location: "Barcelona, Spain", image: assets.testimonial_image_2, testimonial: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" },
        {  name: "Sophia Lee", location: "Barcelona, Spain", image: assets.testimonial_image_1, testimonial: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" },
    
    ]

    const Star = ({ filled }) => (
        <svg className="w-4 h-4 text-yellow-400" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z" />
        </svg>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 "
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Title title="What Our Customers Say" subTitle="Discover why discerning travelers choose stayVenture for their luxury accomodations around the world." />
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 ">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow hover:translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <Image className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
              <div>
                <p className=" text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5).fill(0).map((_, index) => (
                <Image key={index} src={assets.star_icon} alt="star-icon" />
              ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4">"{testimonial.testimonial}"</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

}
export default Testimonial
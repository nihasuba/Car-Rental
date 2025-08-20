"use client"
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-gray-900 text-white mt-32"
    >
      {/* Main Footer Content */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center">
                <Image src={assets.logo} alt="Logo" className="h-8 brightness-0 invert" />
              </div>
              <p className="text-gray-300 leading-relaxed">
                Premium car rental service offering luxury vehicles for all your transportation needs. 
                Experience comfort, style, and reliability with our extensive fleet.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  <Image src={assets.facebook_logo} alt="Facebook" className="w-6 h-6" />
                </Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  <Image src={assets.twitter_logo} alt="Twitter" className="w-6 h-6" />
                </Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  <Image src={assets.instagram_logo} alt="Instagram" className="w-6 h-6" />
                </Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  <Image src={assets.gmail_logo} alt="Gmail" className="w-6 h-6" />
                </Link>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/cars" className="text-gray-300 hover:text-white transition-colors">
                    Browse Cars
                  </Link>
                </li>
                <li>
                  <Link href="/my-booking" className="text-gray-300 hover:text-white transition-colors">
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link href="/car-details" className="text-gray-300 hover:text-white transition-colors">
                    Car Details
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold">Resources</h3>
              <ul className="space-y-3">
                <li className="text-gray-300">Help Center</li>
                <li className="text-gray-300">Terms of Service</li>
                <li className="text-gray-300">Privacy Policy</li>
                <li className="text-gray-300">Corporate Fleet</li>
                <li className="text-gray-300">Insurance</li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Image src={assets.location_icon} alt="Location" className="w-5 h-5 mt-1 brightness-0 invert opacity-70" />
                  <div>
                    <p className="text-gray-300">123 Car Street</p>
                    <p className="text-gray-300">New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Image src={assets.gmail_logo} alt="Email" className="w-5 h-5 brightness-0 invert opacity-70" />
                  <a href="mailto:info@carrental.com" className="text-gray-300 hover:text-white transition-colors">
                    info@carrental.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gray-300 rounded-full opacity-70"></div>
                  <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="border-t border-gray-800 px-6 md:px-16 lg:px-24 xl:px-32 py-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Car Rental. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
"use client"
import { assets, dummyCarData } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CarCard from "@/components/carcard";

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  // Find the car data (in a real app, this would come from an API)
  const car = dummyCarData.find(car => car._id === params.id) || dummyCarData[0];
  
  // Additional car images (in a real app, these would come from the car data)
  const carImages = [
    car.image,
    car.image,
    car.image,
    car.image
  ];

  const handleBooking = () => {
    if (!pickupDate || !returnDate || !pickupLocation) {
      alert('Please fill in all booking details');
      return;
    }
    // Handle booking logic here
    alert('Booking submitted successfully!');
  };

  const calculateDays = () => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const totalPrice = calculateDays() * car.pricePerDay;

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
            >
              <Image src={assets.arrow_icon} alt="Back" className="w-5 h-5 rotate-180" />
              Back to Cars
            </button>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {car.brand} {car.model}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mt-2">{car.year} • {car.category}</p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Car Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <Image 
                    src={carImages[selectedImage]} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover"
                    priority
                  />
                  {car.isAvailable && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Available Now
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <span className="font-semibold">${car.pricePerDay}</span>
                    <span className="text-sm text-white/80">/day</span>
                  </div>
                </div>
                
                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-4">
                  {carImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <Image 
                        src={image} 
                        alt={`${car.brand} ${car.model} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Car Specifications */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Car Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Image src={assets.car_icon} alt="Brand" className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Brand</p>
                      <p className="font-medium">{car.brand}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={assets.car_icon} alt="Model" className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Model</p>
                      <p className="font-medium">{car.model}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={assets.users_icon} alt="Seats" className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Seating Capacity</p>
                      <p className="font-medium">{car.seating_capacity} Seats</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={assets.fuel_icon} alt="Fuel" className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Fuel Type</p>
                      <p className="font-medium">{car.fuel_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={assets.car_icon} alt="Transmission" className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Transmission</p>
                      <p className="font-medium">{car.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={assets.location_icon} alt="Location" className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{car.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">{car.description}</p>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-8">
                <h2 className="text-2xl font-bold mb-6">Book This Car</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Location
                    </label>
                    <select 
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Location</option>
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Chicago">Chicago</option>
                      <option value="Houston">Houston</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date
                    </label>
                    <input 
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Date
                    </label>
                    <input 
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={pickupDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t pt-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per day:</span>
                      <span className="font-medium">${car.pricePerDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of days:</span>
                      <span className="font-medium">{calculateDays()}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Price:</span>
                        <span className="text-primary">${totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleBooking}
                    className="w-full bg-primary hover:bg-primarydull text-white font-semibold py-4 rounded-lg transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Cars Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Similar Cars
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyCarData
                .filter(c => c._id !== car._id)
                .slice(0, 3)
                .map((relatedCar) => (
                  <CarCard key={relatedCar._id} car={relatedCar} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

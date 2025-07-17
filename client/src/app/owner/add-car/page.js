"use client"
import { useState } from "react";
import { assets } from "@/assets/assets"; // adjust path as needed

const AddCarPage = () => {
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({ car, image });
    // TODO: implement API call
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Add New Car</h1>
      <p className="text-gray-500 mb-8">
        Fill in details to list a new car for booking, including pricing,
        availability, and car specifications.
      </p>

      <div className="bg-white rounded shadow p-8">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={onSubmitHandler}
        >
          {/* Car Image */}
          <div className="col-span-2 flex flex-col">
            <label htmlFor="car-image" className="mb-2 font-medium">
              Car Image
            </label>
            <label
              htmlFor="car-image"
              className="flex items-center gap-2 w-full cursor-pointer"
            >
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : assets?.upload_icon || "/placeholder.png"
                }
                alt="Car"
                className="h-20 w-20 object-cover rounded border"
              />
              <input
                type="file"
                id="car-image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              <p className="text-sm text-gray-500">
                Upload a picture of your car
              </p>
            </label>
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1">Brand</label>
            <input
              name="brand"
              type="text"
              value={car.brand}
              onChange={onChangeHandler}
              placeholder="e.g. BMW, Mercedes, Audi..."
              required
              className="px-3 py-2 border border-borderColor rounded-md outline-none"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1">Model</label>
            <input
              name="model"
              type="text"
              value={car.model}
              onChange={onChangeHandler}
              placeholder="Model"
              required
              className="px-3 py-2 border border-borderColor rounded-md outline-none"
            />
          </div>

          <input
            name="year"
            type="number"
            value={car.year}
            onChange={onChangeHandler}
            placeholder="Year"
            className="col-span-1 border rounded p-2"
          />
          <input
            name="pricePerDay"
            type="number"
            value={car.pricePerDay}
            onChange={onChangeHandler}
            placeholder="Daily Price ($)"
            className="col-span-1 border rounded p-2"
          />

          {/* Category Dropdown */}
          <select
            name="category"
            value={car.category}
            onChange={onChangeHandler}
            className="col-span-1 border rounded p-2"
          >
            <option value="">Select Category</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
          </select>

          {/* Transmission Dropdown */}
          <select
            name="transmission"
            value={car.transmission}
            onChange={onChangeHandler}
            className="col-span-1 border rounded p-2"
          >
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>

          {/* Fuel Type Dropdown */}
          <select
            name="fuel_type"
            value={car.fuel_type}
            onChange={onChangeHandler}
            className="col-span-1 border rounded p-2"
          >
            <option value="">Select Fuel Type</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Gas">Gas</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <input
            name="seating_capacity"
            type="number"
            value={car.seating_capacity}
            onChange={onChangeHandler}
            placeholder="Seating Capacity"
            className="col-span-1 border rounded p-2"
          />

          {/* Location Dropdown */}
          <select
            name="location"
            value={car.location}
            onChange={onChangeHandler}
            className="col-span-2 border rounded p-2"
          >
            <option value="">Select Location</option>
            <option value="Colombo">Colombo</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Vavuniya">Vavuniya</option>
            <option value="Trinco">Trinco</option>
            <option value="Mannar">Mannar</option>
          </select>

          <textarea
            name="description"
            value={car.description}
            onChange={onChangeHandler}
            placeholder="Description"
            rows={3}
            className="col-span-2 border rounded p-2"
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white rounded py-2 mt-4 hover:bg-blue-700 transition"
          >
            List Your Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCarPage;

"use client"
import { useEffect, useState } from 'react';
import { assets, dummyDashboardData } from '@/assets/assets';
import OwnerTitle from '@/components/ownertitle';
import Image from 'next/image';

const OwnerDashboard = () => {
  const [data, setData] = useState({
    totalCars: 8,
    totalBookings: 8,
    pendingBookings: 8,
    completedBookings: 8,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  useEffect (()=> {
    setData(dummyDashboardData);
  },[])

  const dashboardCards = [
    { title: 'Total Cars', value: data.totalCars, icon: assets.carIcon },
    { title: 'Total Bookings', value: data.totalBookings, icon: assets.listIconColored },
    { title: 'Pending Bookings', value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: 'Completed Bookings', value: data.completedBookings, icon:assets.listIconColored },
  ];

  const currency = process.env.NEXT_PUBLIC_CURRENCY || 'Rs.';

  return (
    <div className='px-4 pt-10 md:px-10 flex-1'>
      <OwnerTitle title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities" />
      {/* Dashboard Cards */}
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-6xl'>
        {dashboardCards.map((card, index) => (
          <div key={index} className='flex items-center justify-between p-4 rounded-md border border-borderColor bg-white'>
            <div>
              <h1 className='text-xs text-gray-500'>{card.title}</h1>
              <p className='text-lg font-semibold'>{card.value}</p>
            </div>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-50'>
              <Image src={card.icon}  alt='' className='object-contain' />
            </div>
          </div>
        ))}
      </div>
      {/* Main Content: Recent Bookings and Revenue */}
      <div className='flex flex-wrap items-start gap-6 mb-8 w-full'>
        {/* Recent Bookings */}
        <div className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full bg-white'>
          <h1 className='text-lg font-medium'>Recent Bookings</h1>
          <p className='text-gray-500 mb-2'>Latest customer bookings</p>
          {data.recentBookings.map((booking, index) => (
            <div key={index} className='mt-4 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-50'>
                  <Image src={assets.calendar_icon_colored} alt='' className='h-5 w-5' />
                </div>
                <div>
                  <p className='font-medium'>{booking.car.brand} {booking.car.model}</p>
                  <p className='text-xs text-gray-400'>{booking.createdAt.split('T')[0]}</p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-gray-500'>{currency}{booking.price}</span>
                <span className={`px-3 py-0.5 rounded text-xs font-medium border ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-700 border-green-200' :
                  booking.status === 'Completed' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                  booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                  'bg-gray-100 text-gray-700 border-gray-200'
                }`}>{booking.status}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Monthly Revenue */}
        <div className='p-4 md:p-6 border border-borderColor rounded-md flex flex-col justify-center items-center bg-white min-w-[250px]'>
          <h2 className='text-lg font-semibold mb-2'>Monthly Revenue</h2>
          <p className='text-md mb-4 text-gray-500'>Revenue for current month</p>
          <span className='text-4xl font-bold text-blue-600'>{currency}{data.monthlyRevenue}</span>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;

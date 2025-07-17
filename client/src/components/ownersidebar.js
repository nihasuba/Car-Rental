"use client";

import { assets, dummyUserData, ownerMenuLinks } from '@/assets/assets';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const OwnerSidebar = () => {
  const user = dummyUserData;
  const pathname = usePathname();
  const [image, setImage] = useState('');

  const updateImage = async () => {
    user.image = URL.createObjectURL(image);
    setImage('');
  };

  return (
    <div className='relative min-h-screen flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>
      {/* Profile Image Upload */}
      <div className='group relative'>
        <label htmlFor="image">
          <Image
            src={image ? URL.createObjectURL(image) : user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"}
            alt=""
            className=" h-9 md:h-14 w-9 md:w-14 rounded-full object-cover mx-auto"
          />
          <input
            type="file"
            id='image'
            accept="image/*"
            hidden
            onChange={e => setImage(e.target.files[0])}
          />
          <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
            <Image src={assets.edit_icon} alt="edit" width={20} height={20} />
          </div>
        </label>
        {image && (
          <button
            className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer'
            type="button"
            onClick={updateImage}
          >
            Save
            <Image src={assets.check_icon} width={13} alt="check" />
          </button>
        )}
      </div>
      <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>
      {/* Navigation Links */}
      <div className='w-full'>
        {ownerMenuLinks.map((link, index) => (
          <Link
            key={index}
            href={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'
            }`}
          >
            <Image
              src={link.path === pathname ? link.coloredIcon : link.icon}
              alt="icon"
              className="w-5 h-5"
            />
            <span className='max-md:hidden'>{link.name}</span>
            {link.path === pathname && (
              <div className="bg-primary w-1.5 h-8 rounded-1 right-0 absolute"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OwnerSidebar;

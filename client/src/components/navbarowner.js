"use client";
import { assets, dummyCarData, dummyUserData, menuLinks } from "@/assets/assets"
import Link from "next/link"
import Image from "next/image"
import { use, useState } from "react"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";




const NavbarOwner = ({setShowLogin}) => {

  const {user} = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all">
      <Link href="/">
            <Image src={assets.logo} className="h-7" alt="logo"/>
        </Link>
        <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  )
}

export default NavbarOwner
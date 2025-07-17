"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Login from "@/app/login/page";



export default function ClientLayout({ children }) {

  const Pathname = usePathname();
  const[showLogin,setShowLogin] = useState(false);
  const isOwnerPath = Pathname.startsWith('/owner');

  return (
    <>
        {showLogin && <Login setShowLogin={setShowLogin}/>}
        {!isOwnerPath && <Navbar setShowLogin={setShowLogin}  />}
        {children}
        <Footer />
    </>
  );
}

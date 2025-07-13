"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import { usePathname } from "next/navigation";



export default function ClientLayout({ children }) {

  const Pathname = usePathname();
  const[showLogin,setShowLogin] = useState(false);
  const isOwnerPath = Pathname.startsWith('/owner');

  return (
    <>
        {!isOwnerPath && <Navbar setShowLogin={setShowLogin}  />}
        {children}
        <Footer />
    </>
  );
}

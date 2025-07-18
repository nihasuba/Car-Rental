"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Login from "@/app/login/page";
import Register from "@/app/register/page";
import { useAppContext } from "@/context/AppContext";
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({ children }) {
  
  const Pathname = usePathname();
  const { showLogin, setShowLogin, showRegister, setShowRegister } = useAppContext();
  const isOwnerPath = Pathname.startsWith('/owner');

  return (
    <>
    <Toaster />
      {showLogin && <Login  />}
      {showRegister && <Register />}
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      {children}
      <Footer />
    </>
  );
}

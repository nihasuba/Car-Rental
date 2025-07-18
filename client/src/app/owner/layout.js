"use client";
import NavbarOwner from '@/components/navbarowner';
import OwnerSidebar from '@/components/ownersidebar';
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';

export default function OwnerLayout({ children }) {
  const {isOwner,route} = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      route.push('/');
    }
  },[isOwner])

  return (
    <>
    <NavbarOwner />
    <div className="flex min-h-screen">
      <OwnerSidebar />
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
    </>
    
  );
}

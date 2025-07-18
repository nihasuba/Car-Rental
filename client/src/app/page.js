"use client"
import Features from "@/components/features";
import Hero from "@/components/hero";
import Banner from "@/components/banner";
import Testimonial from "@/components/testimonial";
import Newsletter from "@/components/newsletter";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from 'react-hot-toast';

export default function Home() {

  return (
    <>
      <AppProvider>
        <Hero />
        <Features/>
        <Banner />
        <Testimonial />
        <Newsletter />
      </AppProvider>
    </>
  );
}

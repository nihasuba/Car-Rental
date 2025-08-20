import Navbar from "@/components/navbar";
import "./globals.css";
import ClientLayout from "@/components/clientlayout";
import { AppProvider } from "@/context/AppContext";
import MotionProvider from "@/components/motionprovider";

export const metadata = {
  title: "Car Rental",
  description: "Car Rental Website",
  icons:{
    icon:'/favicon.svg',
  }
};

export default function RootLayout({ children }) {

 
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <AppProvider>
        <MotionProvider viewPort={{ once: true }}>
          <ClientLayout>{children}</ClientLayout>
        </MotionProvider>
        </AppProvider>
      </body>
    </html>
  );
}

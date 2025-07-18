import Navbar from "@/components/navbar";
import "./globals.css";
import ClientLayout from "@/components/clientlayout";
import { AppProvider } from "@/context/AppContext";


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
          <ClientLayout>{children}</ClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}

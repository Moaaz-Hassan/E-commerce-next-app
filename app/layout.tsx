import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "./_componentes/NavBar";
import "./globals.css";
import AuthProvider from "./context/AuthContext";
import Providers from "./_componentes/ProvidersComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopZone",
  description: "Get what you want with a single click",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <NavBar/>
        
        <div className=" container mx-auto p-3">
          <Providers>
          {children}
          </Providers>
          
          
        </div>
        </AuthProvider>
        
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DSAverse",
  description: "An AI- powered application to learn DSA",
  icons: {
    icon: [
      {
        url: '/images/favicon.ico',
        type: 'image/ico',
      }
    ],
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <SessionWrapper>
        <Navbar/>
        <main className="pt-20">
        {children}
        </main>
        </SessionWrapper>
      </body>
    </html>
  );
}

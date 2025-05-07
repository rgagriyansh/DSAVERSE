"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const {data: session, status} = useSession();
  const [dropdown, setdropdown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if(dropdown) {
      const timer = setTimeout(() => {
        setdropdown(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dropdown]);

  if (status === "loading") {
    return null;
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gradient-to-r from-blue-900/90 to-indigo-900/90 backdrop-blur-md shadow-lg' : 'bg-gradient-to-r from-blue-900 to-indigo-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <img height={40} width={40} src="/logo.png" alt="DSAverse Logo" className="rounded-lg" />
            <Link href='/' className='text-white font-bold text-2xl tracking-wider hover:text-blue-200 transition-colors duration-300'>
              DSAverse
            </Link>
          </div>

          {/* Navigation Links */}
          {!session ? (
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-200 hover:text-white font-medium transition-colors duration-300">
                Home
              </Link>
              <Link href="/login" className="text-gray-200 hover:text-white font-medium transition-colors duration-300">
                Login
              </Link>
              <Link href="/signup" 
                className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/private/dashboard" className="text-gray-200 hover:text-white font-medium transition-colors duration-300">
                  Dashboard
                </Link>
                <Link href="/private/roadmap" className="text-gray-200 hover:text-white font-medium transition-colors duration-300">
                  Roadmap
                </Link>
                <Link href="/private/learngpt" className="text-gray-200 hover:text-white font-medium transition-colors duration-300">
                  GPT Assistant
                </Link>
                <Link href="/private/logdsa" className="text-gray-200 hover:text-white font-medium transition-colors duration-300">
                  DSA Logger
                </Link>
                <Link href="/private/skillgap" className="text-gray-200 hover:text-white font-medium transition-colors duration-300">
                  Skill Gap
                </Link>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setdropdown(!dropdown)}
                  className="flex cursor-pointer items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-200/20 flex items-center justify-center">
                    <IoPersonSharp className="w-6 h-6 text-white" />
                  </div>
                </button>

                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl shadow-lg py-2 z-50 border border-blue-700/50"
                    >
                      <div className="px-4 py-2 border-b border-blue-700/50">
                        <p className="text-sm font-medium text-white">{session.user?.name || 'User'}</p>
                        <p className="text-xs text-gray-300">{session.user?.email}</p>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-200 hover:bg-blue-800/50 transition-colors duration-200"
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

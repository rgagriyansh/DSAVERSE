"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { RiDashboardLine, RiRoadMapLine, RiRobot2Line, RiFileListLine, RiUserSearchLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const {data: session, status} = useSession();
  const [dropdown, setdropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

  const navigation = [
    { name: 'Dashboard', href: '/private/dashboard', icon: RiDashboardLine },
    { name: 'Roadmap', href: '/private/roadmap', icon: RiRoadMapLine },
    { name: 'GPT Assistant', href: '/private/learngpt', icon: RiRobot2Line },
    { name: 'DSA Logger', href: '/private/logdsa', icon: RiFileListLine },
    { name: 'Skill Gap', href: '/private/skillgap', icon: RiUserSearchLine },
  ];

  if (status === "loading") {
    return null;
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gradient-to-r from-[#1a1c2e]/95 to-[#2d1b69]/95 backdrop-blur-md shadow-lg' 
        : 'bg-gradient-to-r from-[#1a1c2e] to-[#2d1b69]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
              <img height={40} width={40} src="/logo.png" alt="DSAverse Logo" className="relative rounded-lg" />
            </div>
            <Link href='/' className='relative group'>
              <span className="text-white font-bold text-2xl tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DSAverse
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
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
                className="relative group">
                <span className="relative z-10 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#ff6b6b]/20">
                  Sign Up
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></span>
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        relative group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                        ${isActive 
                          ? 'text-white' 
                          : 'text-gray-300 hover:text-white'
                        }
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'} transition-colors duration-300`} />
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 rounded-lg group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden p-2 rounded-lg text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-300"
              >
                {mobileMenu ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setdropdown(!dropdown)}
                  className="flex cursor-pointer items-center space-x-2 focus:outline-none hover:bg-white/10 transition-colors duration-200 rounded-full p-1"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20"></div>
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <IoPersonSharp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-[#1a1c2e] to-[#2d1b69] rounded-xl shadow-lg py-2 z-50 border border-white/10 backdrop-blur-md"
                    >
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{session.user?.name || 'User'}</p>
                        <p className="text-xs text-gray-400">{session.user?.email}</p>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 transition-colors duration-200"
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gradient-to-br from-[#1a1c2e] to-[#2d1b69] backdrop-blur-md"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenu(false)}
                      className={`
                        relative group flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300
                        ${isActive 
                          ? 'text-white' 
                          : 'text-gray-300 hover:text-white'
                        }
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavMobile"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'} transition-colors duration-300`} />
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 rounded-lg group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar

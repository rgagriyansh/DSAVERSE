"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const {data: session} = useSession();

  useEffect(()=>{
    if(session){
      redirect("/private/dashboard");
    }
  })

  return(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 mb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                The Smartest Coding Prep Dashboard
                <span className="block text-blue-600">for Your Success</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Empower your coding journey with personalized guidance, AI-driven progress tracking, and seamless learning experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/login" 
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Get Started
              </Link>
              <Link href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Create Account
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/hero_image.png" 
                alt="DSAverse Dashboard Preview" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Feature Highlights</h2>
            <p className="text-lg md:text-xl text-gray-600">
              Discover the essential tools to elevate your coding journey with DSAverse's intelligent dashboard.
            </p>
          </div>

          <div className="space-y-20">
            {/* GPT Help Feature */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">GPT-Powered Assistance</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Are you stuck? Let GPT guide you through any coding challenge with real-time, intelligent assistance.
                </p>
                <Link href="/signup" 
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Try Now
                </Link>
              </div>
              <div className="lg:w-1/2 relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src="/gpt.png" 
                  alt="GPT Help Feature" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Roadmap Generator Feature */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Smart Roadmap Generator</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Where do you start? Our Roadmap Generator tailors your journey to match your goals and timeline.
                </p>
                <Link href="/signup" 
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Try Now
                </Link>
              </div>
              <div className="lg:w-1/2 relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src="/roadmap.png" 
                  alt="Roadmap Generator Feature" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* DSA Progress Logger Feature */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">DSA Progress Logger</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Master DSA step-by-step! Log your progress, review your work, and level up continuously.
                </p>
                <Link href="/signup" 
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Try Now
                </Link>
              </div>
              <div className="lg:w-1/2 relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src="/dsa.jpg" 
                  alt="DSA Progress Logger Feature" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Skill Gap Analyzer Feature */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Skill Gap Analyzer</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Don&apos;t just study, evolve! Our analyzer finds your weak spots and guides you to improvement.
                </p>
                <Link href="/signup" 
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Try Now
                </Link>
              </div>
              <div className="lg:w-1/2 relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src="/skillgap.png" 
                  alt="Skill Gap Analyzer Feature" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

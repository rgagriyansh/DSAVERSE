"use client"
import SmartAssistantChat from '@/components/ChatAssistant'
import React from 'react'
import { motion } from 'framer-motion'
import { FaRobot } from 'react-icons/fa6'
import { BsCodeSlash } from 'react-icons/bs'

const Learngpt = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-lg"></div>
                <div className="relative flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <FaRobot className="text-4xl text-white" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Smart Coding Assistant</h1>
                <p className="text-blue-100">Your AI-powered coding companion</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BsCodeSlash className="text-xl text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Code Generation</h3>
                <p className="text-sm text-gray-500">Generate code snippets instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaRobot className="text-xl text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Smart Debugging</h3>
                <p className="text-sm text-gray-500">Get help with code issues</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Learning Support</h3>
                <p className="text-sm text-gray-500">Understand concepts better</p>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="p-6">
            <SmartAssistantChat />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Learngpt

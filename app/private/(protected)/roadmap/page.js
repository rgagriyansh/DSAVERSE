"use client"
import React from 'react'
import { useState } from 'react';
import RoadmapFlow from '@/components/RoadmapFlow';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowRight, BsLightningCharge } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa6';
import { RiRoadMapLine } from 'react-icons/ri';

export default function Roadmap(){
  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState("");

  const generateRoadmap = async () => {
    if (!goal.trim() || !skills.trim()) {
      setError("Please fill in both goal and skills fields");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, skills }),
      });
      if (!res.ok) throw new Error('Failed to generate roadmap');
      const data = await res.json();
      setRoadmap(data.roadmap);
    } catch (err) {
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20"></div>
              <RiRoadMapLine className="relative text-4xl text-blue-600" />
            </div>
            <h1 className="font-bold text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart Roadmap Generator
            </h1>
          </motion.div>

          {/* Input Section */}
          <div className="space-y-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                Your Career Goal
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BsLightningCharge className="h-5 w-5 text-blue-500" />
                </div>
                <input
                  id="goal"
                  type="text"
                  placeholder="e.g., FAANG SDE, Full Stack Developer, Data Scientist"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Your Current Skills
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaRobot className="h-5 w-5 text-purple-500" />
                </div>
                <input
                  id="skills"
                  type="text"
                  placeholder="e.g., DSA, DBMS, React, Node.js"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>
            </motion.div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <div className="flex justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateRoadmap}
              disabled={loading}
              className={`
                px-8 py-3 rounded-lg font-medium text-white
                ${loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }
                flex items-center gap-2 transition-all duration-200
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating Roadmap...</span>
                </>
              ) : (
                <>
                  <span>Generate Roadmap</span>
                  <BsArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>

          {/* Roadmap Output */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative bg-gradient-to-b from-blue-50 to-purple-50 rounded-xl p-6 min-h-[600px] border border-gray-100"
          >
            {roadmap ? (
              <RoadmapFlow roadmap={roadmap} />
            ) : (
              <div className="flex items-center justify-center h-[500px]">
                {loading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20"></div>
                      <div className="relative animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    </div>
                    <p className="text-gray-600 font-medium">Creating your personalized roadmap...</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20"></div>
                      <RiRoadMapLine className="relative text-6xl text-blue-600" />
                    </div>
                    <p className="text-lg text-gray-600 font-medium">Enter your goal and skills to generate a personalized roadmap</p>
                    <p className="text-sm text-gray-500 mt-2">We&apos;ll create a step-by-step guide to help you achieve your career goals</p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
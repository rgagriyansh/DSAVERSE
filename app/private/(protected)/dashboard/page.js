"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { FcFlowChart } from "react-icons/fc"
import { BsGraphUpArrow, BsArrowRight } from "react-icons/bs"
import { FaRobot } from "react-icons/fa6"
import { GrDocumentUser } from "react-icons/gr"
import { motion } from 'framer-motion'
import ProgressGraph from '@/components/ProgressGraph'
import RoadmapSteps from '@/components/RoadmapSteps'
import Link from 'next/link'

const Dashboard = () => {   
    const [data, setData] = useState([])
    const [steps, setSteps] = useState([])
    const { data: session, status } = useSession()

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch("/api/logdsa")
            const data = await res.json()
            setData(data.labels.map((label, i) => ({
                date: label,
                questions: data.data[i]
            })))
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchSteps = async () => {
            const res = await fetch('/api/dashboard-roadmap')
            const data = await res.json()
            setSteps(data.preview)
        }
        fetchSteps()
    }, [])

    if (status === "loading") {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    const name = session?.user?.name || (session?.user?.email ? session.user.email.split("@")[0] : "User")
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Welcome Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Welcome back, {name}! 👋</h1>
                            <p className="text-blue-100">Track your progress and continue your DSA journey</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{data.reduce((acc, curr) => acc + curr.questions, 0)}</p>
                                    <p className="text-sm text-blue-100">Problems Solved</p>
                                </div>
                                <div className="h-12 w-px bg-white/20"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{steps?.length || 0}</p>
                                    <p className="text-sm text-blue-100">Roadmap Steps</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Smart Roadmap Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                                <FcFlowChart className="text-2xl" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg text-gray-800">Your Smart Roadmap</h2>
                                <p className="text-sm text-gray-500">Next steps created by GPT based on your goals</p>
                            </div>
                        </div>
                        
                        <div className="w-full overflow-y-auto max-h-32 mb-4 bg-gray-50 rounded-lg p-3">
                            <RoadmapSteps steps={steps} />
                        </div>
                        
                        <Link 
                            href="/private/roadmap"
                            className="group flex items-center justify-center gap-2 w-full text-center text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium rounded-lg text-sm px-4 py-2.5"
                        >
                            Generate New Roadmap
                            <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Progress Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                                <BsGraphUpArrow className="text-xl" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg text-gray-800">Your Progress</h2>
                                <p className="text-sm text-gray-500">Track your DSA problem-solving journey</p>
                            </div>
                        </div>
                        
                        <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-lg p-3">
                            <ProgressGraph data={data} />
                        </div>
                    </motion.div>

                    {/* Ask GPT Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                                <FaRobot className="text-xl" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg text-gray-800">Ask GPT</h2>
                                <p className="text-sm text-gray-500">Clear all your doubts with AI assistance</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center py-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full blur opacity-20"></div>
                                <FaRobot className="relative h-16 w-16 text-orange-500 mb-4" />
                            </div>
                            <p className="text-sm text-gray-600 text-center mb-4">
                                Get instant help with your coding problems and concepts
                            </p>
                        </div>
                        
                        <Link 
                            href="/private/chat"
                            className="group flex items-center justify-center gap-2 w-full text-center text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium rounded-lg text-sm px-4 py-2.5"
                        >
                            Open Assistant
                            <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Skill Gap Report Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                                <GrDocumentUser className="text-xl" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg text-gray-800">Skill Gap Report</h2>
                                <p className="text-sm text-gray-500">Compare your skills with your dream job</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center py-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full blur opacity-20"></div>
                                <GrDocumentUser className="relative h-16 w-16 text-purple-500 mb-4" />
                            </div>
                            <p className="text-sm text-gray-600 text-center mb-4">
                                Analyze job descriptions and identify areas for improvement
                            </p>
                        </div>
                        
                        <Link 
                            href="/private/skill-gap"
                            className="group flex items-center justify-center gap-2 w-full text-center text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-medium rounded-lg text-sm px-4 py-2.5"
                        >
                            Analyze JD
                            <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
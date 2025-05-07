"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { FcFlowChart } from "react-icons/fc"
import { BsGraphUpArrow } from "react-icons/bs"
import { FaRobot } from "react-icons/fa6"
import { GrDocumentUser } from "react-icons/gr"
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
        return <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    }

    const name = session?.user?.name || (session?.user?.email ? session.user.email.split("@")[0] : "User")
    
    return (
        <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
            <div className="border-2 border-slate-300 rounded-xl w-full max-w-7xl overflow-hidden">
                <div className="p-4 md:p-6">
                    {/* Header */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <img 
                            height={40} 
                            width={40} 
                            className="rounded-full text-black bg-slate-50 border border-slate-50" 
                            src="/wired-outline-16-avatar-woman-nodding-hover-pinch.png" 
                            alt="avatar"
                        />
                        <h1 className="font-bold text-xl md:text-3xl">Welcome back, {name}!</h1>
                    </div>

                    {/* Dashboard Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Smart Roadmap Card */}
                        <div className="bg-blue-200 p-4 rounded-3xl flex flex-col items-center justify-between h-full">
                            <div className="flex flex-col items-center">
                                <FcFlowChart className="text-2xl mb-1" />
                                <h2 className="font-bold text-lg md:text-xl">Your Smart Roadmap</h2>
                                <p className="text-xs mb-2 text-center">next steps created by GPT based on your goals.</p>
                            </div>
                            
                            <div className="w-full overflow-y-auto max-h-28">
                                <RoadmapSteps steps={steps} />
                            </div>
                            
                            <button 
                                type="button" 
                                className="text-white mt-3 cursor-pointer bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                            >
                                Generate New Roadmap
                            </button>
                        </div>

                        {/* Progress Card */}
                        <div className="bg-green-100 p-4 rounded-3xl flex flex-col items-center justify-between h-full">
                            <div className="flex gap-2 items-center">
                                <BsGraphUpArrow className="text-lg" />
                                <h2 className="font-bold hover:underline text-lg md:text-xl">
                                    <Link href="/private/logdsa">Your Progress</Link>
                                </h2>
                            </div>
                            
                            <div className="w-full h-40 flex items-center justify-center">
                                <ProgressGraph data={data} />
                            </div>
                        </div>

                        {/* Ask GPT Card */}
                        <div className="bg-orange-200 p-4 rounded-3xl flex flex-col items-center justify-between h-full">
                            <div className="flex flex-col items-center">
                                <h2 className="font-bold text-lg md:text-xl">Ask GPT</h2>
                                <p className="text-xs text-center">clear all your doubts with GPT</p>
                            </div>
                            
                            <div className="py-2">
                                <FaRobot className="h-20 w-20 text-orange-600" />
                            </div>
                            
                            <button 
                                type="button" 
                                className="text-white cursor-pointer bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                            >
                                Open Assistant
                            </button>
                        </div>

                        {/* Skill Gap Report Card */}
                        <div className="bg-purple-200 p-4 rounded-3xl flex flex-col items-center justify-between h-full">
                            <div className="flex flex-col items-center">
                                <h2 className="font-bold text-lg md:text-xl">Skill Gap Report</h2>
                                <p className="text-xs text-center">Compare your skills with your dream job</p>
                            </div>
                            
                            <div className="py-2">
                                <GrDocumentUser className="h-20 w-20 text-purple-600" />
                            </div>
                            
                            <button 
                                type="button" 
                                className="text-white cursor-pointer bg-purple-400 hover:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                            >
                                Analyze JD
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
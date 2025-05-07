"use client"
import React from 'react'
import { useState } from 'react';
import RoadmapFlow from '@/components/RoadmapFlow';
export default function  Roadmap(){
  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null)

  const generateRoadmap = async () => {
    setLoading(true)
    const res = await fetch('/api/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal, skills }),
    })
    const data = await res.json()
    setRoadmap(data.roadmap)
    setLoading(false)
  }
  return (
    <div className="flex items-center justify-center min-h-screen container my-10 mx-auto px-4">
      <div className="border-2 border-slate-300 rounded-xl w-full min-h-screen bg-white p-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <img
            height={45}
            width={45}
            src="/wired-lineal-1326-command-window-line-morph-code.gif"
            alt="roadmap"
          />
          <h1 className="font-bold text-3xl">Roadmap Generator</h1>
        </div>

        {/* Input Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="Enter your goal (e.g., FAANG SDE)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="border p-2 w-full md:w-1/3 rounded"
          />
          <input
            type="text"
            placeholder="Enter your skills (e.g., DSA, DBMS)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="border p-2 w-full md:w-1/3 rounded"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </div>
        <hr />

        {/* Roadmap Output */}
        <div className="relative bg-pink-50 overflow-auto">
          {roadmap && <RoadmapFlow roadmap={roadmap} />}
        </div>
      </div>
    </div>
  )
}
import SmartAssistantChat from '@/components/ChatAssistant'
import React from 'react'

const Learngpt = () => {
  return (
      <div className="flex items-center justify-center min-h-screen container my-10 mx-auto px-4">
        <div className="border-2 border-slate-300 rounded-xl w-full min-h-screen bg-white p-6">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <img
              height={45}
              width={45}
              src="/wired-lineal-1323-java-code-language-hover-pinch.gif"
              alt="ai"
            />
            <h1 className="font-bold text-3xl">Smart Coding Assistant</h1>
          </div>
          <hr />
          <div>

            <SmartAssistantChat/>
          </div>
          

        </div>
      </div>
    )
}

export default Learngpt

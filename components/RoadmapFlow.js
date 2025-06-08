'use client'

import { motion } from 'framer-motion'

export default function RoadmapFlow({ roadmap }) {
  if (!roadmap || roadmap.length === 0) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="relative overflow-x-hidden" style={{ minHeight: `${(roadmap.length * 200) + 100}px` }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative py-8"
      >
        {/* Main Timeline line */}
        <div 
          className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-purple-400 transform -translate-x-1/2"
          style={{ height: `${(roadmap.length * 200) + 100}px` }}
        />
        
        {roadmap.map((step, i) => {
          const isLeft = i % 2 === 0

          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`w-[calc(50%-2rem)] px-4 py-2 absolute ${
                isLeft ? 'left-0 text-right pr-10' : 'right-0 text-left pl-10'
              }`}
              style={{ top: `${i * 200}px` }}
            >
              <div className="relative">
                {/* Timeline dot */}
                <div className={`absolute top-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 ${
                  isLeft ? '-right-10' : '-left-10'
                } shadow-lg`} />
                
                {/* Connecting line */}
                <div 
                  className={`absolute top-1/2 w-6 h-1 bg-gradient-to-r ${
                    isLeft 
                      ? 'right-0 from-blue-500 to-purple-500' 
                      : 'left-0 from-purple-500 to-blue-500'
                  } transform -translate-y-1/2 shadow-sm`} 
                />
                
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                      {i + 1}
                    </span>
                    <h2 className="font-semibold text-lg text-gray-800">Step {i + 1}</h2>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{step}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

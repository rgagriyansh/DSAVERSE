'use client'

import { motion } from 'framer-motion'

export default function RoadmapFlow({ roadmap }) {
  if (!roadmap || roadmap.length === 0) return null

  return (
    <div className="mt-10 space-y-8 relative before:absolute bg-pink-50 before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-blue-200 before:-translate-x-1/2 w-full min-h-[500px]">
      {roadmap.map((step, i) => {
        const isLeft = i % 2 === 0

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`w-1/2 px-4 py-2 absolute ${
              isLeft ? 'left-0 text-right pr-10' : 'right-0 text-left pl-10'
            }`}
            style={{ top: `${i * 120}px` }}
          >
            <div className="bg-white p-4 rounded-xl shadow-md border border-blue-200">
              <h2 className="font-semibold text-blue-600">Step {i + 1}</h2>
              <p className="text-sm text-gray-700">{step}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

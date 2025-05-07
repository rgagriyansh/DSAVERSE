'use client'
import React from 'react'

const RoadmapSteps = ({ steps }) => {
  console.log(steps)

  return (
    <ul className="w-full text-xs px-4">
      {steps.map((step, index) => (
        <li
          key={index}
          className="list-none my-0.5 bg-white px-3 py-1 text-sm flex items-start rounded-xl shadow w-full max-w-full overflow-hidden whitespace-nowrap text-ellipsis"
          title={step} // Tooltip on hover
        >
          <span className="truncate">{step}</span>
        </li>
      ))}
    </ul>
  )
}

export default RoadmapSteps

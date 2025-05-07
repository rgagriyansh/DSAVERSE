import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ProgressGraph = ({data}) => {
  return (
      <BarChart width={350} height={150} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="questions" fill="#6366F1" radius={[8, 8, 0, 0]} />
    </BarChart>
  )
}

export default ProgressGraph

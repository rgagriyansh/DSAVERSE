"use client"
import React from 'react'
import { BsGraphUpArrow, BsCalendar, BsCodeSquare, BsCheck2Circle } from "react-icons/bs";
import { FaCode, FaChartLine } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const Logdsa = () => {
  const today = new Date().toISOString().split('T')[0]; 
  const [date, setDate] = useState(today); 
  
  const [questionsSolved, setQuestionsSolved] = useState('');
  const [platform, setPlatform] = useState('');
  const [topics, setTopics] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const fetchData = async () => {
    const res = await fetch('/api/logdsa');
    const json = await res.json();
    const formattedData = json.labels.map((label, index) => ({
      date: label.split(' ').slice(0, 3).join(' '),
      questions: json.data[index],
    }));
    
    setGraphData(formattedData);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const topicsList = ['Arrays', 'Linked List', 'Stack', 'Queue', 'Hashing', 'Binary Tree', 'Dynamic Programming', 'Greedy', 'Graph', 'Sorting'];

  const handleTopicChange = (e) => {
    const input = e.target.value.toLowerCase();
    setTopics(input);

    if (input.length > 0) {
      const filteredTopics = topicsList.filter(topic => topic.toLowerCase().includes(input));
      setSuggestions(filteredTopics);
    } else {
      setSuggestions([]);
    }
  };

  const selectTopic = (topic) => {
    if (!selectedTopics.includes(topic)) {
      setSelectedTopics([...selectedTopics, topic]);
    }
    setTopics('');
    setSuggestions([]);
  };

  const removeTopic = (topic) => {
    setSelectedTopics(selectedTopics.filter(t => t !== topic));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      date,
      questionsSolved,
      platform,
      selectedTopics,
    };

    try {
      const response = await fetch("/api/logdsa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("DSA Log created:", result);
        fetchData();
      } else {
        console.log("Failed to log DSA progress.");
      }

      setDate(today);
      setPlatform("");
      setQuestionsSolved("");
      setSelectedTopics([]);
      setSuggestions([]);
      setTopics("");
    } catch (error) {
      console.error("Error submitting DSA log:", error);
    }
  };

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
                  <FaChartLine className="text-3xl text-white" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">DSA Progress Logger</h1>
                <p className="text-blue-100">Track your coding journey</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <BsCalendar className="text-blue-600" />
                        <span>Date</span>
                      </div>
                    </label>
                    <input 
                      type="date" 
                      id="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    />
                  </div>

                  <div>
                    <label htmlFor="ques" className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <BsCheck2Circle className="text-green-600" />
                        <span>Questions Solved</span>
                      </div>
                    </label>
                    <input 
                      type="number" 
                      id="ques" 
                      placeholder="Enter Number" 
                      value={questionsSolved}
                      onChange={(e) => setQuestionsSolved(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <FaCode className="text-purple-600" />
                      <span>Platform</span>
                    </div>
                  </label>
                  <select 
                    id="platform" 
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Platform</option>
                    <option value="leetcode">Leetcode</option>
                    <option value="geeksforgeeks">GeeksforGeeks</option>
                    <option value="striver">Striver</option>
                    <option value="codingninjas">Coding Ninjas</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <BsCodeSquare className="text-orange-600" />
                      <span>Topics Covered</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="topics" 
                      value={topics}
                      onChange={handleTopicChange}
                      placeholder="Start typing topics..." 
                      autoComplete="off" 
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {suggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg">
                        {suggestions.map((suggestion, index) => (
                          <div 
                            key={index} 
                            className="px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => selectTopic(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedTopics.map((topic, index) => (
                      <motion.span 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm cursor-pointer hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                        onClick={() => removeTopic(topic)}
                      >
                        {topic}
                        <span className="text-xs">×</span>
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Log Progress
                </motion.button>
              </form>
            </motion.div>

            {/* Graph Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Last 7 Days Progress</h2>
                <div className="flex items-center gap-2 text-blue-600">
                  <BsGraphUpArrow className="text-xl" />
                  <span className="text-sm font-medium">Progress Chart</span>
                </div>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280"
                      tick={{ fill: '#6b7280' }}
                    />
                    <YAxis 
                      allowDecimals={false}
                      stroke="#6b7280"
                      tick={{ fill: '#6b7280' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="questions" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      dot={{ fill: '#6366f1', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: '#6366f1' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Logdsa

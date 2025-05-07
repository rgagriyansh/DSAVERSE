"use client"
import React from 'react'
import { BsGraphUpArrow } from "react-icons/bs";
import { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';


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
    <div className='h-[90vh] flex items-center justify-center container mx-auto'>
        <div className='border-2 border-slate-300 rounded-xl w-full flex justify-center items-center h-[80vh]'>

            <div className='w-full h-[75vh] flex'>
                

                <div className="max-w-md mx-auto p-4 space-y-6">
                <div className='flex  items-center justify-center gap-1'>
                <img  height={50} width={50} className='mb-3 text-black' src="/wired-lineal-153-bar-chart-morph-decrease-to-growth.gif" alt="graph" />
                <h1 className='font-bold text-3xl'>DSA Progress Logger</h1>
                </div>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input 
                        type="date" 
                        id="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                    />
                </div>

                <div>
                    <label htmlFor="ques" className="block text-sm font-medium text-gray-700">Questions Solved</label>
                    <input 
                        type="number" 
                        id="ques" 
                        placeholder="Enter Number" 
                        value={questionsSolved}
                        onChange={(e) => setQuestionsSolved(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                    />
                </div>

                <div>
                    <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Platform</label>
                    <select 
                        id="platform" 
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="leetcode">Leetcode</option>
                        <option value="geeksforgeeks">GeeksforGeeks</option>
                        <option value="striver">Striver</option>
                        <option value="codingninjas">Coding Ninjas</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="topics" className="block text-sm font-medium text-gray-700">Topics Covered</label>
                    <input 
                        type="text" 
                        id="topics" 
                        value={topics}
                        onChange={handleTopicChange}
                        placeholder="Start typing topics..." 
                        autoComplete="off" 
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {suggestions.length > 0 && (
                        <div className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10">
                            {suggestions.map((suggestion, index) => (
                                <div 
                                    key={index} 
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => selectTopic(suggestion)}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                    <div id="selected-topics" className="mt-2 flex flex-wrap gap-2">
                        {selectedTopics.map((topic, index) => (
                            <span 
                                key={index} 
                                className="bg-indigo-600 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-700"
                                onClick={() => removeTopic(topic)}
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="w-full cursor-pointer py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </form>
        </div>

        <div className="graph">

        </div>
        <div className="mt-10 w-1/2 mx-2 mr-5 h-[300px]">
        <h2 className="text-xl font-bold mb-4 text-center">Last 7 Days Progress</h2>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="questions" stroke="#6366f1" strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>
        </div>

            </div>


        </div>
    </div>
  )
}

export default Logdsa

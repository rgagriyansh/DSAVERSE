'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa6'
import { BsThreeDots } from 'react-icons/bs'

const SmartAssistantChat = () => {
  const [messages, setMessages] = useState([
    { from: 'assistant', text: "👋 Hi! I'm your Smart Coding Assistant. Ask me anything!" }
  ])
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    setIsLoading(true)
    const userMessage = { from: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" }
    })
    const data = await res.json()
    setMessages(prev => [...prev, { from: 'assistant', text: data.reply }])
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur"></div>
            <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <FaRobot className="text-xl text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-white font-semibold">Smart Coding Assistant</h2>
            <p className="text-sm text-blue-100">Ask me anything about coding!</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-start gap-3 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                msg.from === 'user' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-purple-100 text-purple-600'
              }`}>
                {msg.from === 'user' ? <FaUser className="w-4 h-4" /> : <FaRobot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] ${msg.from === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-2xl ${
                  msg.from === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <BsThreeDots className="animate-bounce" />
            <span className="text-sm">Assistant is typing...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Ask a coding question..."
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send</span>
                <FaPaperPlane className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default SmartAssistantChat

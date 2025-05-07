'use client'
import { useState, useRef, useEffect } from 'react'

const SmartAssistantChat = () => {
  const [messages, setMessages] = useState([
    { from: 'assistant', text: "👋 Hi! I’m your Smart Coding Assistant. Ask me anything!" }
  ])
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

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
  }

  return (
    <div className="w-full max-w-xl mx-auto h-[80vh] mt-5 flex flex-col bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md max-w-[80%] ${msg.from === 'user' ? 'bg-blue-200 self-end text-right' : 'bg-gray-200 self-start'}`}>
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 border-t flex items-center gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 border border-gray-300 rounded-md p-2 text-sm outline-blue-400"
          placeholder="Ask a coding question..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  )
}

export default SmartAssistantChat

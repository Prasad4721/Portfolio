'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap, Brain } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const quickQuestions = [
  "What's Prasad's experience with React?",
  "Tell me about Prasad's AI projects",
  "How can I contact Prasad?",
  "What technologies does Prasad use?",
  "Show me Prasad's best projects"
]

const aiResponses: { [key: string]: string } = {
  "react": "I have extensive experience with React! I've been building React applications for over 3 years, from simple components to complex enterprise applications. I'm proficient in React hooks, context API, Redux, Next.js, and modern React patterns. I've built everything from interactive dashboards to real-time collaboration tools using React.",
  
  "ai": "I'm passionate about AI and machine learning! I've worked on several AI-powered projects including an intelligent task manager that uses ML for scheduling optimization, a neural network visualizer for educational purposes, and various automation tools. I'm skilled in Python, TensorFlow, and integrating AI APIs into web applications.",
  
  "contact": "You can reach me through multiple channels! The best way is through the contact form on this website, or you can connect with me on LinkedIn for professional inquiries. I'm always excited to discuss new opportunities and collaborate on interesting projects.",
  
  "technologies": "I work with a wide range of technologies! On the frontend: React, Next.js, TypeScript, Tailwind CSS, and Three.js. Backend: Node.js, Python, PostgreSQL, MongoDB. Cloud: AWS, Docker, and various AI/ML frameworks. I'm always learning and exploring new technologies.",
  
  "projects": "My portfolio includes some exciting projects! Check out my AI-powered task manager, neural network visualizer, real-time collaboration platform, and blockchain analytics dashboard. Each project showcases different aspects of modern web development and innovative problem-solving."
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Prasad's AI assistant. I only answer questions about Prasad (experience, skills, projects, and contact).",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Strict guard: only answer if the message is about Prasad
    const mentionsPrasad = lowerMessage.includes("prasad") || lowerMessage.includes("about you") || lowerMessage.includes("about him") || lowerMessage.includes("your")

    if (!mentionsPrasad) {
      return "I can only answer questions about Prasad (experience, skills, projects, contact). Please mention Prasad or ask specifically about him."
    }

    if (lowerMessage.includes('react') || lowerMessage.includes('frontend')) {
      return aiResponses.react
    } else if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
      return aiResponses.ai
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('connect')) {
      return aiResponses.contact
    } else if (lowerMessage.includes('technologies') || lowerMessage.includes('tech') || lowerMessage.includes('stack') || lowerMessage.includes('skills')) {
      return aiResponses.technologies
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      return aiResponses.projects
    } else {
      return "I only answer about Prasad. Try: React experience, AI projects, technologies/skills, contact details, or projects."
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateAIResponse(inputText),
      isUser: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, aiResponse])
    setIsTyping(false)
  }

  const handleQuickQuestion = (question: string) => {
    setInputText(question)
    handleSendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center shadow-2xl hover-glow z-40"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(0, 245, 255, 0.5)',
            '0 0 30px rgba(191, 0, 255, 0.7)',
            '0 0 20px rgba(0, 245, 255, 0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle className="w-8 h-8 text-white" />
        
        {/* Notification dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-96 h-[600px] glass rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Prasad's AI</h3>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-neon-green to-neon-blue' 
                        : 'bg-gradient-to-r from-neon-blue to-neon-purple'
                    }`}>
                      {message.isUser ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`glass rounded-2xl p-3 ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border border-neon-blue/30' 
                        : ''
                    }`}>
                      <p className="text-sm text-white leading-relaxed">
                        {message.text}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="glass rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-neon-blue rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-neon-blue rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-neon-blue rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-4 border-t border-white/10">
              <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-1 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue rounded-full text-xs hover:from-neon-blue/30 hover:to-neon-purple/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Prasad..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


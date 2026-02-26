import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to the future of AI. How can I assist you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const API_URL = import.meta.env.VITE_API_BASE_URL 
      ? import.meta.env.VITE_API_BASE_URL + '/api/chat' 
      : 'http://localhost:8080/api/chat';
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.text();
      setMessages(prev => [...prev, { role: 'assistant', content: data }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I encountered a technical glitch while processing your request. Please ensure the backend service is running." 
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen relative bg-background overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px]" />
      </div>

      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center px-6 justify-between bg-background/50 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400 bg-transparent flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            <Sparkles size={16} />
          </div>
          <span className="font-bold text-lg tracking-tight italic">GEN AI</span>
          <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse ml-2" />
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-12 space-y-8 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                key={i}
                className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                  msg.role === 'assistant' 
                    ? 'bg-primary/20 text-primary border border-primary/20 blue-glow' 
                    : 'blue-gradient text-white blue-glow'
                }`}>
                  {msg.role === 'assistant' ? <Bot size={22} /> : <User size={22} />}
                </div>
                <div className={`mt-1.5 max-w-[85%] text-white/80 leading-relaxed font-medium ${
                  msg.role === 'user' ? 'text-right' : ''
                }`}>
                  <div className={`inline-block text-left p-4 rounded-3xl ${
                    msg.role === 'assistant' ? 'bg-white/5' : 'bg-primary/10 border border-primary/20'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/20 text-primary flex items-center justify-center animate-pulse">
                <Bot size={22} />
              </div>
              <div className="flex gap-1 items-center mt-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 md:p-12 pt-0 sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-4xl mx-auto relative group">
          <div className="relative glass rounded-[2rem] flex items-center p-2.5 shadow-2xl border-white/10 group-focus-within:border-primary/40 transition-all duration-300">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message GEN AI..."
              className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 placeholder:text-white/20 font-medium text-white"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-4 blue-gradient hover:opacity-90 rounded-2xl transition-all disabled:opacity-30 disabled:grayscale blue-glow shadow-xl"
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
          <p className="text-[10px] text-center text-white/10 mt-4 uppercase tracking-[0.3em] font-black">
            Optimized for Enterprise Architecture
          </p>
        </div>
      </div>
    </div>
  )
}


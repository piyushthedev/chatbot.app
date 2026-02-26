import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, MessageSquare, Zap, Shield, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="h-20 glass border-b border-white/5 fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-transparent flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]">
            <Sparkles size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight italic">GEN AI</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all font-medium text-sm">
            Sign In
          </Link>
          <Link to="/login" className="px-6 py-2.5 rounded-xl blue-gradient hover:opacity-90 transition-all font-bold text-sm blue-glow">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 relative">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-accent text-xs font-bold tracking-[0.2em] uppercase"
          >
            <Zap size={14} className="fill-current" />
            Next-Gen Conversational Intelligence
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            Intelligence <br />
            <span className="text-primary italic">Reimagined.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-medium leading-relaxed"
          >
            Experience the future of AI with our premium ChatGPT-inspired platform. 
            Built for speed, styled for elegance, and powered by advanced logic.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/login" className="px-8 py-4 rounded-2xl blue-gradient hover:opacity-90 transition-all font-extrabold text-lg flex items-center gap-3 group blue-glow">
              Start Free Trial
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 rounded-2xl glass hover:bg-white/5 transition-all font-bold text-lg">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<MessageSquare size={24} />}
            title="Real-time Flow"
            desc="Experience seamless, lightning-fast streaming responses powered by our Java core."
          />
          <FeatureCard 
            icon={<Shield size={24} />}
            title="Secure by Design"
            desc="Your data is protected with military-grade encryption and Spring Security."
          />
          <FeatureCard 
            icon={<Zap size={24} />}
            title="Cloud PWA"
            desc="Install as a standalone app on any device and enjoy offline-capable intelligence."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-white/20 text-xs font-medium tracking-widest uppercase">
        &copy; {new Date().getFullYear()} GEN AI. Built with Spring Boot & Vite.
      </footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-[2.5rem] glass border-white/5 space-y-4 hover:border-primary/30 transition-all group"
  >
    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:blue-glow transition-all">
      {icon}
    </div>
    <h3 className="text-xl font-bold tracking-tight">{title}</h3>
    <p className="text-white/40 leading-relaxed font-medium">{desc}</p>
  </motion.div>
)


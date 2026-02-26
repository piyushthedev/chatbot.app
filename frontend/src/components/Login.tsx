import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Sparkles, ArrowRight, Phone, UserPlus, LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [authType, setAuthType] = useState<'login' | 'signup'>('login')
  const [method, setMethod] = useState<'email' | 'mobile'>('email')
  const [identifier, setIdentifier] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'input' | 'otp'>('input')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!identifier) return
    setIsLoading(true)
    
    // Mock API call to backend
    console.log(`Sending OTP to ${method}:`, identifier)
    const API_URL = import.meta.env.VITE_API_BASE_URL 
      ? import.meta.env.VITE_API_BASE_URL + '/api/auth/send-otp' 
      : 'http://localhost:8080/api/auth/send-otp';
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier })
      });
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      setStep('otp')
    } catch (error) {
      console.error('Failed to send OTP:', error)
      alert('Failed to send OTP. Please check your connection or try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return
    setIsLoading(true)
    
    // Mock verification
    const API_URL = import.meta.env.VITE_API_BASE_URL 
      ? import.meta.env.VITE_API_BASE_URL + '/api/auth/verify-otp' 
      : 'http://localhost:8080/api/auth/verify-otp';
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, otp })
      });
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('auth_token', data.token)
        navigate('/chat')
      } else {
        alert('Invalid OTP')
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error)
      alert('Failed to verify OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 md:p-12 rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-transparent flex items-center justify-center text-cyan-400 mx-auto mb-6 shadow-[0_0_20px_rgba(34,211,238,0.8)]">
            <Sparkles size={28} />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2 italic">GEN AI</h1>
          <p className="text-white/40 font-medium">
            {authType === 'login' ? 'Welcome back, strategist' : 'Join the elite intelligence'}
          </p>
        </div>

        {/* Toggle Login/Signup */}
        <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/5">
          <button 
            onClick={() => { setAuthType('login'); setStep('input'); }}
            className={`flex-1 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${authType === 'login' ? 'bg-primary text-white blue-glow' : 'text-white/40 hover:text-white'}`}
          >
            <LogIn size={16} /> Login
          </button>
          <button 
            onClick={() => { setAuthType('signup'); setStep('input'); }}
            className={`flex-1 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${authType === 'signup' ? 'bg-primary text-white blue-glow' : 'text-white/40 hover:text-white'}`}
          >
            <UserPlus size={16} /> Sign Up
          </button>
        </div>

        {/* Toggle Method Email/Mobile */}
        {step === 'input' && (
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => { setMethod('email'); setIdentifier(''); }}
              className={`flex-1 py-2 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${method === 'email' ? 'border-primary/50 text-primary bg-primary/5' : 'border-white/5 text-white/20'}`}
            >
              Email
            </button>
            <button 
              onClick={() => { setMethod('mobile'); setIdentifier(''); }}
              className={`flex-1 py-2 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${method === 'mobile' ? 'border-primary/50 text-primary bg-primary/5' : 'border-white/5 text-white/20'}`}
            >
              Mobile
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 'input' ? (
            <motion.form
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSendOtp}
              className="space-y-6"
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-primary transition-colors">
                  {method === 'email' ? <Mail size={20} /> : <Phone size={20} />}
                </div>
                <input
                  type={method === 'email' ? 'email' : 'tel'}
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                  placeholder={method === 'email' ? 'name@example.com' : '+1 234 567 8900'}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full blue-gradient hover:opacity-90 text-white font-bold py-4 rounded-2xl transition-all blue-glow flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Verify Identity'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleVerifyOtp}
              className="space-y-6"
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-medium tracking-[0.5em] text-center"
                  placeholder="000000"
                />
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full blue-gradient hover:opacity-90 text-white font-bold py-4 rounded-2xl transition-all blue-glow disabled:opacity-50"
                >
                  {isLoading ? 'Authenticating...' : (authType === 'login' ? 'Login Now' : 'Create Account')}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-white/40 hover:text-white text-sm font-bold transition-colors uppercase tracking-wider"
                >
                  Change Details
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">
          Secured by {authType === 'login' ? 'Spring Security' : 'Military Encryption'}
        </p>
      </motion.div>
    </div>
  )
}


import { Plus, MessageSquare, Settings, LogOut, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('auth_token')
    navigate('/login')
  }

  return (
    <div className="w-72 h-screen glass border-r border-white/5 flex flex-col p-4 gap-6 hidden md:flex shrink-0">
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 bg-transparent flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          <Sparkles size={16} />
        </div>
        <span className="font-bold text-lg tracking-tight italic">GEN AI</span>
      </div>

      <button className="flex items-center gap-2 p-4 rounded-2xl blue-gradient hover:opacity-90 transition-all text-sm font-bold text-white blue-glow shadow-lg">
        <Plus size={18} />
        New Conversation
      </button>

      <div className="flex-1 flex flex-col gap-1 overflow-y-auto pr-2">
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-2 ml-2">Recent Chats</p>
        {[1, 2, 3].map((i) => (
          <button key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white text-sm transition-all text-left group">
            <MessageSquare size={16} className="group-hover:text-primary transition-colors" />
            <span className="truncate font-medium">Evolution of Java AI {i}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1 border-t border-white/5 pt-4">
        <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white text-sm transition-all font-medium">
          <Settings size={18} />
          Preferences
        </button>
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 text-white/40 hover:text-primary text-sm transition-all font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  )
}


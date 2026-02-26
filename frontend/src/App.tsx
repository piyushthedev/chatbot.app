import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Chat } from './components/Chat'
import { Login } from './components/Login'
import { Landing } from './components/Landing'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('auth_token')
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-background overflow-hidden selection:bg-primary/30 text-white leading-tight">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <div className="flex h-full">
                  <Sidebar />
                  <Chat />
                </div>
              </ProtectedRoute>
            }
          />
          {/* Redirect to home or chat based on auth if path not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

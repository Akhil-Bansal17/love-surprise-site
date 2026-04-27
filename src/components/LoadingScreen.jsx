import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(3)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setFadeOut(true)
          setTimeout(onComplete, 600)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center
      bg-gradient-to-br from-[#0f0517] via-[#1a0a2e] to-[#0f0517]
      transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Animated rings */}
      <div className="relative mb-12">
        <div className="w-32 h-32 rounded-full border-2 border-primary/30 animate-spin" 
          style={{ animationDuration: '3s' }} />
        <div className="absolute inset-2 rounded-full border-2 border-secondary/30 animate-spin" 
          style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
        <div className="absolute inset-4 rounded-full border-2 border-accent/30 animate-spin" 
          style={{ animationDuration: '1.5s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl animate-[heartbeat_1s_infinite]">💖</span>
        </div>
      </div>

      <p className="text-lg md:text-xl text-white/70 font-[--font-poppins] tracking-wider mb-6 animate-pulse">
        Loading something made with love...
      </p>
      
      <div className="text-6xl font-bold text-primary font-[--font-dancing] animate-[bounce-in_0.4s_ease]" key={count}>
        {count > 0 ? count : '💖'}
      </div>
    </div>
  )
}

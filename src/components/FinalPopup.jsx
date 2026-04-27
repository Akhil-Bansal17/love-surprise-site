import { useState, useEffect } from 'react'

export default function FinalPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
    // Celebration burst
    for (let i = 0; i < 50; i++) {
      const el = document.createElement('div')
      el.innerHTML = ['💖','🎉','✨','💫','🌟','💗','💘'][Math.floor(Math.random() * 7)]
      el.style.cssText = `position:fixed;left:50%;top:50%;font-size:${18+Math.random()*24}px;pointer-events:none;z-index:300;`
      document.body.appendChild(el)
      const x = (Math.random() - 0.5) * 1000
      const y = (Math.random() - 0.5) * 1000
      el.animate([
        { transform: 'translate(0,0)', opacity: 1 },
        { transform: `translate(${x}px,${y}px)`, opacity: 0 }
      ], { duration: 1500, fill: 'forwards' })
      setTimeout(() => el.remove(), 1500)
    }
  }, [])

  return (
    <div className={`fixed inset-0 z-[150] flex items-center justify-center
      bg-black/80 backdrop-blur-md transition-opacity duration-500
      ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`p-10 md:p-14 rounded-3xl bg-white/5 backdrop-blur-xl
        border border-white/10 text-center max-w-lg mx-4
        shadow-[0_0_80px_rgba(255,107,157,0.3)]
        transition-all duration-700
        ${visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
        <div className="text-6xl mb-6 animate-[heartbeat_1s_infinite] drop-shadow-[0_0_15px_rgba(255,107,157,0.8)]">💖</div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mb-4
          bg-gradient-to-r from-pink-300 via-primary to-pink-400 bg-clip-text text-transparent drop-shadow-md"
          style={{ fontFamily: 'var(--font-dancing)' }}>
          Mission complete!
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-sm"
          style={{ fontFamily: 'var(--font-poppins)' }}>
          Now I deserve a real yes 😚
        </p>
        
        <div className="mt-6 flex justify-center animate-[slide-up_1.2s_ease]">
          <div className="relative p-3 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 
            shadow-[0_0_40px_rgba(255,107,157,0.4)] hover:shadow-[0_0_60px_rgba(255,107,157,0.6)] 
            hover:scale-105 transition-all duration-500">
             <img src="/B9.jpeg" className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-2xl" alt="final memory" />
             <div className="absolute -bottom-4 -right-4 text-4xl animate-[bounce_2s_infinite] drop-shadow-lg">✨</div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
        <div className="text-6xl mb-6 animate-[heartbeat_1s_infinite]">💖</div>
        <h1 className="text-3xl md:text-4xl font-[--font-dancing]
          bg-gradient-to-r from-pink-300 via-primary to-secondary
          bg-clip-text text-transparent mb-4">
          Mission complete!
        </h1>
        <p className="text-xl md:text-2xl text-white/70 font-[--font-caveat]">
          Now I deserve a real yes 😚
        </p>
        <div className="mt-6 text-2xl animate-pulse">
          💖 ✨ 💗 ✨ 💖
        </div>
      </div>
    </div>
  )
}

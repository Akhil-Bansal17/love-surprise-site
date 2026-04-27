import { useState, useEffect } from 'react'

export default function ProposalSection({ onYes }) {
  const [catText, setCatText] = useState('Please say yes 🥺')
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [isDodging, setIsDodging] = useState(false)
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [visible, setVisible] = useState(false)
  const [yesScale, setYesScale] = useState(1)

  const quotes = [
    "I made this only for you 💌",
    "Don't break my tiny heart 🥺",
    "Please think carefully 😼",
    "One click can change everything 💖"
  ]

  useEffect(() => {
    setTimeout(() => setVisible(true), 200)
    const interval = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % quotes.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handleNoHover = () => {
    setIsDodging(true)
    
    // Increase the size of the Yes button every time No is dodged
    setYesScale(prev => Math.min(prev + 0.15, 2.5))
    
    setCatText(['Catch me if you can 😼', 'Nice try! 😹', 'No option for no 😤', 'Still trying? 😜'][Math.floor(Math.random() * 4)])
    
    // Calculate new random position within viewport bounds
    const maxX = window.innerWidth - 150
    const maxY = window.innerHeight - 80
    
    let newX = Math.random() * maxX
    let newY = Math.random() * maxY
    
    // Ensure it moves a decent distance from current position
    setNoPos({ x: newX, y: newY })
    
    // Add a little poof effect when it dodges
    const poof = document.createElement('div')
    poof.innerHTML = '💨'
    poof.style.cssText = `
      position: fixed; left: ${noPos.x + 40}px; top: ${noPos.y + 20}px; font-size: 24px;
      pointer-events: none; z-index: 200;
    `
    document.body.appendChild(poof)
    poof.animate([
      { transform: 'scale(0.5)', opacity: 1 },
      { transform: 'scale(1.5) translateY(-20px)', opacity: 0 }
    ], { duration: 500, fill: 'forwards' })
    setTimeout(() => poof.remove(), 500)
  }

  const handleYes = () => {
    // Heart burst
    for (let i = 0; i < 40; i++) {
      const heart = document.createElement('div')
      heart.innerHTML = ['💖', '💘', '💕', '💗'][Math.floor(Math.random() * 4)]
      heart.style.cssText = `
        position: fixed; left: 50%; top: 50%; font-size: ${20 + Math.random() * 20}px;
        pointer-events: none; z-index: 200;
      `
      document.body.appendChild(heart)
      const x = (Math.random() - 0.5) * 800
      const y = (Math.random() - 0.5) * 800
      heart.animate([
        { transform: 'translate(0,0)', opacity: 1 },
        { transform: `translate(${x}px,${y}px)`, opacity: 0 }
      ], { duration: 1200, fill: 'forwards' })
      setTimeout(() => heart.remove(), 1200)
    }
    onYes()
  }

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center px-4 
      transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Pulsing heart */}
      <div className="text-6xl md:text-7xl mb-4 animate-[heartbeat_1.5s_infinite]">❤️</div>

      {/* Cat */}
      <div className="relative mb-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616430.png"
          alt="cute cat"
          className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_20px_rgba(255,107,157,0.5)]
            animate-[gift-hover_3s_ease-in-out_infinite]"
        />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap
          bg-white/10 backdrop-blur-md text-white/90 px-5 py-2 rounded-full text-sm md:text-base
          border border-white/20 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
          {catText}
        </div>
      </div>

      {/* Question box */}
      <div className="mt-10 p-10 md:p-14 rounded-3xl bg-white/5 backdrop-blur-xl 
        border border-white/10 text-center max-w-lg w-full
        shadow-[0_0_60px_rgba(255,107,157,0.15)]
        animate-[slide-up_0.8s_ease]">
        
        <h2 className="text-4xl md:text-5xl font-[--font-dancing] text-white mb-6 leading-relaxed">
          Will you be mine? 🥺💍💖
        </h2>

        <p className="text-white/60 mb-10 h-8 transition-all duration-500 font-[--font-caveat] text-xl md:text-2xl">
          {quotes[quoteIdx]}
        </p>

        <div className="flex gap-4 justify-center items-center flex-wrap min-h-[60px] relative">
          <button
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark
              text-white font-semibold text-lg
              shadow-[0_0_25px_rgba(255,107,157,0.4)]
              hover:shadow-[0_0_40px_rgba(255,107,157,0.6)]
              transition-all duration-300 cursor-pointer z-10"
          >
            Yes 💖
          </button>

          {!isDodging && (
            <button
              onClick={handleNoHover}
              onMouseEnter={handleNoHover}
              className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm
                text-white/70 font-semibold text-lg border border-white/10
                hover:bg-white/15 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)] relative"
            >
              No 🙈
            </button>
          )}
        </div>
      </div>

      {isDodging && (
        <button
          onClick={handleNoHover}
          onMouseEnter={handleNoHover}
          className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm
            text-white/70 font-semibold text-lg border border-white/10
            hover:bg-white/15 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)] fixed z-50"
          style={{ left: noPos.x + 'px', top: noPos.y + 'px' }}
        >
          No 🙈
        </button>
      )}
    </section>
  )
}


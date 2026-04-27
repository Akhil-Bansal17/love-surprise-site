import { useState, useEffect } from 'react'

const reasons = [
  {
    emoji: '😊',
    text: 'Your smile has this quiet magic… it makes even my worst days feel lighter.'
  },
  {
    emoji: '👀',
    text: 'Your eyes say things that words never could… and I get lost in them every time.'
  },
  {
    emoji: '🎵',
    text: 'Your voice feels like comfort… no matter what\'s going on, it calms me instantly.'
  },
  {
    emoji: '💝',
    text: 'The way you care for people… it\'s rare, pure, and honestly one of the most beautiful things about you.'
  }
]

export default function ReasonsSection({ onNext }) {
  const [visible, setVisible] = useState(false)
  const [revealedCards, setRevealedCards] = useState([])

  useEffect(() => {
    setTimeout(() => setVisible(true), 200)
    reasons.forEach((_, i) => {
      setTimeout(() => {
        setRevealedCards(prev => [...prev, i])
      }, 600 + i * 400)
    })
  }, [])

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center px-4 py-16
      transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mb-16
        bg-gradient-to-r from-pink-300 via-primary to-pink-400
        bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,107,157,0.5)]
        animate-[slide-up_0.8s_ease]"
        style={{ fontFamily: 'var(--font-dancing)' }}>
        Reasons why you are special to me 💖
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl w-full mb-16">
        {reasons.map((reason, i) => (
          <div
            key={i}
            className={`p-8 md:p-10 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10
              transition-all duration-700 hover:bg-white/10 hover:-translate-y-2
              shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_50px_rgba(255,107,157,0.3)]
              hover:border-primary/40 group
              ${revealedCards.includes(i) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'}`}
          >
            <div className="text-4xl md:text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              {reason.emoji}
            </div>
            <p className="text-white/85 leading-[1.8] text-[1.1rem] md:text-[1.2rem]
              group-hover:text-white transition-colors duration-300"
              style={{ fontFamily: 'var(--font-poppins)' }}>
              {reason.text}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary
          text-white font-semibold text-lg
          shadow-[0_0_25px_rgba(255,107,157,0.4)]
          hover:shadow-[0_0_40px_rgba(255,107,157,0.6)]
          hover:scale-105 active:scale-95
          transition-all duration-300 cursor-pointer
          animate-[slide-up_1s_ease]"
      >
        One last thing 😚
      </button>
    </section>
  )
}

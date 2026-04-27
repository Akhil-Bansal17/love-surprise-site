import { useState, useEffect } from 'react'

const questions = [
  { q: 'Who is cutest? 😼', options: ['Me', 'Obviously Me'] },
  { q: 'Did you like this website? 💖', options: ['Yes', 'Of course'] },
  { q: 'Should we make more memories? 🌸', options: ['100% Yes', 'Absolutely'] }
]

export default function GameSection({ onComplete }) {
  const [visible, setVisible] = useState(false)
  const [answered, setAnswered] = useState({})

  useEffect(() => { setTimeout(() => setVisible(true), 200) }, [])

  const handleAnswer = (qIdx, optIdx) => {
    setAnswered(prev => ({ ...prev, [qIdx]: optIdx }))
  }

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center px-4 py-16
      transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mb-16
        bg-gradient-to-r from-pink-300 via-primary to-pink-400 bg-clip-text text-transparent drop-shadow-md"
        style={{ fontFamily: 'var(--font-dancing)' }}>
        Before you leave, answer this 😚
      </h1>
      <div className="w-full max-w-xl flex flex-col gap-12 mb-20 relative z-10">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="p-8 md:p-10 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10
            shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:border-primary/30 transition-colors duration-500">
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 text-center drop-shadow-sm"
               style={{ fontFamily: 'var(--font-poppins)' }}>
              {q.q}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {q.options.map((opt, optIdx) => (
                <button key={optIdx} onClick={() => handleAnswer(qIdx, optIdx)}
                  style={{ fontFamily: 'var(--font-poppins)' }}
                  className={`px-10 py-3.5 rounded-full font-semibold text-[1.05rem] md:text-[1.15rem] transition-all duration-300 cursor-pointer
                    ${answered[qIdx] === optIdx
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_25px_rgba(255,107,157,0.5)] scale-105 border border-transparent'
                      : 'bg-white/5 text-white/75 border border-white/15 hover:bg-white/10 hover:border-white/30 hover:scale-105'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={onComplete}
        style={{ fontFamily: 'var(--font-poppins)' }}
        className="px-12 py-5 rounded-full bg-gradient-to-r from-primary via-primary-dark to-secondary
          text-white font-bold text-xl tracking-wide shadow-[0_0_40px_rgba(255,107,157,0.4)]
          hover:shadow-[0_0_60px_rgba(255,107,157,0.7)] hover:scale-105 active:scale-95
          transition-all duration-300 cursor-pointer">
        Complete Mission 🎯
      </button>
    </section>
  )
}

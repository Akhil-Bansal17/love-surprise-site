import { useState, useEffect, useRef } from 'react'

export default function HeroSection({ onContinue }) {
  const canvasRef = useRef(null)
  const [visible, setVisible] = useState(false)

  // Starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.alpha += s.speed
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.abs(Math.sin(s.alpha))})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Starfield */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Deep purple gradient bg */}
      <div className="fixed inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, #2d1b4e 0%, #1a0a2e 45%, #0f0517 100%)' }} />

      {/* Floating balloons background */}
      <div className="fixed inset-0 pointer-events-none z-[2] opacity-60">
        {['🎈','🎈','🎈','🎈','🎈','🎈'].map((b, i) => (
          <span key={i} className="absolute text-3xl md:text-5xl"
            style={{
              left: `${5 + i * 18}%`,
              animation: `float-balloon ${10 + i * 3}s linear infinite`,
              animationDelay: `${i * 2.5}s`,
              filter: `hue-rotate(${i * 45}deg) opacity(0.7)`
            }}>{b}</span>
        ))}
      </div>

      {/* Floating confetti dots */}
      <ConfettiDots />

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center text-center px-4
        transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

        {/* Date badge */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full
            border border-amber-400/40"
            style={{ background: 'rgba(251,191,36,0.08)' }}>
            <span className="text-base">🎉</span>
            <span className="text-amber-300/90 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
              6 April · A Special Day
            </span>
          </div>
        </div>

        {/* Main cursive title */}
        <div className="mb-6">
          <h1
            className="font-[--font-dancing] font-bold leading-[1.1]"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 8rem)',
              background: 'linear-gradient(135deg, #f9a8d4 0%, #f472b6 40%, #ec4899 70%, #db2777 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(244,114,182,0.35))',
            }}>
            A Small Surprise
          </h1>
          <div className="flex items-center justify-center gap-4">
            <h1
              className="font-[--font-dancing] font-bold leading-[1.1]"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 8rem)',
                background: 'linear-gradient(135deg, #f9a8d4 0%, #f472b6 40%, #ec4899 70%, #db2777 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(244,114,182,0.35))',
              }}>
              For Ishita
            </h1>
            {/* Sparkle stars like the reference */}
            <div className="flex flex-col gap-1 opacity-80" style={{ color: '#a855f7' }}>
              <span className="text-3xl md:text-4xl" style={{ filter: 'drop-shadow(0 0 12px #a855f7)' }}>✦</span>
              <span className="text-5xl md:text-6xl -mt-2" style={{ filter: 'drop-shadow(0 0 20px #a855f7)' }}>✦</span>
              <span className="text-3xl md:text-4xl -mt-2" style={{ filter: 'drop-shadow(0 0 12px #a855f7)' }}>✦</span>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-white/55 text-base md:text-xl font-[--font-poppins] font-light
          tracking-wide max-w-md mt-6 mb-16 leading-relaxed">
          · A small surprise for ishita ·
        </p>

        {/* Emoji row: balloon cake balloon */}
        <div className="flex items-end justify-center gap-16 mt-8 mb-24 relative z-20">
          <span className="text-6xl md:text-7xl animate-bounce"
            style={{ animationDuration: '2.5s', animationDelay: '0s', filter: 'drop-shadow(0 4px 12px rgba(255,107,157,0.4))' }}>
            🎈
          </span>
          <span className="text-7xl md:text-[7.5rem] animate-bounce"
            style={{ animationDuration: '2.2s', animationDelay: '0.15s', filter: 'drop-shadow(0 4px 20px rgba(255,180,100,0.5))' }}>
            🎂
          </span>
          <span className="text-6xl md:text-7xl animate-bounce"
            style={{ animationDuration: '2.5s', animationDelay: '0.3s', filter: 'drop-shadow(0 4px 12px rgba(255,107,157,0.4))' }}>
            🎈
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={onContinue}
          className="group relative px-14 py-5 rounded-full text-white font-semibold
            text-xl tracking-wide cursor-pointer overflow-hidden mt-4
            transition-all duration-300 hover:scale-105 active:scale-95
            shadow-[0_0_40px_rgba(244,114,182,0.4)]
            hover:shadow-[0_0_60px_rgba(244,114,182,0.6)]"
          style={{ background: 'linear-gradient(135deg, #f472b6, #db2777, #a855f7)' }}>
          <span className="relative z-10">Open Your Surprise 💝</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899, #f472b6)' }} />
        </button>
      </div>
    </section>
  )
}

/* Scattered coloured dots like in the reference screenshot */
function ConfettiDots() {
  const dots = [
    { top: '12%', left: '8%',  size: 10, color: '#f59e0b' },
    { top: '18%', left: '22%', size: 8,  color: '#3b82f6' },
    { top: '8%',  left: '55%', size: 7,  color: '#10b981' },
    { top: '15%', right: '18%',size: 10, color: '#f59e0b' },
    { top: '22%', right: '8%', size: 8,  color: '#f97316' },
    { top: '35%', left: '4%',  size: 9,  color: '#f472b6' },
    { top: '60%', left: '6%',  size: 8,  color: '#a855f7' },
    { top: '70%', left: '18%', size: 7,  color: '#3b82f6' },
    { top: '80%', left: '8%',  size: 10, color: '#f59e0b' },
    { top: '40%', right: '5%', size: 9,  color: '#10b981' },
    { top: '55%', right: '12%',size: 8,  color: '#f97316' },
    { top: '75%', right: '7%', size: 10, color: '#3b82f6' },
    { top: '85%', right: '20%',size: 7,  color: '#f472b6' },
    { top: '90%', left: '40%', size: 8,  color: '#a855f7' },
    { top: '5%',  left: '38%', size: 9,  color: '#f59e0b' },
  ]
  return (
    <div className="fixed inset-0 pointer-events-none z-[2]">
      {dots.map((d, i) => (
        <div key={i} className="absolute rounded-full animate-pulse"
          style={{
            width: d.size, height: d.size,
            background: d.color,
            top: d.top, left: d.left, right: d.right,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + (i % 3)}s`,
            boxShadow: `0 0 6px ${d.color}`,
            opacity: 0.85,
          }} />
      ))}
    </div>
  )
}

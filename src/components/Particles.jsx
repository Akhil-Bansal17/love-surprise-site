import { useEffect, useRef } from 'react'

export default function Particles() {
  const heartsRef = useRef(null)
  const sparklesRef = useRef(null)
  const confettiRef = useRef(null)

  useEffect(() => {
    const heartEmojis = ['💖', '💘', '💕', '💗', '💓', '💞']
    const sparkleEmojis = ['✨', '⭐', '🌟', '💫']
    const confettiColors = ['#ff6b9d', '#a855f7', '#f472b6', '#fbbf24', '#34d399', '#60a5fa']

    // Hearts
    const heartInterval = setInterval(() => {
      if (!heartsRef.current) return
      const heart = document.createElement('span')
      heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
      heart.style.cssText = `
        position: fixed; left: ${Math.random() * 100}vw; bottom: -20px;
        font-size: ${15 + Math.random() * 20}px; pointer-events: none; z-index: 1;
        animation: float-up ${5 + Math.random() * 6}s linear forwards;
      `
      heartsRef.current.appendChild(heart)
      setTimeout(() => heart.remove(), 11000)
    }, 300)

    // Sparkles
    const sparkleInterval = setInterval(() => {
      if (!sparklesRef.current) return
      const sparkle = document.createElement('span')
      sparkle.innerHTML = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)]
      sparkle.style.cssText = `
        position: fixed; left: ${Math.random() * 100}vw; top: ${Math.random() * 100}vh;
        font-size: ${10 + Math.random() * 16}px; pointer-events: none; z-index: 1;
        animation: twinkle 2s infinite;
      `
      sparklesRef.current.appendChild(sparkle)
      setTimeout(() => sparkle.remove(), 2500)
    }, 200)

    // Confetti
    const confettiInterval = setInterval(() => {
      if (!confettiRef.current) return
      const confetti = document.createElement('div')
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]
      const size = 6 + Math.random() * 8
      const shape = Math.random() > 0.5 ? '50%' : '2px'
      confetti.style.cssText = `
        position: fixed; left: ${Math.random() * 100}vw; top: -20px;
        width: ${size}px; height: ${size}px; background: ${color};
        border-radius: ${shape}; pointer-events: none; z-index: 1;
        animation: confetti-fall ${4 + Math.random() * 4}s linear forwards;
      `
      confettiRef.current.appendChild(confetti)
      setTimeout(() => confetti.remove(), 8000)
    }, 250)

    return () => {
      clearInterval(heartInterval)
      clearInterval(sparkleInterval)
      clearInterval(confettiInterval)
    }
  }, [])

  return (
    <>
      <div ref={heartsRef} className="fixed inset-0 pointer-events-none z-[1]" />
      <div ref={sparklesRef} className="fixed inset-0 pointer-events-none z-[1]" />
      <div ref={confettiRef} className="fixed inset-0 pointer-events-none z-[1]" />
    </>
  )
}

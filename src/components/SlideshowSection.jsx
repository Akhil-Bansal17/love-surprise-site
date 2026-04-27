import { useState, useEffect, useRef } from 'react'

export default function SlideshowSection({ onNext }) {
  const images = ['/B1.jpeg', '/B2.jpeg', '/B3.jpeg', '/B4.jpeg', '/B5.jpeg', '/B6.jpeg']
  const lyrics = [
    "Your morning eyes, I could stare like watching stars ✨",
    "I could walk you by, and I'll tell without a thought 💫",
    "You'd be mine, would you mind if I took your hand tonight? 🤝",
    "Know you're all that I want this life like this ❤️"
  ]

  const [imgIndex, setImgIndex] = useState(0)
  const [lyricIndex, setLyricIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [lyricFade, setLyricFade] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => { setTimeout(() => setVisible(true), 200) }, [])

  // Audio manager
  useEffect(() => {
    const bgMusic = document.querySelector('audio[src="/music.mp3"]')
    let wasPlaying = false
    if (bgMusic && !bgMusic.paused) {
      wasPlaying = true
      bgMusic.pause()
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 17
      audioRef.current.play().catch(() => console.log('Autoplay blocked'))
    }

    // Stop song exactly after the lyrics finish (4 lines * 6 seconds = 24 seconds)
    const stopAudio = setTimeout(() => {
      if (audioRef.current) {
        // Smooth fade out
        let vol = 1
        const fadeOut = setInterval(() => {
          if (vol > 0.1) {
            vol -= 0.1
            audioRef.current.volume = vol
          } else {
            clearInterval(fadeOut)
            audioRef.current.pause()
          }
        }, 100)
      }
    }, 24000)

    return () => {
      clearTimeout(stopAudio)
      if (audioRef.current) audioRef.current.pause()
      if (wasPlaying && bgMusic) bgMusic.play().catch(() => {})
    }
  }, [])

  // Image slideshow
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setImgIndex(prev => (prev + 1) % images.length)
        setFade(true)
      }, 1000)
    }, 4500)
    return () => clearInterval(slideInterval)
  }, [])

  // Lyrics slideshow
  useEffect(() => {
    const lyricInterval = setInterval(() => {
      setLyricFade(false)
      setTimeout(() => {
        setLyricIndex(prev => {
          if (prev === lyrics.length - 1) {
            setShowButton(true)
            return prev
          }
          return prev + 1
        })
        setLyricFade(true)
      }, 1000)
    }, 6000) // Display each lyric for 6 seconds
    
    // Show button after 18 seconds as a fallback
    const buttonTimeout = setTimeout(() => setShowButton(true), 18000)
    
    return () => {
      clearInterval(lyricInterval)
      clearTimeout(buttonTimeout)
    }
  }, [lyrics.length])

  return (
    <section className={`min-h-screen relative flex items-center justify-center overflow-hidden bg-black transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      
      <audio ref={audioRef} src="/Blue.mp3" preload="auto" />

      {/* Background Images with Ken Burns */}
      {images.map((src, idx) => (
        <div 
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out
            ${imgIndex === idx && fade ? 'opacity-100' : 'opacity-0 z-0'}`}
        >
          {/* Main Image with padding and proper ratio */}
          <div className="absolute inset-0 p-6 md:p-16 flex items-center justify-center">
            <img 
              src={src} 
              className={`max-w-full max-h-full object-contain rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.8)] 
                transition-transform duration-[6000ms] ease-out origin-center
                ${imgIndex === idx && fade ? 'scale-105' : 'scale-100'}`}
              alt="memory"
            />
          </div>
        </div>
      ))}

      {/* Dark overlay for readability (no blur, so photos are crystal clear) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Lyrics */}
      <div className="relative z-10 px-6 text-center max-w-5xl mx-auto flex flex-col items-center justify-center h-full w-full">
        <p className={`text-2xl md:text-4xl lg:text-5xl text-white/95 font-light italic tracking-wider leading-relaxed md:leading-relaxed
          transition-all duration-[1200ms] ease-in-out
          drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]
          ${lyricFade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
          style={{ fontFamily: 'var(--font-poppins)', textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}>
          {lyrics[lyricIndex]}
        </p>
      </div>

      {/* Next Button */}
      {showButton && (
        <div className="absolute bottom-16 w-full flex justify-center z-20 animate-[slide-up_1s_ease]">
          <button onClick={onNext}
            className="px-10 py-4 rounded-full text-white font-[--font-poppins] font-semibold text-lg cursor-pointer
              transition-all duration-300 hover:scale-105 active:scale-95
              border border-white/20 bg-white/10 backdrop-blur-md
              shadow-[0_0_25px_rgba(255,107,157,0.3)] hover:shadow-[0_0_40px_rgba(255,107,157,0.6)]">
            Keep Going 💝
          </button>
        </div>
      )}
    </section>
  )
}

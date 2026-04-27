import { useState, useRef } from 'react'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggle}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2
          bg-white/5 backdrop-blur-xl border border-white/10 rounded-full
          hover:bg-white/10 transition-all duration-300 group cursor-pointer"
      >
        {playing ? (
          <>
            <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
              Now Playing
            </span>
            <div className="flex items-end gap-0.5 h-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="w-[3px] bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${8 + Math.random() * 10}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${0.4 + Math.random() * 0.3}s`
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
              Play Music
            </span>
            <span className="text-lg">🎵</span>
          </>
        )}
      </button>
    </>
  )
}

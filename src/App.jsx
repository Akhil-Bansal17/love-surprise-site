import { useState, useEffect, useRef, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Particles from './components/Particles'
import HeroSection from './components/HeroSection'
import ProposalSection from './components/ProposalSection'
import GiftSection from './components/GiftSection'
import SlideshowSection from './components/SlideshowSection'
import ReasonsSection from './components/ReasonsSection'
import GameSection from './components/GameSection'
import FinalPopup from './components/FinalPopup'
import MusicPlayer from './components/MusicPlayer'

function App() {
  const [loading, setLoading] = useState(true)
  const [currentScreen, setCurrentScreen] = useState(0) // 0=hero, 1=proposal, 2=gift, 3=slideshow, 4=reasons, 5=game
  const [showFinalPopup, setShowFinalPopup] = useState(false)
  const [transition, setTransition] = useState(false)
  const [transitionText, setTransitionText] = useState('')

  const goToScreen = useCallback((screen, text = '') => {
    if (text) {
      setTransitionText(text)
      setTransition(true)
      setTimeout(() => {
        setCurrentScreen(screen)
        setTransition(false)
      }, 2000)
    } else {
      setCurrentScreen(screen)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Transition overlay */}
      {transition && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-[bounce-in_0.5s_ease]">
          <h1 className="text-4xl md:text-6xl font-[--font-dancing] text-primary animate-[heartbeat_1s_infinite]">
            {transitionText}
          </h1>
        </div>
      )}

      {!loading && (
        <>
          <Particles />
          <MusicPlayer />

          {/* Background blur circles */}
          <div className="blur-circle fixed w-[300px] h-[300px] bg-primary/20 top-[10%] left-[10%]" />
          <div className="blur-circle fixed w-[400px] h-[400px] bg-secondary/15 bottom-[20%] right-[10%]" />
          <div className="blur-circle fixed w-[250px] h-[250px] bg-accent/15 top-[50%] left-[50%]" />

          <main className="relative z-10">
            {currentScreen === 0 && (
              <HeroSection onContinue={() => goToScreen(1)} />
            )}
            {currentScreen === 1 && (
              <ProposalSection onYes={() => goToScreen(2, 'I knew it 😚💖')} />
            )}
            {currentScreen === 2 && (
              <GiftSection onNext={() => goToScreen(3)} />
            )}
            {currentScreen === 3 && (
              <SlideshowSection onNext={() => goToScreen(4)} />
            )}
            {currentScreen === 4 && (
              <ReasonsSection onNext={() => goToScreen(5)} />
            )}
            {currentScreen === 5 && (
              <GameSection onComplete={() => setShowFinalPopup(true)} />
            )}
          </main>

          {showFinalPopup && <FinalPopup />}
        </>
      )}
    </div>
  )
}

export default App

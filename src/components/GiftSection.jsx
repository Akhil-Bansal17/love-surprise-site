import { useState, useEffect } from 'react'

const LETTER = `Dear Ishu,

Sometimes I sit and think about how unexpectedly you became such an important part of my days.
It's strange, isn't it?

Two people start with random conversations, random teasing, random "what are you doing" texts… and then one day those random things stop feeling random.
They start becoming the best parts of your routine.

That is exactly what happened with me.

Talking to you slowly became my comfort without me even realizing it.
Whether it was our stupid jokes, your dramatic overthinking, your mood swings, your pagalpanti, your "hmm okay" replies, or those long conversations where we somehow kept jumping from one topic to another...
every little thing started meaning more to me than it probably should have.

And honestly, I love that.

I love the fact that some of my happiest smiles in the last few days have been because of you.
I love how even when I am busy, tired, or irritated, one proper conversation with you changes my mood.
I love how I now subconsciously wait for your messages.
I love how normal moments become fun when they are shared with you.

You know what makes all this more special?
You.

Because there is something about you that is impossible to ignore.
Your madness.
Your cute little nakhre.
Your habit of overthinking ten things at once.
The way you act strong and unserious but still have such a soft heart underneath.
The way you laugh at nonsense.
The way you get awkward and then pretend nothing happened.

Everything about you feels... alive.
Real.
Unfiltered.

And maybe that is why spending time with you never feels boring, never feels forced, never feels like I am talking just for the sake of talking.
It feels like I am with someone who genuinely matters.

Ishu, I don't think you realize how many good moments you have given me in such a short time.
There have been so many nights where I slept smiling after talking to you.
So many times where I laughed alone looking at my phone because of something stupid you said.
So many times where I wanted to tell you every random thing happening in my day because somewhere in my head, sharing things with you feels natural now.

These may look like small things, but to me they are not small.
They are the kind of moments that quietly make someone special.

And yes, along with all these moments, my feelings for you also became special.
I started feeling attached.
I started caring more.
I started liking your presence more than I should admit.

But the beautiful part is — these feelings never came from pressure.
They came from how genuinely happy you make me.

That is why I never want you to feel guilty for any of this.
You did not do something wrong.
You simply became someone I cherish.
Someone whose texts brighten my mood.
Someone whose absence is noticed.
Someone whose comfort matters to me.

I know sometimes you get scared of feelings, scared of names, scared of where things can go.
But I just want you to know that when I think of us, I do not first think of fear.
I think of all the good time we have spent.
I think of all the smiles.
I think of all the comfort.
I think of how naturally beautiful this bond has felt.

And I feel grateful.
Very grateful.

Because among all the ordinary days life gives, you somehow became one of my favorite parts of them.

Thank you for every conversation, every laugh, every silly moment, every soft moment, every memory we are still creating without even knowing.

You are truly special to me, Ishu.
More than you know.

Always yours.`

export default function GiftSection({ onNext }) {
  const [opened, setOpened] = useState(false)
  const [visible, setVisible] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [imgFade, setImgFade] = useState(true)
  const images = ['/B1.jpeg', '/B2.jpeg', '/B3.jpeg', '/B4.jpeg', '/B5.jpeg', '/B6.jpeg']

  useEffect(() => { setTimeout(() => setVisible(true), 200) }, [])

  useEffect(() => {
    if (!opened) return
    const slideInterval = setInterval(() => {
      setImgFade(false)
      setTimeout(() => {
        setImgIndex(prev => (prev + 1) % images.length)
        setImgFade(true)
      }, 500) // longer fade out
    }, 4000) // longer display time
    return () => clearInterval(slideInterval)
  }, [opened])

  const openLetter = () => {
    // sparkle burst
    for (let i = 0; i < 35; i++) {
      const el = document.createElement('div')
      el.innerHTML = ['✨','💖','🎉','💫','⭐'][Math.floor(Math.random() * 5)]
      el.style.cssText = `position:fixed;left:50%;top:50%;font-size:${16+Math.random()*20}px;pointer-events:none;z-index:200;`
      document.body.appendChild(el)
      const x = (Math.random() - 0.5) * 600, y = (Math.random() - 0.5) * 600
      el.animate([
        { transform: 'translate(0,0) scale(0)', opacity: 1 },
        { transform: `translate(${x}px,${y}px) scale(1.4)`, opacity: 0 }
      ], { duration: 900, fill: 'forwards' })
      setTimeout(() => el.remove(), 900)
    }
    setOpened(true)
  }

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center px-4 py-12
      transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Floating balloons */}
      <div className="fixed inset-0 pointer-events-none z-[2]">
        {['🎈','🎈','🎈','🎈','🎈'].map((b, i) => (
          <span key={i} className="absolute text-3xl md:text-4xl"
            style={{
              left: `${8 + i * 21}%`,
              animation: `float-balloon ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
              filter: `hue-rotate(${i * 55}deg)`
            }}>{b}</span>
        ))}
      </div>

      {!opened ? (
        /* ── Closed card (like the reference screenshot) ── */
        <div
          onClick={openLetter}
          className="relative cursor-pointer max-w-sm w-full mx-auto select-none"
          style={{ animation: 'gift-hover 3s ease-in-out infinite' }}>

          {/* Card */}
          <div className="rounded-2xl p-10 text-center border border-pink-500/30
            backdrop-blur-xl transition-all duration-300 hover:scale-[1.03]
            hover:shadow-[0_0_60px_rgba(244,114,182,0.35)]"
            style={{ background: 'rgba(80,20,120,0.55)', boxShadow: '0 0 40px rgba(168,85,247,0.2)' }}>

            {/* Heart-gift icon */}
            <div className="text-6xl mb-5 animate-[heartbeat_1.5s_infinite]">💝</div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide">
              Ek Khaas Letter For You
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 font-[--font-caveat] text-lg">
              Maine kuch likha hai sirf tumhare liye… tap karke padhna. 🤍
            </p>

            <div className="text-pink-400 font-semibold tracking-widest text-sm animate-pulse">
              ✦ Tap to open ✦
            </div>
          </div>
        </div>
      ) : (
        /* ── Opened: full letter only ── */
        <div className="w-full max-w-4xl mx-auto px-4 relative z-10" style={{ animation: 'bounce-in 0.6s ease' }}>
          
          <div className="rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-2xl 
            shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden relative">
            
            {/* Ambient glows inside the card */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-50" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-h-[75vh] overflow-y-auto relative z-10
              scrollbar-thin scrollbar-thumb-pink-500/60 scrollbar-track-transparent"
              style={{ padding: '3rem 8%' }}>
              
              <div className="space-y-7">
                {LETTER.split('\n').map((line, i) => {
                  if (line.trim() === '') return null;
                  
                  // Special formatting for specific lines to match the emotional tone
                  const isGreeting = line.startsWith('Dear');
                  const isEnding = line === 'Always yours.';
                  const isHighlight = line.includes('truly special to me') || line.includes('very grateful');

                  return (
                    <p key={i}
                      className={`leading-[2] text-[1.05rem] md:text-[1.15rem] tracking-wide
                        ${isGreeting ? 'text-pink-300 font-semibold text-2xl md:text-3xl mb-6' : ''}
                        ${isEnding ? 'text-pink-400 font-semibold text-xl mt-10 text-right' : ''}
                        ${isHighlight ? 'text-purple-300 font-medium' : 'text-white/80'}
                      `}
                      style={{ fontFamily: 'var(--font-poppins)' }}>
                      {line}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button onClick={onNext}
              className="group relative px-10 py-3.5 rounded-full text-white font-semibold text-lg cursor-pointer
                transition-all duration-300 hover:scale-105 active:scale-95
                shadow-[0_0_25px_rgba(168,85,247,0.3)]
                hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] border border-pink-500/30"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
              <span className="relative z-10 group-hover:text-pink-300 transition-colors duration-300">There is more 💌</span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

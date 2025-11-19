import { useRef } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  const exploded = useRef(false)

  const handleEnter = () => {
    if (exploded.current) return
    exploded.current = true
    // Quick particle burst imitation
    const btn = document.getElementById('enter-btn')
    if (btn) {
      btn.classList.add('animate-ping-once')
      setTimeout(() => navigate('/shop'), 500)
    } else {
      navigate('/shop')
    }
  }

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/jdTN4VDCXmSY8utE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(180deg,#e2e8f0 0%,#94a3b8 20%,#22d3ee 50%,#a78bfa 80%,#111827 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(168,85,247,0.35)'
            }}
          >
            PECULIAR MASTERPIECE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            className="mt-4 text-lg sm:text-xl text-slate-200/90"
          >
            Wear the Unreal
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex justify-center"
          >
            <button
              id="enter-btn"
              onClick={handleEnter}
              className="pointer-events-auto relative group text-black font-semibold px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 shadow-[0_0_60px_rgba(167,139,250,0.5)] hover:shadow-[0_0_80px_rgba(167,139,250,0.8)] transition-all"
            >
              <span className="relative z-10 mix-blend-hard-light text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">ENTER THE GALLERY</span>
              <span className="absolute inset-0 -z-0 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cyan-400/40 via-fuchsia-500/40 to-violet-500/40" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

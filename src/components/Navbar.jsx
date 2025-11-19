import { useEffect, useState } from 'react'
import { Menu, ShoppingCart, Heart, Music2 } from 'lucide-react'

export default function Navbar({ onCartOpen }) {
  const [countdown, setCountdown] = useState(72 * 60 * 60)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  const h = Math.floor(countdown / 3600)
  const m = Math.floor((countdown % 3600) / 60)
  const s = countdown % 60

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="w-full text-center text-xs tracking-widest text-white/90 bg-gradient-to-r from-indigo-900 via-fuchsia-900 to-black/90 py-2 border-b border-white/10">
        DROP 001 – 72 HOURS ONLY • {String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
      </div>
      <div className="backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between text-white">
          <button className="p-2 hover:bg-white/10 rounded">
            <Menu size={22} />
          </button>
          <div className="font-black tracking-widest">PECULIAR MASTERPIECE</div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded" onClick={() => setMuted(!muted)} aria-label="Toggle music">
              <Music2 size={22} className={muted ? 'opacity-50' : ''} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded">
              <Heart size={22} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded" onClick={onCartOpen}>
              <ShoppingCart size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

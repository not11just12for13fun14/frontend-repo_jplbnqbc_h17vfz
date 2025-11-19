import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductPage({ onAddToCart }) {
  const { slug } = useParams()
  const [p, setP] = useState(null)
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(null)

  useEffect(() => {
    fetch(`${backend}/products/${slug}`).then(r=>r.json()).then((data)=>{ setP(data); setColor(data.colors?.[0] || null); setSize(data.sizes?.[0] || null) })
  }, [slug])

  if (!p) return <div className="min-h-screen bg-black text-white pt-24 px-4">Loading...</div>

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{p.title}</h1>
          <div className="text-white/70 mt-1">${p.price.toFixed(2)}</div>
          <p className="text-white/70 mt-4">{p.description}</p>

          {p.colors?.length > 0 && (
            <div className="mt-6">
              <div className="text-sm text-white/60 mb-2">Color</div>
              <div className="flex gap-2">
                {p.colors.map(c => (
                  <button key={c} onClick={() => setColor(c)} className={`px-3 py-1 rounded border ${color===c? 'border-cyan-400 bg-white/10':'border-white/10'}`}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {p.sizes?.length > 0 && (
            <div className="mt-6">
              <div className="text-sm text-white/60 mb-2">Size</div>
              <div className="flex gap-2">
                {p.sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 rounded border ${size===s? 'border-cyan-400 bg-white/10':'border-white/10'}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <button onClick={() => onAddToCart({ title: p.title, price: p.price, quantity: 1, color, size })} className="px-5 py-3 rounded bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 font-semibold">Add to Cart</button>
            <button className="px-5 py-3 rounded border border-white/20">Wishlist</button>
          </div>

          {p.total_edition && (
            <div className="mt-6 text-sm text-white/70">Only {p.total_edition} pieces ever made</div>
          )}
        </div>
      </div>
    </div>
  )
}

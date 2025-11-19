import { useEffect, useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => { fetch(`${backend}/products`).then(r=>r.json()).then(setProducts) }, [])

  const filtered = products.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl tracking-widest">GALLERY</h1>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" className="bg-white/10 rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="group rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <div className="aspect-square bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20" />
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-white/60">${p.price.toFixed(2)}</div>
                </div>
                <a href={`/product/${p.slug}`} className="text-cyan-300 text-sm">View</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

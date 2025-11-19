import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function HomeSections({ onAddToCart }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${backend}/products`).then(r=>r.json()).then(setProducts).catch(()=>{})
  }, [])

  return (
    <section className="relative z-10 -mt-16 pb-24 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-white/90 text-xl tracking-widest">FEATURED</h2>
          <a href="/shop" className="text-cyan-300 hover:text-cyan-200 text-sm">View all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <motion.div key={p.id} whileHover={{ y: -6 }} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{p.title}</div>
                    <div className="text-white/60 text-sm">${p.price.toFixed(2)}</div>
                  </div>
                  <button onClick={() => onAddToCart({ title: p.title, price: p.price, quantity: 1 })} className="px-3 py-2 rounded bg-white/10 text-white text-sm hover:bg-white/20">Add</button>
                </div>
              </div>
              <a href={`/product/${p.slug}`} className="absolute inset-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

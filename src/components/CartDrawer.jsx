import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function CartDrawer({ open, onClose, items = [] }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const total = items.reduce((acc, it) => acc + it.price * it.quantity, 0)

  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-black/80 text-white border-l border-white/10 backdrop-blur-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="font-semibold tracking-wider">Your Cart</div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded"><X size={18} /></button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
          {items.length === 0 ? (
            <p className="text-white/70">Your cart is empty.</p>
          ) : (
            items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/30 rounded" />
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-white/70">{it.quantity} × ${it.price.toFixed(2)}</div>
                </div>
                <div className="text-white/90 font-semibold">${(it.price * it.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/70">Subtotal</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button className="w-full py-3 rounded bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 font-semibold">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

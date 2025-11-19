import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import HomeSections from './components/HomeSections'
import Shop from './components/Shop'
import ProductPage from './components/ProductPage'

function Home({ onAddToCart, onCartOpen }) {
  return (
    <div className="bg-black min-h-screen">
      <Navbar onCartOpen={onCartOpen} />
      <Hero />
      <HomeSections onAddToCart={onAddToCart} />
    </div>
  )
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [items, setItems] = useState([])
  const location = useLocation()

  useEffect(() => { setCartOpen(false) }, [location])

  const addToCart = (item) => {
    setItems(prev => [...prev, item])
    setCartOpen(true)
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={items} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} onCartOpen={() => setCartOpen(true)} />} />
        <Route path="/shop" element={<><Navbar onCartOpen={() => setCartOpen(true)} /><Shop /></>} />
        <Route path="/product/:slug" element={<><Navbar onCartOpen={() => setCartOpen(true)} /><ProductPage onAddToCart={addToCart} /></>} />
        <Route path="*" element={<div className="pt-24 text-center">Not Found</div>} />
      </Routes>
    </div>
  )
}

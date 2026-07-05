import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis, getLenis } from './lib/lenis'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Reserve from './pages/Reserve'
import Contact from './pages/Contact'

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    initLenis()
  }, [])

  /* Retour en haut + resynchronisation des triggers à chaque changement de page. */
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [pathname])

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/maison" element={<About />} />
        <Route path="/reserver" element={<Reserve />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

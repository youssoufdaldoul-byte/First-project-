import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

/* Initialise Lenis et le raccorde à ScrollTrigger : Lenis pilote le scroll,
   ScrollTrigger lit sa progression via scrollerProxy implicite (scroll natif proxifié). */
export function initLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function getLenis() {
  return lenis
}

export function destroyLenis() {
  if (!lenis) return
  lenis.destroy()
  lenis = null
}

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const FRAME_COUNT = 145
export const frameSrc = (i) =>
  `/sequence/frame_${String(i + 1).padStart(4, '0')}.jpg`

/* Précharge la séquence complète ; onProgress reçoit un ratio 0→1. */
export function preloadFrames(onProgress) {
  const images = new Array(FRAME_COUNT)
  let loaded = 0
  return new Promise((resolve) => {
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.onload = img.onerror = () => {
        loaded += 1
        if (onProgress) onProgress(loaded / FRAME_COUNT)
        if (loaded === FRAME_COUNT) resolve(images)
      }
      img.src = frameSrc(i)
      images[i] = img
    }
  })
}

/* Dessine une frame sur le canvas avec la logique object-fit: cover. */
export function drawCover(ctx, img, cw, ch) {
  if (!img || !img.naturalWidth) return
  const ir = img.naturalWidth / img.naturalHeight
  const cr = cw / ch
  let dw, dh, dx, dy
  if (cr > ir) {
    dw = cw
    dh = cw / ir
    dx = 0
    dy = (ch - dh) / 2
  } else {
    dh = ch
    dw = ch * ir
    dy = 0
    dx = (cw - dw) / 2
  }
  ctx.clearRect(0, 0, cw, ch)
  ctx.drawImage(img, dx, dy, dw, dh)
}

/* Fade/slide-in doux d'éléments à leur entrée dans le viewport. */
export function revealOnScroll(scope) {
  const els = scope.querySelectorAll('.reveal')
  els.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.15,
      ease: 'power3.out',
      delay: parseFloat(el.dataset.delay || 0),
      scrollTrigger: {
        trigger: el,
        start: 'top 86%',
        once: true,
      },
    })
  })
}

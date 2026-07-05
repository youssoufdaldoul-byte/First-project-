import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n/LangContext'
import { FRAME_COUNT, preloadFrames, drawCover } from '../lib/scroll'
import './ScrollHero.css'

gsap.registerPlugin(ScrollTrigger)

/* Le scrub est réservé aux pointeurs fins + viewport large ; sinon fallback statique. */
const canScrub = () =>
  window.matchMedia('(min-width: 768px) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*
  ScrollHero — le cœur du site.
  Un canvas fixe plein écran derrière le contenu ; un spacer de 400vh crée la
  distance de scroll ; ScrollTrigger mappe la progression 0→1 sur l'index de
  frame 0→144 ; chaque update dessine la frame en cover sur le canvas.
  Acte 1 (~0-55%) : burger assemblé, push-in + orbit → textes hero.
  Acte 2 (~55-100%) : séparation verticale → callouts de la section reveal.
*/
export default function ScrollHero() {
  const { t } = useLang()
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const heroTextRef = useRef(null)
  const splitRef = useRef(null)
  const scrollHintRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [scrub, setScrub] = useState(true)

  useEffect(() => {
    const supported = canScrub()
    setScrub(supported)
    if (!supported) {
      setReady(true)
      return
    }

    let disposed = false
    let images = []
    const state = { frame: 0 }
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      draw()
    }

    const draw = () => {
      const img = images[Math.round(state.frame)]
      if (img) drawCover(ctx, img, canvas.width, canvas.height)
    }

    let trigger
    preloadFrames((p) => !disposed && setProgress(p)).then((imgs) => {
      if (disposed) return
      images = imgs
      resize()
      setReady(true)

      trigger = gsap.to(state, {
        frame: FRAME_COUNT - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
        },
        onUpdate: draw,
      })

      /* Textes hero : visibles au départ, s'effacent quand la séparation commence. */
      gsap.to(heroTextRef.current, {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: '38% bottom',
          scrub: true,
        },
      })
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: '12% bottom',
          scrub: true,
        },
      })

      /* Callouts du reveal : apparaissent pendant l'acte 2 (séparation verticale). */
      const items = splitRef.current.querySelectorAll('.scrollhero__callout')
      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 ? 48 : -48 },
          {
            opacity: 1,
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapRef.current,
              start: `${52 + i * 9}% bottom`,
              end: `${64 + i * 9}% bottom`,
              scrub: true,
            },
          },
        )
      })
      gsap.fromTo(
        splitRef.current.querySelector('.scrollhero__splithead'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: '42% bottom',
            end: '55% bottom',
            scrub: true,
          },
        },
      )

      window.addEventListener('resize', resize)
    })

    return () => {
      disposed = true
      window.removeEventListener('resize', resize)
      if (trigger) {
        trigger.scrollTrigger?.kill()
        trigger.kill()
      }
    }
  }, [])

  return (
    <div className="scrollhero" ref={wrapRef}>
      {/* fond fixe : canvas scrub, ou image statique en fallback mobile */}
      <div className="scrollhero__bg" aria-hidden="true">
        {scrub ? (
          <canvas ref={canvasRef} className="scrollhero__canvas" />
        ) : (
          <img
            className="scrollhero__fallback"
            src="/img/hero-burger.jpg"
            srcSet="/img/hero-burger-sm.jpg 800w, /img/hero-burger.jpg 1600w"
            sizes="100vw"
            alt=""
          />
        )}
        <div className="scrollhero__tint" />
      </div>

      {/* loader discret pendant le préchargement des frames */}
      {scrub && !ready && (
        <div className="scrollhero__loader" role="status">
          <span className="scrollhero__loader-label">{t.hero.loading}</span>
          <span className="scrollhero__loader-bar">
            <span style={{ transform: `scaleX(${progress})` }} />
          </span>
        </div>
      )}

      {/* ===== écran 1 : hero ===== */}
      <div className="scrollhero__screen">
        <div className="scrollhero__herotext" ref={heroTextRef}>
          <p className="kicker">{t.hero.kicker}</p>
          <h1 className="scrollhero__title">
            {t.hero.title1}
            <em>{t.hero.title2}</em>
          </h1>
          <p className="scrollhero__sub">{t.hero.sub}</p>
          <a className="btn" href="/reserver">{t.hero.cta}</a>
        </div>
        <div className="scrollhero__hint" ref={scrollHintRef}>
          <span>{t.hero.scroll}</span>
          <i />
        </div>
      </div>

      {/* ===== écrans 2-4 : la révélation (les callouts suivent la séparation) ===== */}
      <div className="scrollhero__split" ref={splitRef}>
        <div className="scrollhero__splithead">
          <p className="kicker">{t.split.kicker}</p>
          <h2 className="h2">{t.split.title}</h2>
        </div>
        <div className="scrollhero__callouts">
          {t.split.callouts.map((c, i) => (
            <div className={`scrollhero__callout ${i % 2 ? 'is-right' : 'is-left'}`} key={c.t}>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

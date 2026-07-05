import { useEffect, useRef } from 'react'
import { revealOnScroll } from '../lib/scroll'
import { useLang } from '../i18n/LangContext'
import ScrollHero from '../components/ScrollHero'
import Story from '../components/Story'
import Catalog from '../components/Catalog'
import Experience from '../components/Experience'
import ReserveCta from '../components/ReserveCta'

export default function Home() {
  const mainRef = useRef(null)
  const { lang } = useLang()

  useEffect(() => {
    revealOnScroll(mainRef.current)
  }, [lang])

  return (
    <main ref={mainRef}>
      <ScrollHero />
      {/* voile de transition : le canvas fixe laisse place au contenu */}
      <div className="home__after">
        <Story />
        <Catalog />
        <Experience />
        <ReserveCta />
      </div>
    </main>
  )
}

import { useEffect, useRef } from 'react'
import { revealOnScroll } from '../lib/scroll'
import { useLang } from '../i18n/LangContext'
import { asset } from '../lib/asset'
import './About.css'

export default function About() {
  const { t, lang } = useLang()
  const ref = useRef(null)

  useEffect(() => {
    revealOnScroll(ref.current)
  }, [lang])

  const blocks = [
    { t: t.about.s1t, p: t.about.s1 },
    { t: t.about.s2t, p: t.about.s2 },
    { t: t.about.s3t, p: t.about.s3 },
  ]

  return (
    <main ref={ref} className="aboutpage">
      <header className="page-head">
        <div className="container">
          <p className="kicker reveal">{t.about.kicker}</p>
          <h1 className="h2 reveal" data-delay="0.08">{t.about.title}</h1>
        </div>
      </header>

      <section className="section">
        <div className="container aboutpage__grid">
          <figure className="aboutpage__media reveal">
            <img
              src={asset('img/ingredients-detail.jpg')}
              srcSet={`${asset('img/ingredients-detail-sm.jpg')} 800w, ${asset('img/ingredients-detail.jpg')} 1600w`}
              sizes="(max-width: 900px) 100vw, 44vw"
              alt="Vue éclatée verticale d’un burger BurgerLab, chaque couche suspendue"
              loading="lazy"
            />
            <figcaption>{t.about.caption}</figcaption>
          </figure>

          <div className="aboutpage__blocks">
            {blocks.map((b, i) => (
              <article className="reveal" data-delay={0.08 * i} key={b.t}>
                <h2>{b.t}</h2>
                <p>{b.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

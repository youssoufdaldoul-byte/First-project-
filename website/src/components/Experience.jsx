import { useLang } from '../i18n/LangContext'
import './Experience.css'

export default function Experience() {
  const { t } = useLang()
  return (
    <section className="section experience" id="experience">
      <div className="container experience__grid">
        <figure className="experience__media reveal">
          <img
            src="/img/lab-burger-cut.jpg"
            srcSet="/img/lab-burger-cut-sm.jpg 800w, /img/lab-burger-cut.jpg 1600w"
            sizes="(max-width: 900px) 100vw, 48vw"
            alt="The Lab Burger tranché, cuisson braise, lumière ambrée"
            loading="lazy"
          />
          <figcaption>{t.experience.caption}</figcaption>
        </figure>
        <div className="experience__text">
          <p className="kicker reveal">{t.experience.kicker}</p>
          <h2 className="h2 reveal" data-delay="0.08">{t.experience.title}</h2>
          <p className="lead reveal" data-delay="0.16">{t.experience.p1}</p>
          <p className="lead reveal" data-delay="0.22">{t.experience.p2}</p>
        </div>
      </div>
    </section>
  )
}

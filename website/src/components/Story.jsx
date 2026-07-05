import { useLang } from '../i18n/LangContext'
import { asset } from '../lib/asset'
import './Story.css'

export default function Story() {
  const { t } = useLang()
  return (
    <section className="section story" id="story">
      <div className="container story__grid">
        <div className="story__text">
          <p className="kicker reveal">{t.story.kicker}</p>
          <h2 className="h2 reveal" data-delay="0.08">{t.story.title}</h2>
          <p className="lead reveal" data-delay="0.16">{t.story.p1}</p>
          <p className="lead reveal" data-delay="0.22">{t.story.p2}</p>
        </div>
        <figure className="story__media reveal" data-delay="0.15">
          <img
            src={asset('img/ingredients-flat.jpg')}
            srcSet={`${asset('img/ingredients-flat-sm.jpg')} 800w, ${asset('img/ingredients-flat.jpg')} 1600w`}
            sizes="(max-width: 900px) 100vw, 46vw"
            alt="Ingrédients choisis de BurgerLab, disposés sur pierre sombre"
            loading="lazy"
          />
          <figcaption>{t.story.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}

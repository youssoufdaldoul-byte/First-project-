import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { asset } from '../lib/asset'
import './Catalog.css'

export default function Catalog() {
  const { t } = useLang()
  return (
    <section className="section catalog" id="catalog">
      <div className="orb" style={{ width: 560, height: 560, top: '4%', left: '-190px' }} />
      <div className="orb" style={{ width: 420, height: 420, bottom: '10%', right: '-140px' }} />
      <div className="orb" style={{ width: 260, height: 260, top: '46%', left: '38%', opacity: 0.6 }} />

      <div className="container">
        <div className="catalog__head">
          <div>
            <p className="kicker reveal">{t.catalog.kicker}</p>
            <h2 className="h2 reveal" data-delay="0.08">{t.catalog.title}</h2>
            <p className="lead reveal" data-delay="0.14">{t.catalog.sub}</p>
          </div>
          <Link to="/menu" className="btn btn--ghost reveal" data-delay="0.2">
            {t.catalog.cta}
          </Link>
        </div>

        <div className="catalog__grid">
          {t.catalog.items.map((item, i) => (
            <article
              className={`catalog__card reveal ${item.flagship ? 'is-flagship' : ''}`}
              data-delay={0.06 * i}
              key={item.name}
            >
              <div className="catalog__imgwrap">
                <img
                  src={asset(`img/${item.img}-sm.jpg`)}
                  srcSet={`${asset(`img/${item.img}-sm.jpg`)} 800w, ${asset(`img/${item.img}.jpg`)} 1600w`}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  alt={item.name}
                  loading="lazy"
                />
              </div>
              <div className="catalog__body">
                {item.flagship && <span className="catalog__tag">{t.catalog.flagshipTag}</span>}
                <div className="catalog__row">
                  <h3>{item.name}</h3>
                  <span className="catalog__price">{item.price}</span>
                </div>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

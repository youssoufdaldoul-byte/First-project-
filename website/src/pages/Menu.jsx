import { useEffect, useRef } from 'react'
import { revealOnScroll } from '../lib/scroll'
import { useLang } from '../i18n/LangContext'
import './Menu.css'

export default function Menu() {
  const { t, lang } = useLang()
  const ref = useRef(null)

  useEffect(() => {
    revealOnScroll(ref.current)
  }, [lang])

  return (
    <main ref={ref} className="menupage">
      <header className="page-head">
        <div className="container">
          <p className="kicker reveal">{t.menu.kicker}</p>
          <h1 className="h2 reveal" data-delay="0.08">{t.menu.title}</h1>
          <p className="lead reveal" data-delay="0.14">{t.menu.sub}</p>
        </div>
      </header>

      <section className="section menupage__groups">
        <div className="container">
          {t.menu.groups.map((group, gi) => (
            <div className={`menupage__group reveal ${gi % 2 ? 'is-alt' : ''}`} key={group.g}>
              <h2>{group.g}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item.n}>
                    <div className="menupage__itemhead">
                      <h3>{item.n}</h3>
                      <span className="menupage__dots" aria-hidden="true" />
                      <span className="menupage__price">{item.p}</span>
                    </div>
                    <p>{item.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { LANGS } from '../i18n/strings'
import './Nav.css'

export default function Nav() {
  const { t, lang, setLang } = useLang()
  const [dense, setDense] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setDense(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = (
    <>
      <NavLink to="/menu" onClick={() => setOpen(false)}>{t.nav.menu}</NavLink>
      <NavLink to="/maison" onClick={() => setOpen(false)}>{t.nav.about}</NavLink>
      <NavLink to="/contact" onClick={() => setOpen(false)}>{t.nav.contact}</NavLink>
    </>
  )

  return (
    <header className={`nav ${dense ? 'is-dense' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner">
        <Link className="nav__logo" to="/" onClick={() => setOpen(false)}>
          BURGER<em>LAB</em>
        </Link>

        <nav className="nav__links">{links}</nav>

        <div className="nav__right">
          <div className="nav__langs" role="group" aria-label="Langue">
            {LANGS.map((l) => (
              <button
                key={l}
                className={l === lang ? 'is-active' : ''}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link className="btn nav__cta" to="/reserver">{t.nav.reserve}</Link>
          <button
            className="nav__burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div className="nav__drawer">
        {links}
        <Link className="btn" to="/reserver" onClick={() => setOpen(false)}>{t.nav.reserve}</Link>
      </div>
    </header>
  )
}

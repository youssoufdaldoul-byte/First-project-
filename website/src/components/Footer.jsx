import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { LANGS } from '../i18n/strings'
import './Footer.css'

export default function Footer() {
  const { t, lang, setLang } = useLang()
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__logo">BURGER<em>LAB</em></p>
          <p className="footer__tagline">{t.footer.tagline}</p>
          <div className="footer__socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">TT</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">X</a>
          </div>
        </div>

        <div className="footer__col">
          <h4>{t.footer.nav}</h4>
          <Link to="/menu">{t.nav.menu}</Link>
          <Link to="/maison">{t.nav.about}</Link>
          <Link to="/reserver">{t.nav.reserve}</Link>
          <Link to="/contact">{t.nav.contact}</Link>
        </div>

        <div className="footer__col">
          <h4>{t.footer.contact}</h4>
          <p>{t.reserve.address[0]}</p>
          <p>{t.reserve.address[1]}</p>
          <a href={`tel:${t.footer.phone.replace(/\s/g, '')}`}>{t.footer.phone}</a>
          <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
        </div>

        <div className="footer__col">
          <h4>FR · EN · IT</h4>
          <div className="footer__langs">
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
        </div>
      </div>
      <div className="container footer__legal">{t.footer.legal}</div>
    </footer>
  )
}

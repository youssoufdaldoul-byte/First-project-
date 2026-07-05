import { useLang } from '../i18n/LangContext'
import './Contact.css'

export default function Contact() {
  const { t } = useLang()
  return (
    <main className="contactpage">
      <header className="page-head">
        <div className="container">
          <p className="kicker">{t.contact.kicker}</p>
          <h1 className="h2">{t.contact.title}</h1>
        </div>
      </header>

      <section className="section">
        <div className="container contactpage__grid">
          <div className="contactpage__map" role="img" aria-label={t.contact.mapNote}>
            <div className="contactpage__pin">
              <i />
              <span>{t.contact.mapNote}</span>
            </div>
          </div>

          <div className="contactpage__info">
            <div>
              <h4>{t.contact.addressTitle}</h4>
              {t.reserve.address.map((a) => <p key={a}>{a}</p>)}
              <p className="contactpage__access">{t.contact.access}</p>
            </div>
            <div>
              <h4>{t.contact.hoursTitle}</h4>
              {t.reserve.hours.map((h) => <p key={h}>{h}</p>)}
            </div>
            <div>
              <h4>{t.contact.contactTitle}</h4>
              <a href={`tel:${t.footer.phone.replace(/\s/g, '')}`}>{t.footer.phone}</a>
              <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

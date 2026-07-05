import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import './Reserve.css'

export default function Reserve() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="reservepage">
      <header className="page-head">
        <div className="container">
          <p className="kicker">{t.reservePage.kicker}</p>
          <h1 className="h2">{t.reservePage.title}</h1>
          <p className="lead">{t.reservePage.p}</p>
        </div>
      </header>

      <section className="section">
        <div className="container reservepage__grid">
          <form className="reservepage__form" onSubmit={submit}>
            <div className="reservepage__row">
              <div className="field">
                <label htmlFor="r-date">{t.reservePage.date}</label>
                <input id="r-date" type="date" required />
              </div>
              <div className="field">
                <label htmlFor="r-time">{t.reservePage.time}</label>
                <input id="r-time" type="time" min="12:00" max="23:00" required />
              </div>
              <div className="field">
                <label htmlFor="r-guests">{t.reservePage.guests}</label>
                <select id="r-guests" defaultValue={t.reservePage.guestsOpt[1]}>
                  {t.reservePage.guestsOpt.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="r-name">{t.reservePage.name}</label>
              <input id="r-name" type="text" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="r-contact">{t.reservePage.contact}</label>
              <input id="r-contact" type="text" autoComplete="email" required />
            </div>

            <button className="btn" type="submit">{t.reservePage.submit}</button>
            {sent && <p className="reservepage__sent" role="status">{t.reservePage.sent}</p>}
            <p className="reservepage__note">{t.reservePage.note}</p>
          </form>

          <aside className="reservepage__aside">
            <div>
              <h4>{t.reserve.hoursTitle}</h4>
              {t.reserve.hours.map((h) => <p key={h}>{h}</p>)}
            </div>
            <div>
              <h4>{t.reserve.addressTitle}</h4>
              {t.reserve.address.map((a) => <p key={a}>{a}</p>)}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

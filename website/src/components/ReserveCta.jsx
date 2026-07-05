import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import './ReserveCta.css'

export default function ReserveCta() {
  const { t } = useLang()
  return (
    <section className="section reservecta" id="reserve">
      <div className="container reservecta__panel reveal">
        <div className="reservecta__main">
          <p className="kicker">{t.reserve.kicker}</p>
          <h2 className="h2">{t.reserve.title}</h2>
          <p className="lead">{t.reserve.p}</p>
          <Link className="btn" to="/reserver">{t.reserve.cta}</Link>
        </div>
        <div className="reservecta__aside">
          <div>
            <h4>{t.reserve.hoursTitle}</h4>
            {t.reserve.hours.map((h) => <p key={h}>{h}</p>)}
          </div>
          <div>
            <h4>{t.reserve.addressTitle}</h4>
            {t.reserve.address.map((a) => <p key={a}>{a}</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}

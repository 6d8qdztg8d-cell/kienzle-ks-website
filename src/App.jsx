import { useState } from 'react'
import ChatBot from './components/ChatBot'
import BookingSection from './components/BookingSection'
import { LanguageProvider, useLanguage } from './LanguageContext'
import { LANGUAGES } from './i18n'

// ─── Language Switcher ───────────────────────────────────────────────────────
function LangSwitcher() {
  const { lang, setLang } = useLanguage()
  return (
    <div className="flex items-center gap-0.5">
      {LANGUAGES.map((l) => (
        <button key={l.code} onClick={() => setLang(l.code)}
          className="px-2 py-1 transition-colors duration-200"
          style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: lang === l.code ? '#E31E24' : 'rgba(17,17,17,0.3)',
            background: 'none', border: 'none', cursor: 'pointer',
          }}>
          {l.label}
        </button>
      ))}
    </div>
  )
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50"
      style={{ background: 'linear-gradient(to bottom, rgba(247,246,242,0.97) 0%, rgba(247,246,242,0) 100%)' }}>
      <div className="flex items-center justify-between px-8 lg:px-14 h-16">
        <img src="/images/logo.png" alt="Kienzle KS" className="h-7 w-auto" />

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: t('nav.services'),    id: 'services' },
            { label: t('nav.tachographs'), id: 'tachographs' },
            { label: t('nav.about'),       id: 'about' },
            { label: t('nav.contact'),     id: 'contact' },
          ].map(({ label, id }) => (
            <button key={id} onClick={() => go(id)}
              className="transition-colors duration-300"
              style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(17,17,17,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = 'rgba(17,17,17,0.4)'}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <LangSwitcher />
          <button onClick={() => go('contact')} className="hidden md:block"
            style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(17,17,17,0.6)', border: '1px solid rgba(17,17,17,0.18)',
              padding: '9px 20px', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#E31E24'; e.currentTarget.style.borderColor = '#E31E24' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(17,17,17,0.6)'; e.currentTarget.style.borderColor = 'rgba(17,17,17,0.18)' }}>
            {t('nav.getQuote')}
          </button>

          <button onClick={() => setOpen(!open)} className="md:hidden"
            style={{ color: 'rgba(17,17,17,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: '#F7F6F2', borderTop: '1px solid rgba(17,17,17,0.08)' }}>
          {[
            { label: t('nav.services'),    id: 'services' },
            { label: t('nav.tachographs'), id: 'tachographs' },
            { label: t('nav.about'),       id: 'about' },
            { label: t('nav.contact'),     id: 'contact' },
          ].map(({ label, id }) => (
            <button key={id} onClick={() => go(id)} className="w-full text-left px-8 py-4"
              style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(17,17,17,0.45)', borderBottom: '1px solid rgba(17,17,17,0.06)', background: 'none', cursor: 'pointer', display: 'block' }}>
              {label}
            </button>
          ))}
          <div className="px-8 py-4"><LangSwitcher /></div>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useLanguage()
  return (
    <section id="home" style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#F7F6F2' }}>
      <img src="/images/truck1.jpg" alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
                 opacity: 0.12, filter: 'saturate(0.15) brightness(0.7)', pointerEvents: 'none', userSelect: 'none' }} />

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, #F7F6F2, transparent)', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 3.5rem 3rem' }}>

        <div style={{ position: 'absolute', top: '5rem', left: '3.5rem' }}>
          <p className="label-red">Kosovo · Seit 2001 · Tachograph Specialists</p>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: 'clamp(4.5rem, 15vw, 18rem)', lineHeight: 0.86, margin: 0 }}>
            <span className="display-outlined" style={{ display: 'block' }}>KIENZLE</span>
            <span style={{ display: 'block', fontSize: '0.6em', color: '#E31E24', fontFamily: 'var(--font-display)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1 }}>KS.</span>
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid rgba(17,17,17,0.1)' }}>
          <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(17,17,17,0.45)', maxWidth: '280px' }}>
            {t('about.bannerTitle')}
          </p>
          <a href="https://wa.me/38348113580" target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(17,17,17,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#E31E24'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(17,17,17,0.4)'}>
            WhatsApp
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Ticker ──────────────────────────────────────────────────────────────────
function Ticker() {
  const items = ['KALIBRIERUNG', 'INSPEKTION', 'ZERTIFIZIERUNG', 'DIAGNOSTIK', 'PRÄZISION', 'SEIT 2001', 'KOSOVO', 'EU CERTIFIED']
  const repeated = [...items, ...items, ...items]
  return (
    <div style={{ background: '#E31E24', padding: '11px 0', overflow: 'hidden' }}>
      <div className="ticker-track" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5rem', padding: '0 1.5rem',
                                  fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>
            {item}<span style={{ opacity: 0.5, fontSize: '6px' }}>●</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services() {
  const { t } = useLanguage()

  const services = [
    { num: '01', titleKey: 'services.s1title', descKey: 'services.s1desc' },
    { num: '02', titleKey: 'services.s2title', descKey: 'services.s2desc' },
    { num: '03', titleKey: 'services.s3title', descKey: 'services.s3desc' },
    { num: '04', titleKey: 'services.s4title', descKey: 'services.s4desc' },
  ]

  return (
    <section id="services" style={{ background: '#F7F6F2', padding: '8rem 0 10rem' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 3.5rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6rem' }}>
          <p className="label">{t('services.label')}</p>
          <p className="label-red">01 — 04</p>
        </div>

        {services.map((s) => (
          <div key={s.num} className="service-row"
            style={{ borderTop: '1px solid rgba(17,17,17,0.1)', padding: '3rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 1.8fr', gap: '3rem', alignItems: 'start' }}>
              <span className="service-num" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(17,17,17,0.25)', paddingTop: '0.6rem', transition: 'color 0.3s' }}>
                {s.num}
              </span>
              <h3 className="service-title" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#111111', margin: 0, transition: 'color 0.3s', fontFamily: 'var(--font-display)' }}>
                {t(s.titleKey)}
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'rgba(17,17,17,0.45)', margin: 0, paddingTop: '0.4rem' }}>
                {t(s.descKey)}
              </p>
            </div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }} />
      </div>
    </section>
  )
}

// ─── Stats ───────────────────────────────────────────────────────────────────
function Stats() {
  const { t } = useLanguage()
  const items = [
    { num: '2001', label: t('stats.established') },
    { num: '20+',  label: t('stats.years') },
    { num: '1K+',  label: t('stats.vehicles') },
    { num: '24h',  label: t('stats.turnaround') },
  ]
  return (
    <div style={{ background: '#EEEDE8', borderTop: '1px solid rgba(17,17,17,0.08)', borderBottom: '1px solid rgba(17,17,17,0.08)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 3.5rem', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {items.map((s, i) => (
          <div key={i} style={{
            padding: '4.5rem 0',
            paddingLeft: i > 0 ? '3rem' : 0,
            borderRight: i < 3 ? '1px solid rgba(17,17,17,0.08)' : 'none',
          }}>
            <p style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5.5rem)', fontWeight: 900, color: '#111111', lineHeight: 1, margin: '0 0 0.6rem', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)' }}>
              {s.num}
            </p>
            <p className="label">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Tachograph Feature ──────────────────────────────────────────────────────
function Feature() {
  const { t } = useLanguage()
  const features = ['showcase.feature1', 'showcase.feature2', 'showcase.feature3', 'showcase.feature4']

  return (
    <section id="tachographs" style={{ background: '#F7F6F2', minHeight: '100vh', display: 'flex' }}>
      <div style={{ flex: '0 0 48%', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/truck2.jpg" alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.5) brightness(0.88)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #F7F6F2 100%)' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 5rem' }}>
        <p className="label-red" style={{ marginBottom: '2rem' }}>{t('showcase.label')}</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.8rem, 4.5vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '-0.03em', color: '#111111', margin: '0 0 2rem' }}>
          {t('showcase.headline')}<br />
          <span style={{ color: '#E31E24' }}>{t('showcase.headlineSub')}</span>
        </h2>
        <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(17,17,17,0.45)', maxWidth: '380px', marginBottom: '3rem' }}>
          {t('showcase.body')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {features.map((fk) => (
            <div key={fk} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#E31E24', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: 'rgba(17,17,17,0.5)', letterSpacing: '0.05em' }}>{t(fk)}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ alignSelf: 'flex-start', padding: '13px 32px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'white', background: '#E31E24', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#ba0013'}
          onMouseLeave={e => e.currentTarget.style.background = '#E31E24'}>
          {t('showcase.cta')}
        </button>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  const { t } = useLanguage()
  return (
    <section id="about" style={{ background: '#111111', position: 'relative', overflow: 'hidden' }}>
      <img src="/images/truck3.jpg" alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.2) brightness(0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.8)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1300px', margin: '0 auto', padding: '10rem 3.5rem' }}>
        <div style={{ maxWidth: '900px', marginBottom: '7rem' }}>
          <p className="label-red" style={{ marginBottom: '2.5rem' }}>{t('about.label')}</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.4rem, 4vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.03em', color: 'white', margin: 0 }}>
            {t('about.headline')}<br />
            <span style={{ color: '#E31E24' }}>{t('about.headlineSub')}</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '5rem' }}>
          <div>
            {['about.p1', 'about.p2', 'about.p3'].map((k) => (
              <p key={k} style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem' }}>{t(k)}</p>
            ))}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ marginTop: '1.5rem', padding: '13px 32px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'white', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#E31E24'; e.currentTarget.style.color = '#E31E24' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'white' }}>
              {t('about.cta')}
            </button>
          </div>

          <div>
            {[
              { year: '2001', key: 'about.tl1' },
              { year: '2010', key: 'about.tl2' },
              { year: '2018', key: 'about.tl3' },
              { year: '2024', key: 'about.tl4' },
            ].map((m, i) => (
              <div key={m.year} style={{ display: 'flex', gap: '2rem', paddingBottom: '2.5rem', opacity: 1 - i * 0.12 }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#E31E24', minWidth: '40px', paddingTop: '2px' }}>{m.year}</span>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>{t(m.key)}</p>
              </div>
            ))}
            <div style={{ borderLeft: '2px solid #E31E24', paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, margin: '0 0 0.75rem' }}>{t('about.quote')}</p>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>— Trupa Inspektuese Kienzle</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)
  const [selectedService, setSelectedService] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" style={{ background: '#F7F6F2', minHeight: '100vh', display: 'flex' }}>

      <div style={{ flex: '0 0 50%', padding: '8rem 4rem 8rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid rgba(17,17,17,0.1)' }}>
        <div>
          <p className="label-red" style={{ marginBottom: '3rem' }}>{t('contact.label')}</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(4rem, 8vw, 10rem)', lineHeight: 0.87, letterSpacing: '-0.03em', margin: '0 0 2.5rem' }}>
            <span className="display-outlined" style={{ display: 'block' }}>{t('contact.headline')}</span>
            <span style={{ display: 'block', color: '#E31E24', fontFamily: 'var(--font-display)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.87 }}>{t('contact.headlineSub')}</span>
          </h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(17,17,17,0.45)', maxWidth: '340px' }}>{t('contact.body')}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <p className="label" style={{ marginBottom: '0.4rem' }}>{t('contact.phone')}</p>
            <a href="tel:+38348113580" style={{ fontSize: '18px', fontWeight: 700, color: '#111111', textDecoration: 'none', letterSpacing: '-0.01em' }}>+383 481 135 80</a>
          </div>
          <div>
            <p className="label" style={{ marginBottom: '0.4rem' }}>{t('contact.location')}</p>
            <p style={{ fontSize: '14px', color: 'rgba(17,17,17,0.55)' }}>Kosovo</p>
          </div>
          <a href="https://wa.me/38348113580" target="_blank" rel="noreferrer"
            style={{ alignSelf: 'flex-start', padding: '13px 28px', marginTop: '0.5rem', fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'white', background: '#25D366', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#1ebe5d'}
            onMouseLeave={e => e.currentTarget.style.background = '#25D366'}>
            {t('contact.whatsapp')}
          </a>
        </div>
      </div>

      <div style={{ flex: 1, padding: '8rem 3.5rem 8rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', border: '2px solid #E31E24', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <svg width="20" height="20" fill="none" stroke="#E31E24" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111111', marginBottom: '0.5rem' }}>{t('contact.sent')}</p>
            <p style={{ fontSize: '13px', color: 'rgba(17,17,17,0.45)' }}>{t('contact.sentBody')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(17,17,17,0.35)', marginBottom: '0.5rem' }}>{t('contact.name')}</label>
                <input type="text" placeholder={t('contact.yourName')} required className="dark-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(17,17,17,0.35)', marginBottom: '0.5rem' }}>{t('contact.email')}</label>
                <input type="email" placeholder={t('contact.email')} required className="dark-input" />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(17,17,17,0.35)', marginBottom: '0.5rem' }}>{t('contact.service')}</label>
              <select value={selectedService} onChange={e => setSelectedService(e.target.value)}
                className="dark-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                <option value="">{t('contact.selectService')}</option>
                <option value="0">{t('services.s1title')}</option>
                <option value="1">{t('services.s2title')}</option>
                <option value="2">{t('services.s3title')}</option>
                <option value="3">{t('services.s4title')}</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(17,17,17,0.35)', marginBottom: '0.5rem' }}>{t('contact.message')}</label>
              <textarea rows={5} placeholder={t('contact.messagePlaceholder')} className="dark-input" />
            </div>
            <button type="submit"
              style={{ padding: '14px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'white', background: '#E31E24', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#ba0013'}
              onMouseLeave={e => e.currentTarget.style.background = '#E31E24'}>
              {t('contact.send')}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#EEEDE8', borderTop: '1px solid rgba(17,17,17,0.1)', padding: '2rem 3.5rem' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="label">© 2001 – {year} Trupa Inspektuese për Tahograf Kienzle</p>
        <p className="label">{t('footer.copy')}</p>
        <a href="https://www.facebook.com/profile.php?id=61555940320523" target="_blank" rel="noreferrer"
          className="label" style={{ textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = '#E31E24'}
          onMouseLeave={e => e.target.style.color = 'rgba(17,17,17,0.35)'}>
          Facebook
        </a>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
function AppInner() {
  return (
    <div style={{ background: '#F7F6F2' }}>
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <Stats />
      <Feature />
      <About />
      <BookingSection />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}

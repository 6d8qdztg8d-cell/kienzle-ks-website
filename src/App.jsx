import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FuturisticHero from './components/FuturisticHero'
import ChatBot from './components/ChatBot'
import BookingSection from './components/BookingSection'
import { LanguageProvider, useLanguage } from './LanguageContext'
import { LANGUAGES } from './i18n'

gsap.registerPlugin(ScrollTrigger)

// ─── Rotating Gear ──────────────────────────────────────────────────────────
function RotatingGear({ size = 64, speed = 12, className = '', reverse = false }) {
  return (
    <motion.svg
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      width={size} height={size} viewBox="0 0 24 24"
      fill="currentColor" className={className}
    >
      <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.47c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
    </motion.svg>
  )
}

// ─── 3D Tilt Card ───────────────────────────────────────────────────────────
function Tilt3D({ children, className = '', intensity = 12 }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 })
  const scaleVal = useSpring(1, { stiffness: 400, damping: 30 })

  const onMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
    scaleVal.set(1.02)
  }, [x, y, scaleVal])

  const onLeave = useCallback(() => {
    x.set(0); y.set(0); scaleVal.set(1)
  }, [x, y, scaleVal])

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, scale: scaleVal, transformStyle: 'preserve-3d', perspective: '1000px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated Count ─────────────────────────────────────────────────────────
function AnimCount({ value, suffix = '' }) {
  const [cur, setCur] = useState(0)
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const n = parseInt(value)
    if (isNaN(n)) { setCur(value); return }
    const t0 = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - t0) / 1500, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setCur(Math.round(e * n))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return <span ref={ref}>{cur}{suffix}</span>
}

// ─── Floating Badge ──────────────────────────────────────────────────────────
function FloatBadge({ children, className = '', delay = 0, style = {} }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ ...style, translateZ: 40 }}
      className={`glass-card rounded-xl px-3 py-2 shadow-lg pointer-events-none select-none ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ─── Language Switcher ──────────────────────────────────────────────────────
function LangSwitcher() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 bg-white/80 backdrop-blur-sm text-xs font-semibold text-[#1d1d1f] hover:border-black/20 hover:shadow-sm transition-all duration-200"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="tracking-wide">{current.label}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3 text-[#a1a1a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-black/8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden z-50 min-w-[148px]"
          >
            {LANGUAGES.map((l, i) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                  i > 0 ? 'border-t border-black/5' : ''
                } ${lang === l.code ? 'text-[#E31E24] bg-[#E31E24]/4' : 'text-[#1d1d1f] hover:bg-black/3'}`}
              >
                <span className="text-base leading-none">{l.flag}</span>
                <span className="flex-1 text-left">{l.name}</span>
                {lang === l.code && (
                  <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}
                    className="w-3.5 h-3.5 text-[#E31E24] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const links = [
    { labelKey: 'nav.services',    id: 'services' },
    { labelKey: 'nav.tachographs', id: 'tachographs' },
    { labelKey: 'nav.about',       id: 'about' },
    { labelKey: 'nav.booking',     id: 'booking' },
    { labelKey: 'nav.contact',     id: 'contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 w-full z-50 transition-all duration-400 ${scrolled ? 'glass-nav' : 'bg-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Kienzle KS" className="h-8 w-auto" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ labelKey, id }) => (
            <button key={id} onClick={() => go(id)}
              className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-200 font-medium">
              {t(labelKey)}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher />
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => go('contact')}
            className="flex items-center gap-2 px-5 py-2 bg-[#E31E24] text-white text-sm font-semibold rounded-full shadow-sm hover:bg-[#ba0013] transition-colors duration-200"
          >
            {t('nav.getQuote')}
          </motion.button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#1d1d1f]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-black/5"
          >
            {links.map(({ labelKey, id }) => (
              <button key={id} onClick={() => go(id)}
                className="w-full text-left px-6 py-4 text-sm text-[#6e6e73] hover:text-[#1d1d1f] border-b border-black/4 transition-colors">
                {t(labelKey)}
              </button>
            ))}
            <div className="px-6 py-3">
              <LangSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() { return <FuturisticHero /> }

// ─── Stats ───────────────────────────────────────────────────────────────────
function Stats() {
  const { t } = useLanguage()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const items = [
    { value: '2001', labelKey: 'stats.established', iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { value: '20', suffix: '+', labelKey: 'stats.years', iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { value: '1000', suffix: '+', labelKey: 'stats.vehicles', iconPath: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' },
    { value: '24', suffix: 'h', labelKey: 'stats.turnaround', iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ]

  return (
    <section ref={ref} className="py-12 bg-white/60 backdrop-blur-sm border-y border-black/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((s, i) => (
          <motion.div key={s.labelKey}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center md:text-left group cursor-default">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
              <motion.svg
                whileInView={{ rotate: [0, 360] }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="w-4 h-4 text-[#E31E24] shrink-0"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={s.iconPath} />
              </motion.svg>
              <p className="font-display font-black text-3xl text-[#E31E24]">
                <AnimCount value={s.value} suffix={s.suffix || ''} />
              </p>
            </div>
            <p className="text-xs text-[#a1a1a6] tracking-wide">{t(s.labelKey)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services() {
  const { t, setSelectedService } = useLanguage()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  const serviceIcons = [
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  ]

  const cards = [
    { titleKey: 'services.s1title', subKey: 'services.s1sub', descKey: 'services.s1desc' },
    { titleKey: 'services.s2title', subKey: 'services.s2sub', descKey: 'services.s2desc' },
    { titleKey: 'services.s3title', subKey: 'services.s3sub', descKey: 'services.s3desc' },
    { titleKey: 'services.s4title', subKey: 'services.s4sub', descKey: 'services.s4desc' },
  ]

  return (
    <section ref={ref} className="py-28 bg-[#f5f5f7]" id="services">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-14">
          <p className="text-xs font-semibold text-[#E31E24] uppercase tracking-widest mb-3">{t('services.label')}</p>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1d1d1f] leading-tight max-w-xl">
            {t('services.headline')}<br />
            <span className="text-red-gradient">{t('services.headlineSub')}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Left: real modern photo + active service overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 relative rounded-3xl overflow-hidden min-h-[480px]"
          >
            <img
              src="/images/truck1.jpg"
              alt="Kienzle KS technicians at work"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <RotatingGear size={160} speed={14} className="absolute -top-8 -right-8 text-white/5" />
            <RotatingGear size={80} speed={8} reverse className="absolute bottom-24 right-8 text-[#E31E24]/20" />

            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <span className="inline-block text-xs font-semibold text-white bg-[#E31E24] px-3 py-1 rounded-full mb-4 self-start">
                {String(active + 1).padStart(2, '0')} {t('services.counter')}
              </span>
              <AnimatePresence mode="wait">
                <motion.div key={`${active}-${t('services.s1title')}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">{t(cards[active].titleKey)}</h3>
                  <p className="text-xs text-white/50 uppercase tracking-widest mb-3">{t(cards[active].subKey)}</p>
                  <p className="text-white/70 text-sm leading-relaxed max-w-sm">{t(cards[active].descKey)}</p>
                </motion.div>
              </AnimatePresence>
              <button
                onClick={() => {
                  setSelectedService(active)
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-6 inline-flex items-center gap-2 text-white text-sm font-semibold group self-start"
              >
                {t('services.bookCta')}
                <motion.svg
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </button>
            </div>
          </motion.div>

          {/* Right: Interactive service selector */}
          <div className="md:col-span-5 flex flex-col gap-3 justify-center">
            {cards.map((c, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full text-left rounded-2xl p-5 transition-all duration-300 flex items-center gap-4 ${
                  active === i
                    ? 'bg-[#E31E24] shadow-[0_8px_30px_rgba(227,30,36,0.35)]'
                    : 'glass-card hover:shadow-md'
                }`}
              >
                <motion.div
                  animate={{ rotate: active === i ? 360 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    active === i ? 'bg-white/20 text-white' : 'bg-[#E31E24]/10 text-[#E31E24]'
                  }`}
                >
                  {serviceIcons[i]}
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className={`font-bold text-sm ${active === i ? 'text-white' : 'text-[#1d1d1f]'}`}>{t(c.titleKey)}</p>
                  <p className={`text-[10px] uppercase tracking-wider mt-0.5 ${active === i ? 'text-white/60' : 'text-[#a1a1a6]'}`}>{t(c.subKey)}</p>
                </div>
                <motion.svg
                  animate={{ opacity: active === i ? 1 : 0, x: active === i ? 0 : -6 }}
                  transition={{ duration: 0.25 }}
                  className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Showcase / Tachographs ──────────────────────────────────────────────────
function Showcase() {
  const { t } = useLanguage()
  const ref = useRef()
  const inView = useInView(ref, { once: false, margin: '-80px' })

  const featureKeys = ['showcase.feature1', 'showcase.feature2', 'showcase.feature3', 'showcase.feature4']

  return (
    <section ref={ref} className="py-28 bg-white" id="tachographs">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9 }}
        >
          <Tilt3D className="relative" intensity={10}>
            <div className="relative h-[460px] rounded-3xl overflow-hidden glass-card">
              <img
                src="/images/truck2.jpg"
                alt="Modern truck cab interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Spinning precision rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 460"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                >
                  <circle cx="200" cy="230" r="185" fill="none" stroke="#E31E24"
                    strokeWidth="1" strokeDasharray="6 12" strokeOpacity="0.25" />
                </motion.svg>
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 460"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  <circle cx="200" cy="230" r="170" fill="none" stroke="#E31E24"
                    strokeWidth="0.5" strokeDasharray="3 20" strokeOpacity="0.15" />
                </motion.svg>
              </div>

              {/* Scan line */}
              <motion.div
                animate={{ y: [-4, 464] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'linear', repeatDelay: 3 }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31E24]/70 to-transparent z-10 pointer-events-none"
              />

              {['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r',
                'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 ${cls} border-[#E31E24]/60 pointer-events-none`} />
              ))}

              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] text-white/60 uppercase tracking-widest font-semibold">
                  {t('showcase.badge')}
                </span>
              </div>
            </div>

            {/* Floating badges */}
            <FloatBadge delay={0} className="absolute -top-4 -right-4" style={{ translateZ: '40px' }}>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-[#E31E24]/10 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#E31E24]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#E31E24] leading-none">EU Certified</p>
                  <p className="text-[9px] text-[#6e6e73]">Standard</p>
                </div>
              </div>
            </FloatBadge>

            <FloatBadge delay={0.8} className="absolute top-1/3 -left-6" style={{ translateZ: '40px' }}>
              <div className="flex items-center gap-1.5">
                <RotatingGear size={16} speed={4} className="text-[#E31E24]" />
                <div>
                  <p className="text-[10px] font-bold text-[#1d1d1f] leading-none">± 0.1%</p>
                  <p className="text-[9px] text-[#6e6e73]">Accuracy</p>
                </div>
              </div>
            </FloatBadge>

            <FloatBadge delay={1.6} className="absolute -bottom-4 right-8" style={{ translateZ: '40px' }}>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] font-bold text-[#1d1d1f]">Since <span className="text-[#E31E24]">2001</span></p>
              </div>
            </FloatBadge>
          </Tilt3D>
        </motion.div>

        {/* Text */}
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold text-[#E31E24] uppercase tracking-widest mb-4">
            {t('showcase.label')}
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl text-[#1d1d1f] leading-tight mb-5">
            {t('showcase.headline')}<br />
            <span className="text-red-gradient">{t('showcase.headlineSub')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6e6e73] text-sm leading-relaxed mb-8">
            {t('showcase.body')}
          </motion.p>

          <div className="space-y-3 mb-10">
            {featureKeys.map((fk, i) => (
              <motion.div key={fk}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 cursor-default group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.4 }}
                  className="w-5 h-5 rounded-full bg-[#E31E24]/10 flex items-center justify-center shrink-0 group-hover:bg-[#E31E24] transition-colors duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E31E24] group-hover:bg-white transition-colors duration-300" />
                </motion.div>
                <span className="text-sm text-[#1d1d1f]">{t(fk)}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(227,30,36,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 bg-[#E31E24] text-white text-sm font-semibold rounded-full shadow-sm hover:bg-[#ba0013] transition-all duration-200">
            {t('showcase.cta')}
          </motion.button>
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  const { t } = useLanguage()
  const ref = useRef()
  const gsapRef = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!gsapRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(gsapRef.current.querySelectorAll('.line'),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gsapRef.current, start: 'top 78%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const timeline = [
    { year: '2001', textKey: 'about.tl1' },
    { year: '2010', textKey: 'about.tl2' },
    { year: '2018', textKey: 'about.tl3' },
    { year: '2024', textKey: 'about.tl4' },
  ]

  return (
    <section ref={ref} className="py-28 bg-[#f5f5f7]" id="about">
      {/* Banner — real analog tachograph instruments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 lg:px-12 mb-20"
      >
        <Tilt3D intensity={5} className="w-full">
          <div className="relative h-[300px] md:h-[380px] rounded-3xl overflow-hidden">
            <img
              src="/images/truck3.jpg"
              alt="Kienzle KS professional inspection center"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <RotatingGear size={200} speed={20} className="absolute -bottom-12 -right-12 text-white/5" />
            <RotatingGear size={80} speed={10} reverse className="absolute top-8 right-16 text-[#E31E24]/15" />
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear', repeatDelay: 2 }}
              className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-[#E31E24]/15 to-transparent pointer-events-none"
            />
            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-1">{t('about.bannerLabel')}</p>
                <p className="text-2xl font-display font-bold text-white">{t('about.bannerTitle')}</p>
              </div>
              <FloatBadge delay={0.5} className="hidden md:flex">
                <div className="flex items-center gap-2">
                  <RotatingGear size={14} speed={5} className="text-[#E31E24]" />
                  <span className="text-xs font-bold text-[#1d1d1f]">
                    {t('about.specialistsBadge')}<br /><span className="text-[#E31E24]">{t('about.specialists')}</span>
                  </span>
                </div>
              </FloatBadge>
            </div>
          </div>
        </Tilt3D>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-20 items-start">
        <div ref={gsapRef}>
          <div className="line">
            <p className="text-xs font-semibold text-[#E31E24] uppercase tracking-widest mb-4">{t('about.label')}</p>
          </div>
          <div className="line">
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#1d1d1f] leading-tight mb-7">
              {t('about.headline')}<br />
              <span className="text-red-gradient">{t('about.headlineSub')}</span>
            </h2>
          </div>
          {['about.p1', 'about.p2', 'about.p3'].map((key) => (
            <div key={key} className="line">
              <p className="text-[#6e6e73] text-sm leading-relaxed mb-4">{t(key)}</p>
            </div>
          ))}
          <div className="line mt-6">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(227,30,36,0.25)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3 bg-[#E31E24] text-white text-sm font-semibold rounded-full hover:bg-[#ba0013] transition-all duration-200 inline-flex items-center gap-2">
              {t('about.cta')}
              <motion.svg
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="relative pl-8">
            <motion.div
              initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              style={{ originY: 0 }}
              className="absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-[#E31E24]/60 to-transparent"
            />
            <div className="space-y-10">
              {timeline.map((m, i) => (
                <motion.div key={m.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                  whileHover={{ x: 4 }}
                  className="relative cursor-default group">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -left-8 top-1.5 w-5 h-5 rounded-full border-2 border-[#E31E24]/50 bg-[#f5f5f7] flex items-center justify-center group-hover:border-[#E31E24] transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-[#E31E24]" />
                  </motion.div>
                  <p className="text-xs font-bold text-[#E31E24] uppercase tracking-widest mb-1">{m.year}</p>
                  <p className="text-sm text-[#1d1d1f]">{t(m.textKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-14 glass-card rounded-2xl p-7 border-l-4 border-[#E31E24]">
            <p className="text-[#6e6e73] text-sm italic leading-relaxed mb-3">
              {t('about.quote')}
            </p>
            <p className="text-xs text-[#a1a1a6] font-semibold uppercase tracking-wide">
              — Trupa Inspektuese Kienzle
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const { t, selectedService, setSelectedService } = useLanguage()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const info = [
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
      labelKey: 'contact.phone', value: '+383 481 135 80',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      labelKey: 'contact.location', value: 'Kosovo',
    },
  ]

  return (
    <section ref={ref} className="py-28 bg-white" id="contact">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold text-[#E31E24] uppercase tracking-widest mb-4">
            {t('contact.label')}
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl text-[#1d1d1f] leading-tight mb-5">
            {t('contact.headline')}<br />
            <span className="text-red-gradient">{t('contact.headlineSub')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6e6e73] text-sm leading-relaxed mb-10">
            {t('contact.body')}
          </motion.p>

          <div className="space-y-5 mb-10">
            {info.map((item, i) => (
              <motion.div key={item.labelKey}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 glass-card rounded-2xl px-5 py-4 cursor-default">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 bg-[#E31E24]/8 rounded-xl flex items-center justify-center text-[#E31E24] shrink-0">
                  {item.icon}
                </motion.div>
                <div>
                  <p className="text-[10px] text-[#a1a1a6] uppercase tracking-wider mb-0.5">{t(item.labelKey)}</p>
                  <p className="text-sm font-semibold text-[#1d1d1f]">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="https://wa.me/38348113580"
            target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-7 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-full hover:bg-[#1ebe5d] transition-all duration-200">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {t('contact.whatsapp')}
          </motion.a>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="glass-card rounded-3xl p-8 md:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok"
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-16">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full bg-[#E31E24]/10 flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="font-display font-bold text-xl text-[#1d1d1f] mb-2">{t('contact.sent')}</h3>
                <p className="text-[#6e6e73] text-sm">{t('contact.sentBody')}</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" exit={{ opacity: 0 }}>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { lk: 'contact.name',  pk: 'contact.yourName', t: 'text' },
                    { lk: 'contact.email', pk: 'contact.email',     t: 'email' },
                  ].map(f => (
                    <div key={f.lk}>
                      <label className="block text-xs font-semibold text-[#6e6e73] mb-2">{t(f.lk)}</label>
                      <input type={f.t} placeholder={t(f.pk)} required
                        className="w-full bg-[#f5f5f7] border border-black/8 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-[#a1a1a6] focus:outline-none focus:border-[#E31E24]/50 focus:ring-2 focus:ring-[#E31E24]/10 transition-all" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6e6e73] mb-2">{t('contact.service')}</label>
                  <div className="relative">
                    <select
                      value={selectedService !== null ? String(selectedService) : ''}
                      onChange={e => setSelectedService(e.target.value === '' ? null : Number(e.target.value))}
                      className={`w-full bg-[#f5f5f7] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E31E24]/10 transition-all appearance-none pr-10 ${
                        selectedService !== null
                          ? 'border-[#E31E24]/40 text-[#1d1d1f] bg-[#E31E24]/3'
                          : 'border-black/8 text-[#a1a1a6]'
                      }`}
                    >
                      <option value="">{t('contact.selectService')}</option>
                      <option value="0">{t('services.s1title')}</option>
                      <option value="1">{t('services.s2title')}</option>
                      <option value="2">{t('services.s3title')}</option>
                      <option value="3">{t('services.s4title')}</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-[#a1a1a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6e6e73] mb-2">{t('contact.message')}</label>
                  <textarea rows={4} placeholder={t('contact.messagePlaceholder')}
                    className="w-full bg-[#f5f5f7] border border-black/8 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-[#a1a1a6] focus:outline-none focus:border-[#E31E24]/50 focus:ring-2 focus:ring-[#E31E24]/10 transition-all resize-none" />
                </div>
                <motion.button type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(227,30,36,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 bg-[#E31E24] text-white text-sm font-semibold rounded-xl hover:bg-[#ba0013] transition-all duration-200">
                  {t('contact.send')}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const { t } = useLanguage()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-[#f5f5f7] relative overflow-hidden">
      <RotatingGear size={300} speed={25} className="absolute -left-20 top-1/2 -translate-y-1/2 text-[#E31E24]/5" />
      <RotatingGear size={200} speed={18} reverse className="absolute -right-16 bottom-0 text-[#E31E24]/5" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] blob-red opacity-60 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 glass-card px-5 py-2.5 rounded-full mb-8">
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#E31E24]"
          />
          <span className="text-xs font-semibold text-[#6e6e73]">{t('cta.badge')}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-5xl md:text-6xl text-[#1d1d1f] leading-tight mb-6">
          {t('cta.headline')}<br />
          <span className="text-red-gradient">{t('cta.headlineSub')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#6e6e73] text-base leading-relaxed mb-10 max-w-md mx-auto">
          {t('cta.body')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4">
          <motion.a href="https://wa.me/38348113580" target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(227,30,36,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-3.5 bg-[#E31E24] text-white text-sm font-bold rounded-full hover:bg-[#ba0013] transition-all duration-200">
            {t('cta.primary')}
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-9 py-3.5 glass-card text-[#1d1d1f] text-sm font-semibold rounded-full hover:shadow-md transition-all duration-200">
            {t('cta.secondary')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-black/5 pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <img src="/images/logo.png" alt="Kienzle KS" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-[#6e6e73] leading-relaxed mb-4 max-w-xs">{t('footer.tagline')}</p>
            <a href="https://wa.me/38348113580" target="_blank" rel="noreferrer"
              className="text-sm font-semibold text-[#E31E24] hover:text-[#ba0013] transition-colors">
              +383 481 135 80
            </a>
          </div>
          <div>
            <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider mb-5">{t('footer.servicesLabel')}</p>
            <ul className="space-y-2.5">
              {['footer.s1', 'footer.s2', 'footer.s3', 'footer.s4'].map(k => (
                <li key={k} className="text-sm text-[#6e6e73] hover:text-[#E31E24] transition-colors cursor-pointer">{t(k)}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider mb-5">{t('footer.companyLabel')}</p>
            <ul className="space-y-2.5">
              {['footer.c1', 'footer.c2', 'footer.c3'].map(k => (
                <li key={k} className="text-sm text-[#6e6e73] hover:text-[#E31E24] transition-colors cursor-pointer">{t(k)}</li>
              ))}
              <li>
                <a href="https://www.facebook.com/profile.php?id=61555940320523" target="_blank" rel="noreferrer"
                  className="text-sm text-[#6e6e73] hover:text-[#E31E24] transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-px bg-black/6 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#a1a1a6]">
            © 2001 – {year} Trupa Inspektuese për Tahograf Kienzle. All rights reserved.
          </p>
          <p className="text-xs text-[#a1a1a6] flex items-center gap-1.5">
            <RotatingGear size={10} speed={8} className="text-[#E31E24]" />
            {t('footer.copy')}
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────
function AppInner() {
  return (
    <div className="bg-[#f5f5f7]">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Showcase />
      <About />
      <BookingSection />
      <Contact />
      <FinalCTA />
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

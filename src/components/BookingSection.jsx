import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

const TIME_SLOTS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']

const SERVICE_ICONS = [
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
]


// ─── Mini Calendar ───────────────────────────────────────────────────────────
function MiniCalendar({ selected, onChange, t }) {
  const today = new Date(); today.setHours(0,0,0,0)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [dir, setDir] = useState(1)

  const dayNames   = t('booking.days').split(',')
  const monthNames = t('booking.months').split(',')

  const prevMonth = () => {
    setDir(-1)
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1) } else setViewMonth(m => m-1)
  }
  const nextMonth = () => {
    setDir(1)
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y+1) } else setViewMonth(m => m+1)
  }

  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate()
  const startOffset = (new Date(viewYear, viewMonth, 1).getDay()+6)%7
  const cells = []
  for (let i=0; i<startOffset; i++) cells.push(null)
  for (let d=1; d<=daysInMonth; d++) cells.push(d)
  while (cells.length%7!==0) cells.push(null)

  const isSel = d => selected && selected.getDate()===d && selected.getMonth()===viewMonth && selected.getFullYear()===viewYear
  const isTod = d => new Date(viewYear,viewMonth,d).getTime()===today.getTime()
  const isDisabled = d => { if(!d) return true; const dt=new Date(viewYear,viewMonth,d); return dt<today||dt.getDay()===0 }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <motion.button type="button" onClick={prevMonth} whileTap={{scale:0.88}}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[#6e6e73] hover:bg-[#f5f5f7] transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </motion.button>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.span key={`${viewYear}-${viewMonth}`} custom={dir}
            initial={{opacity:0,x:dir*18}} animate={{opacity:1,x:0}} exit={{opacity:0,x:dir*-18}} transition={{duration:0.18}}
            className="font-display font-bold text-sm text-[#1d1d1f] select-none">
            {monthNames[viewMonth]} {viewYear}
          </motion.span>
        </AnimatePresence>
        <motion.button type="button" onClick={nextMonth} whileTap={{scale:0.88}}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[#6e6e73] hover:bg-[#f5f5f7] transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </motion.button>
      </div>
      <div className="grid grid-cols-7 mb-1.5">
        {dayNames.map(d => <div key={d} className="text-center text-[10px] font-bold text-[#a1a1a6] uppercase tracking-wide py-1">{d}</div>)}
      </div>
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={`${viewYear}-${viewMonth}-grid`} custom={dir}
          initial={{opacity:0,x:dir*28}} animate={{opacity:1,x:0}} exit={{opacity:0,x:dir*-28}} transition={{duration:0.18}}
          className="grid grid-cols-7 gap-y-1">
          {cells.map((day,i) => {
            if(!day) return <div key={`e${i}`}/>
            const dis=isDisabled(day), sel=isSel(day), tod=isTod(day)
            return (
              <motion.button key={day} type="button" disabled={dis}
                onClick={()=>!dis&&onChange(new Date(viewYear,viewMonth,day))}
                whileTap={!dis?{scale:0.85}:{}}
                className={`mx-auto w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  sel ? 'bg-[#E31E24] text-white shadow-[0_4px_14px_rgba(227,30,36,0.38)]'
                  : tod ? 'border-2 border-[#E31E24] text-[#E31E24]'
                  : dis ? 'text-black/15 cursor-not-allowed'
                  : 'text-[#1d1d1f] hover:bg-[#E31E24]/8 hover:text-[#E31E24] cursor-pointer'
                }`}>{day}</motion.button>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Main Section ────────────────────────────────────────────────────────────
export default function BookingSection() {
  const { t } = useLanguage()
  const ref   = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate,    setSelectedDate]    = useState(null)
  const [selectedTime,    setSelectedTime]    = useState(null)
  const [name,  setName]  = useState('')
  const [phone, setPhone] = useState('')
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState(null)

  const serviceKeys = [
    { titleKey: 'services.s1title' },
    { titleKey: 'services.s2title' },
    { titleKey: 'services.s3title' },
    { titleKey: 'services.s4title' },
  ]

  const formatDate = useCallback((date) => {
    if (!date) return ''
    const months = t('booking.months').split(',')
    const days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']
    return `${days[date.getDay()]}, ${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`
  }, [t])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedService === null) { setError('Bitte Dienstleistung wählen'); return }
    if (!selectedDate) { setError(t('booking.noDate')); return }
    if (!selectedTime) { setError(t('booking.noTime')); return }
    if (!name.trim())  { setError(t('booking.noName')); return }
    if (!phone.trim()) { setError(t('booking.noPhone')); return }
    setError(null)
    setSending(true)

    const serviceLabel = t(serviceKeys[selectedService].titleKey)
    const dateStr      = formatDate(selectedDate)

    try {
      const res  = await fetch('/api/book', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: serviceLabel,
          date:    dateStr,
          time:    selectedTime,
          name,
          phone,
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || 'Unbekannter Fehler')
      setSent(true)
      setSelectedService(null); setSelectedDate(null); setSelectedTime(null); setName(''); setPhone('')
    } catch (err) {
      console.error('Buchungsfehler:', err)
      setError(err.message || t('booking.errorSend'))
    } finally {
      setSending(false)
    }
  }

  return (
    <section ref={ref} className="py-28 bg-[#f5f5f7] relative overflow-hidden" id="booking">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.04]"
          style={{background:'radial-gradient(ellipse at center,#E31E24 0%,transparent 70%)'}}/>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7}} className="mb-14">
          <p className="text-xs font-semibold text-[#E31E24] uppercase tracking-widest mb-3">{t('booking.label')}</p>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#1d1d1f] leading-tight">
            {t('booking.headline')}{' '}
            <span style={{background:'linear-gradient(135deg,#E31E24,#ff4444)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
              {t('booking.headlineSub')}
            </span>
          </h2>
          <p className="mt-4 text-[#6e6e73] text-sm leading-relaxed max-w-lg">{t('booking.body')}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="sent" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
              className="max-w-md mx-auto text-center py-20">
              <motion.div animate={{rotate:[0,360]}} transition={{duration:0.7}}
                className="w-20 h-20 rounded-full bg-[#E31E24]/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-9 h-9 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
              </motion.div>
              <h3 className="font-display font-black text-2xl text-[#1d1d1f] mb-3">{t('booking.sent')}</h3>
              <p className="text-[#6e6e73] text-sm leading-relaxed mb-8">{t('booking.sentBody')}</p>
              <motion.button onClick={()=>setSent(false)} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                className="px-8 py-3 bg-[#E31E24] text-white text-sm font-semibold rounded-full hover:bg-[#ba0013] transition-colors">
                Weiteren Termin buchen
              </motion.button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit}
              initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8,delay:0.15}}>
              <div className="grid lg:grid-cols-12 gap-6">

                {/* Service selector */}
                <motion.div initial={{opacity:0,y:-16}} animate={inView?{opacity:1,y:0}:{}}
                  transition={{duration:0.6,delay:0.15}} className="lg:col-span-12">
                  <div className="bg-white/72 backdrop-blur-xl border border-white/80 rounded-3xl p-6" style={{boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
                    <p className="text-[10px] font-bold text-[#a1a1a6] uppercase tracking-widest mb-4">
                      Dienstleistung wählen
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {serviceKeys.map((s,i) => {
                        const active = selectedService === i
                        return (
                          <motion.button key={i} type="button" onClick={()=>setSelectedService(i)} whileTap={{scale:0.95}}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-200 ${
                              active ? 'bg-[#E31E24] shadow-[0_6px_20px_rgba(227,30,36,0.3)]' : 'bg-[#f5f5f7] hover:bg-[#E31E24]/8'
                            }`}>
                            <motion.div animate={{rotate:active?360:0}} transition={{duration:0.45}}
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${active?'bg-white/20 text-white':'bg-[#E31E24]/10 text-[#E31E24]'}`}>
                              {SERVICE_ICONS[i]}
                            </motion.div>
                            <p className={`text-xs font-bold leading-tight truncate ${active?'text-white':'text-[#1d1d1f]'}`}>
                              {t(s.titleKey)}
                            </p>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Calendar */}
                <motion.div initial={{opacity:0,x:-24}} animate={inView?{opacity:1,x:0}:{}}
                  transition={{duration:0.7,delay:0.2}} className="lg:col-span-5">
                  <div className="bg-white/72 backdrop-blur-xl border border-white/80 rounded-3xl p-6 h-full" style={{boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
                    <p className="text-[10px] font-bold text-[#a1a1a6] uppercase tracking-widest mb-5">{t('booking.selectDate')}</p>
                    <MiniCalendar selected={selectedDate} onChange={setSelectedDate} t={t}/>
                    <AnimatePresence>
                      {selectedDate && (
                        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} transition={{duration:0.2}}
                          className="mt-5 px-4 py-3 bg-[#E31E24]/6 border border-[#E31E24]/20 rounded-2xl flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#E31E24]/10 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                          </div>
                          <p className="text-sm font-semibold text-[#1d1d1f]">{formatDate(selectedDate)}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Time + fields */}
                <motion.div initial={{opacity:0,x:24}} animate={inView?{opacity:1,x:0}:{}}
                  transition={{duration:0.7,delay:0.3}} className="lg:col-span-7 flex flex-col gap-5">

                  {/* Time slots */}
                  <div className="bg-white/72 backdrop-blur-xl border border-white/80 rounded-3xl p-6" style={{boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
                    <p className="text-[10px] font-bold text-[#a1a1a6] uppercase tracking-widest mb-5">{t('booking.selectTime')}</p>
                    <div className="grid grid-cols-5 gap-2">
                      {TIME_SLOTS.map(slot => (
                        <motion.button key={slot} type="button" onClick={()=>setSelectedTime(slot)} whileTap={{scale:0.9}}
                          className={`py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-150 ${
                            selectedTime===slot
                              ? 'bg-[#E31E24] text-white shadow-[0_4px_12px_rgba(227,30,36,0.35)]'
                              : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#E31E24]/10 hover:text-[#E31E24]'
                          }`}>{slot}</motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Name + phone */}
                  <div className="bg-white/72 backdrop-blur-xl border border-white/80 rounded-3xl p-6" style={{boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
                    <div className="grid md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <label className="block text-[10px] font-bold text-[#6e6e73] uppercase tracking-widest mb-2">{t('booking.yourName')}</label>
                        <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder={t('booking.namePh')}
                          className="w-full bg-[#f5f5f7] border border-black/8 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-[#a1a1a6] focus:outline-none focus:border-[#E31E24]/50 focus:ring-2 focus:ring-[#E31E24]/10 transition-all"/>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#6e6e73] uppercase tracking-widest mb-2">{t('booking.yourPhone')}</label>
                        <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder={t('booking.phonePh')}
                          className="w-full bg-[#f5f5f7] border border-black/8 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-[#a1a1a6] focus:outline-none focus:border-[#E31E24]/50 focus:ring-2 focus:ring-[#E31E24]/10 transition-all"/>
                      </div>
                    </div>
                    <AnimatePresence>
                      {error && (
                        <motion.p initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.2}}
                          className="mb-4 text-xs text-[#E31E24] font-semibold">⚠ {error}</motion.p>
                      )}
                    </AnimatePresence>
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                      {(selectedDate||selectedTime) && (
                        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
                          className="flex-1 px-4 py-2.5 bg-[#f5f5f7] rounded-xl text-xs font-semibold text-[#6e6e73] flex items-center gap-2 min-w-0">
                          <svg className="w-3.5 h-3.5 text-[#E31E24] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          <span className="truncate">
                            {selectedDate ? `${selectedDate.getDate()}.${String(selectedDate.getMonth()+1).padStart(2,'0')}.${selectedDate.getFullYear()}` : '—'}
                            {selectedTime ? ` · ${selectedTime} Uhr` : ''}
                          </span>
                        </motion.div>
                      )}
                      <motion.button type="submit" disabled={sending}
                        whileHover={!sending?{scale:1.02}:{}} whileTap={!sending?{scale:0.97}:{}}
                        className="flex-shrink-0 flex items-center justify-center gap-2 px-7 py-3.5 bg-[#E31E24] text-white text-sm font-bold rounded-xl hover:bg-[#ba0013] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                        style={{boxShadow:'0 4px 16px rgba(227,30,36,0.28)'}}>
                        {sending ? (
                          <>
                            <motion.div animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:'linear'}}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"/>
                            Wird gesendet…
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            {t('booking.book')}
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

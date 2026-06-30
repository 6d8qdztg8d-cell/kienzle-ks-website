import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

const SYSTEM_PROMPT = `You are a friendly and knowledgeable customer service assistant for Kienzle KS (Trupa Inspektuese për Tahograf Kienzle), Kosovo's leading tachograph calibration and vehicle inspection specialists since 2001.

ONLY answer questions about:
- Tachograph calibration services (digital and analog)
- Technical vehicle inspection services
- Vehicle diagnostics
- How tachographs work, their types (digital/analog, VDO DTCO, etc.)
- Fleet compliance with EU/Kosovo transport regulations
- Kienzle KS company information (history, location in Kosovo, contact: +383 481 135 80, WhatsApp)
- Driving time regulations and tachograph requirements for commercial vehicles
- Driver cards, calibration certificates, inspection stickers
- General advice about tachograph malfunctions, when to get calibration, etc.

If asked about unrelated topics, politely say you specialize in tachograph and vehicle inspection topics and bring the conversation back to what you can help with.

Keep responses clear, helpful, and concise. Match the user's language (German, English, or Albanian/Shqip).`

export default function ChatBot() {
  const { t, lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const endRef = useRef()
  const inputRef = useRef()

  // Add welcome message when first opened
  useEffect(() => {
    if (open && !initialized) {
      setMessages([{ role: 'assistant', content: t('chat.welcome') }])
      setInitialized(true)
    }
  }, [open, initialized, t])

  // Update welcome message on language change if only default message exists
  useEffect(() => {
    if (initialized && messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: t('chat.welcome') }])
    }
  }, [lang])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey) {
      setMessages(prev => [...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: t('chat.noKey') },
      ])
      setInput('')
      return
    }

    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        const errMsg = data?.error?.message || `HTTP ${res.status}`
        throw new Error(errMsg)
      }
      const reply = data.choices?.[0]?.message?.content || t('chat.error')
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      const msg = err.message?.includes('Incorrect API key')
        ? '🔑 Ungültiger API-Schlüssel. Bitte VITE_OPENAI_API_KEY in der .env-Datei prüfen.'
        : `${t('chat.error')} (${err.message})`
      setMessages(prev => [...prev, { role: 'assistant', content: msg }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#E31E24] rounded-full shadow-[0_4px_24px_rgba(227,30,36,0.45)] flex items-center justify-center text-white"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg key="chat"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#E31E24] animate-ping opacity-20" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-24 right-6 z-50 w-[340px] md:w-[380px] flex flex-col"
            style={{ height: 'min(520px, calc(100vh - 120px))' }}
          >
            <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.18)] border border-black/6"
              style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(20px)' }}>

              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/5 bg-[#E31E24]">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white leading-none">{t('chat.title')}</p>
                  <p className="text-[11px] text-white/70 mt-0.5">{t('chat.subtitle')}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-[10px] text-white/70">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-[#E31E24] flex items-center justify-center shrink-0 mt-0.5 mr-2">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#E31E24] text-white rounded-tr-sm'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start items-center gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#E31E24] flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-1">
                      {[0, 0.15, 0.3].map((d, i) => (
                        <motion.span key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                          className="w-1.5 h-1.5 rounded-full bg-[#a1a1a6] inline-block"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={endRef} />
              </div>

              {/* Input */}
              <div className="px-3 py-3 border-t border-black/5">
                <div className="flex items-center gap-2 bg-[#f5f5f7] rounded-xl px-3 py-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={t('chat.placeholder')}
                    className="flex-1 bg-transparent text-sm text-[#1d1d1f] placeholder-[#a1a1a6] outline-none"
                  />
                  <motion.button
                    onClick={send}
                    disabled={!input.trim() || loading}
                    whileTap={{ scale: 0.9 }}
                    className="w-7 h-7 rounded-lg bg-[#E31E24] flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>
                </div>
                <p className="text-center text-[10px] text-[#a1a1a6] mt-2">Kienzle KS · +383 481 135 80</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

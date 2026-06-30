import { createContext, useContext, useState, useEffect } from 'react'
import { getText } from './i18n'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('kienzle_lang') || 'de' } catch { return 'de' }
  })
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    try { localStorage.setItem('kienzle_lang', lang) } catch {}
  }, [lang])

  const t = (key) => getText(key, lang)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, selectedService, setSelectedService }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider')
  return ctx
}

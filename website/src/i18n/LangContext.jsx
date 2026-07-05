import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { LANGS, strings } from './strings'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem('bl-lang')
    return LANGS.includes(saved) ? saved : 'fr'
  })

  const change = useCallback((l) => {
    if (!LANGS.includes(l)) return
    setLang(l)
    try { localStorage.setItem('bl-lang', l) } catch { /* stockage indisponible : la langue reste en mémoire */ }
    document.documentElement.lang = l
  }, [])

  const value = useMemo(() => ({ lang, setLang: change, t: strings[lang] }), [lang, change])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

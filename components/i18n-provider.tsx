"use client"

import type { ReactNode } from "react"
import i18n from "i18next"
import { initReactI18next, I18nextProvider as Provider } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Import translations
import enTranslation from "@/locales/en.json"
import esTranslation from "@/locales/es.json"
import frTranslation from "@/locales/fr.json"
import deTranslation from "@/locales/de.json"
import zhTranslation from "@/locales/zh.json"
import urTranslation from "@/locales/ur.json"

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
  de: { translation: deTranslation },
  zh: { translation: zhTranslation },
  ur: { translation: urTranslation },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })

export function I18nextProvider({ children }: { children: ReactNode }) {
  return <Provider i18n={i18n}>{children}</Provider>
}

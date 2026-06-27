import { dictionary, supportedLangs, defaultLang, localeMap } from '../i18n/dictionary'

const STORAGE_KEY = 'site-lang'

// Достаём значение по точечному ключу: resolve(dict, 'hero.title')
const resolve = (obj, key) => key.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj)

// Определяем стартовый язык: сохранённый -> язык браузера -> по умолчанию
const detectLang = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && supportedLangs.includes(saved)) return saved

  const browser = (navigator.language || '').slice(0, 2).toLowerCase()
  return supportedLangs.includes(browser) ? browser : defaultLang
}

// Применяем переводы ко всем элементам с data-i18n / data-i18n-placeholder
const applyTranslations = (lang) => {
  const dict = dictionary[lang]

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = resolve(dict, el.dataset.i18n)
    if (value != null) el.textContent = value
  })

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const value = resolve(dict, el.dataset.i18nPlaceholder)
    if (value != null) el.setAttribute('placeholder', value)
  })

  document.documentElement.setAttribute('lang', lang)

  const ogLocale = document.querySelector('meta[property="og:locale"]')
  if (ogLocale) ogLocale.setAttribute('content', localeMap[lang] || localeMap[defaultLang])
}

let currentLang = defaultLang

// Публичный геттер текущего перевода (нужен другим модулям, например форме)
export const t = (key) => resolve(dictionary[currentLang], key) ?? key

export const setLang = (lang) => {
  if (!supportedLangs.includes(lang)) return

  currentLang = lang
  localStorage.setItem(STORAGE_KEY, lang)
  applyTranslations(lang)

  const currentLabel = document.querySelector('[data-lang-current]')
  if (currentLabel) currentLabel.textContent = lang.toUpperCase()

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang)
  })

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }))
}

export const initI18n = () => {
  const switcher = document.querySelector('[data-lang-switcher]')

  setLang(detectLang())

  if (!switcher) return

  const toggle = switcher.querySelector('.lang__current')

  // Открытие/закрытие выпадающего списка
  toggle?.addEventListener('click', (e) => {
    e.stopPropagation()
    const isOpen = switcher.classList.toggle('is-open')
    toggle.setAttribute('aria-expanded', String(isOpen))
  })

  // Выбор языка
  switcher.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang)
      switcher.classList.remove('is-open')
      toggle?.setAttribute('aria-expanded', 'false')
    })
  })

  // Закрытие по клику вне меню
  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove('is-open')
      toggle?.setAttribute('aria-expanded', 'false')
    }
  })
}

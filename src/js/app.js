import { isWebp, headerFixed, menuInit } from './modules'
import { initI18n } from './modules/i18n'
import { initScrollReveal } from './modules/scrollReveal'
import { initSmoothScroll } from './modules/smoothScroll'
import { initContactForm } from './modules/contactForm'

// Включить/выключить FLS (Full Logging System)
window['FLS'] = location.hostname === 'localhost'

// Проверка поддержки webp, добавление класса webp / no-webp для HTML
isWebp()

// Фиксированная (sticky) шапка при скролле
headerFixed()

// Мобильное меню (бургер)
menuInit()

// Мультиязычность (i18n) — переключение без перезагрузки
initI18n()

// Плавный скролл по якорям
initSmoothScroll()

// Появление блоков при скролле (IntersectionObserver)
initScrollReveal()

// Валидация и обработка формы контактов
initContactForm()

// Год в подвале
const yearEl = document.querySelector('[data-year]')
if (yearEl) yearEl.textContent = String(new Date().getFullYear())

import { html } from '../helpers/elementsNodeList'
import toggleBodyLock from '../helpers/toggleBodyLock'

// Плавный скролл по якорным ссылкам + закрытие мобильного меню
export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href')
      if (id === '#' || id.length < 2) return

      const target = document.querySelector(id)
      if (!target) return

      e.preventDefault()

      // Закрываем бургер-меню, если оно открыто
      if (html.classList.contains('menu-open')) {
        html.classList.remove('menu-open')
        toggleBodyLock(false)
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

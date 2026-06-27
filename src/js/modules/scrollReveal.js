// Плавное появление блоков при скролле через IntersectionObserver
export const initScrollReveal = () => {
  const elements = document.querySelectorAll('[data-reveal]')
  if (!elements.length) return

  // Если пользователь предпочитает уменьшенное движение — показываем сразу
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  )

  elements.forEach((el) => observer.observe(el))
}

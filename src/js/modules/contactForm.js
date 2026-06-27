import { t } from './i18n'

// Простая клиентская валидация и обработка формы контактов
export const initContactForm = () => {
  const form = document.querySelector('[data-contact-form]')
  if (!form) return

  const status = form.querySelector('[data-form-status]')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = form.elements.name
    const email = form.elements.email
    const message = form.elements.message

    let valid = true
    const fields = [
      { el: name, ok: name.value.trim().length > 1 },
      { el: email, ok: emailRegex.test(email.value.trim()) },
      { el: message, ok: message.value.trim().length > 4 },
    ]

    fields.forEach(({ el, ok }) => {
      el.classList.toggle('is-invalid', !ok)
      if (!ok) valid = false
    })

    if (!valid) {
      status.textContent = t('contact.form.error')
      status.className = 'form__note is-error'
      return
    }

    // Здесь можно подключить отправку на бэкенд / Telegram Bot API / FormSpree
    status.textContent = t('contact.form.success')
    status.className = 'form__note is-success'
    form.reset()
  })

  // Сбрасываем подсветку ошибки при вводе
  form.querySelectorAll('.form__input').forEach((input) => {
    input.addEventListener('input', () => input.classList.remove('is-invalid'))
  })
}

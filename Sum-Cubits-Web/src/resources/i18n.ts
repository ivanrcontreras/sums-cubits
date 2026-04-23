import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'
import type { I18n } from 'vue-i18n'

const i18n: I18n = createI18n({
  messages,
  legacy: false,
  fallbackLocale: 'default',
  locale: navigator.language
})

export default i18n
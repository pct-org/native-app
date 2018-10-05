import RNLanguages from 'react-native-languages'
import i18n from 'i18n-js'

import translations from './translations'

i18n.locale = RNLanguages.language
i18n.fallbacks = true
i18n.translations = translations
i18n.missingBehaviour = __DEV__ ? 'messages' : 'guess'

export default i18n

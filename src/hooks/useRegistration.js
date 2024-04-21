import { useI18n } from './useI18n'

export const REGISTRATION_STATUS = {
  NOT_PASS: 'not_pass',
  PASSED: 'passed',
  PENDING: 'pending'
}

export default function useRegistration() {
  const { t } = useI18n()
  const getStatusSetting = (status) => {
    let statusSetting = {
      text: '',
      color: '',
      icon: ''
    }
    switch (status) {
      case REGISTRATION_STATUS.NOT_PASS:
        statusSetting = {
          text: t('signUpDetail.notPass'),
          color: '#F5222D',
          icon: 'clear'
        }
        break
      case REGISTRATION_STATUS.PASSED:
        statusSetting = {
          text: t('signUpDetail.passed'),
          color: '#31cc80',
          icon: 'checked'
        }
        break
      case REGISTRATION_STATUS.PENDING:
        statusSetting = {
          text: t('signUpDetail.passed'),
          color: 'rgb(40, 120, 255)',
          icon: 'underway'
        }
        break
      default:
        return
    }
    return statusSetting
  }

  return {
    getStatusSetting
  }
}

export const REGISTRATION_STATUS = {
  WAIT_SUBMIT: 1,
  WAIT_AUDITING: 10,
  SUCCESS: 20,
  FAIL: 30,
  CANCEL: 40
}

export default function useRegistration() {
  const getStatusSetting = (status) => {
    let statusSetting = {
      text: '',
      color: '',
      icon: ''
    }
    switch (status) {
      case REGISTRATION_STATUS.FAIL:
        statusSetting = {
          color: '#F5222D',
          icon: 'clear'
        }
        break
      case REGISTRATION_STATUS.SUCCESS:
        statusSetting = {
          color: '#31cc80',
          icon: 'checked'
        }
        break
      case REGISTRATION_STATUS.WAIT_AUDITING:
      case REGISTRATION_STATUS.WAIT_SUBMIT:
        statusSetting = {
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

<script setup>
import { unref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from '@/hooks/useI18n'
import useValidate from '@/hooks/useValidate'
import useCountDown from '@/hooks/useCountDown'
import AppLink from '@/components/widgets/AppLink.vue'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import { useAuthStore, LOGIN_TYPE, LOGIN_BUTTON_TYPE } from '@/store/auth'
import { REQUEST_URL, CODE_TYPE } from '@/lib/const'
import { requestPost } from '@/lib/request'
import { router } from '@/router'

function secondsToTime(seconds) {
  var mins = Math.floor(seconds / 60)
  var secs = seconds % 60
  var formattedTime = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs
  return formattedTime
}

const { t } = useI18n()
const store = useAuthStore()
const { loginSetting, isLoginByPassword, authEmail } = storeToRefs(store)

if (loginSetting.value.loginType === LOGIN_TYPE.BY_CODE && !loginSetting.value.generateCodeTime) {
  loginSetting.value.loginType = LOGIN_TYPE.BY_PASSWORD
}

const buttonType = computed(() => {
  return loginSetting.value.buttonType
})
const generateCodeTime = computed(() => {
  return loginSetting.value.generateCodeTime
})
const { leaveTime } = useCountDown(undefined, generateCodeTime, () => {
  loginSetting.value.generateCodeTime = ''
})

const { formRules } = useValidate(['email', 'password', 'code'])

const handleRefresh = () => {
  if (!loginSetting.value.isNeedRemember && buttonType.value !== LOGIN_BUTTON_TYPE.VERTIFY) {
    authEmail.value = ''
    loginSetting.value.password = ''
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleRefresh)
})
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleRefresh)
  if (!loginSetting.value.isNeedRemember) {
    store.resetLoginSetting()
  }
})

const handleSubmit = () => {
  const buttonTypeValue = unref(buttonType)

  if (buttonTypeValue === LOGIN_BUTTON_TYPE.NEXT_STEP) {
    loginSetting.value.buttonType = LOGIN_BUTTON_TYPE.VERTIFY
    if (!generateCodeTime.value) {
      loginSetting.value.generateCodeTime = new Date().getTime()
    }
  } else {
    let url = ''
    const params = {
      email: authEmail.value
    }
    if (buttonTypeValue == LOGIN_BUTTON_TYPE.LOGIN) {
      params.password = loginSetting.value.password
      url = REQUEST_URL.LOGIN
    } else {
      params.code = loginSetting.value.code
      url = REQUEST_URL.LOGIN_BY_EMAIL_CODE
    }
    requestPost(url, params).then((res) => {
      if (res.data.code !== CODE_TYPE.ERROR) {
        store.resetLoginSetting()
        store.setUserInfo(res.data)
        router.push('/')
      }
    })
  }
}
const handleChangeLoginType = () => {
  const isByPasswordValue = unref(isLoginByPassword)
  loginSetting.value.password = ''
  loginSetting.value.loginType = isByPasswordValue ? LOGIN_TYPE.BY_CODE : LOGIN_TYPE.BY_PASSWORD
  loginSetting.value.buttonType = isByPasswordValue
    ? LOGIN_BUTTON_TYPE.NEXT_STEP
    : LOGIN_BUTTON_TYPE.LOGIN
}

const handleChangeEmail = () => {
  loginSetting.value.buttonType = LOGIN_BUTTON_TYPE.NEXT_STEP
}

watch(
  () => authEmail,
  () => {
    loginSetting.value.generateCodeTime = ''
    loginSetting.value.code = ''
  }
)
</script>

<template>
  <BaseContentLayout :title="t('login.title')" :sub-title="t('login.subTitle')">
    <template #headerExtra v-if="buttonType === LOGIN_BUTTON_TYPE.VERTIFY">
      <p class="font-medium mt-4">{{ authEmail }}</p>
      <p
        @click="handleChangeEmail"
        class="text-[--warning-color] flex items-center justify-center cursor-pointer gap-x-2 mt-4"
      >
        {{ t('login.changeEmail') }}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.67678 2.46971L7.60355 0.396484L6.89645 1.10359L8.54289 2.75004H0.250001V3.75004H9.14645C9.81462 3.75004 10.1493 2.94218 9.67678 2.46971ZM0.323224 7.53037L2.39645 9.60359L3.10355 8.89649L1.45711 7.25004L9.75 7.25004V6.25004L0.853555 6.25004C0.185379 6.25004 -0.149251 7.05789 0.323224 7.53037Z"
            fill="#FF6418"
          />
        </svg>
      </p>
    </template>
    <van-form validate-trigger="onSubmit" @submit="handleSubmit" label-align="top">
      <div class="space-y-6">
        <app-input
          v-if="buttonType !== LOGIN_BUTTON_TYPE.VERTIFY"
          type="email"
          v-model="authEmail"
          :label="t('inputFields.email')"
          :placeholder="t('inputFields.emailPlaceholder')"
          :rules="formRules.email"
        />
        <app-input
          v-if="isLoginByPassword"
          v-model="loginSetting.password"
          type="password"
          :label="t('inputFields.password')"
          :placeholder="t('inputFields.passwordPlaceholder')"
          :rules="formRules.password"
        />
        <app-input
          v-if="buttonType === LOGIN_BUTTON_TYPE.VERTIFY"
          v-model="loginSetting.code"
          type="text"
          :label="t('inputFields.verificationCode')"
          :placeholder="t('inputFields.verificationCodePlaceholder')"
          :rules="formRules.code"
        >
          <template #button v-if="generateCodeTime">
            {{ secondsToTime(leaveTime) }}
          </template>
        </app-input>
        <div class="flex justify-between">
          <span class="flex text-[--primary-second-color]">
            <van-checkbox
              checked-color="#ff6418"
              v-model="loginSetting.isNeedRemember"
              shape="square"
              class="mr-2 rounded-md"
            />
            {{ t('login.rememberMe') }}
          </span>
          <app-link v-if="isLoginByPassword" class="text-[--warning-color]" to="/reset-password">{{
            t('login.forgotPassword')
          }}</app-link>
        </div>
        <div class="flex justify-center">
          <van-button round color="#ff6418" size="normal" native-type="submit" style="width: 200px">
            {{
              buttonType === LOGIN_BUTTON_TYPE.LOGIN
                ? t('login.login')
                : buttonType === LOGIN_BUTTON_TYPE.NEXT_STEP
                  ? t('login.nextStep')
                  : t('login.login')
            }}
          </van-button>
        </div>
        <div class="flex justify-center flex-col items-center gap-y-4">
          <span
            class="text-[--primary-second-color] font-medium cursor-pointer hover:text-[--warning-color] active:text-[--warning-color]"
            @click="handleChangeLoginType"
          >
            {{ isLoginByPassword ? t('login.byVerificationCode') : t('login.byPassword') }}
          </span>
          <app-link to="/register" style="color: var(--warning-color)">{{
            t('login.register')
          }}</app-link>
        </div>
      </div>
    </van-form>
  </BaseContentLayout>
</template>

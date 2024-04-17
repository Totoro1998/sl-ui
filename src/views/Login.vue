<script setup>
import { useI18n } from '@/hooks/useI18n'
import { passwordRegex, verificationCodeRegex } from '@/lib/validate'
import { unref, ref, watch } from 'vue'
import { useLoginStore, BUTTON_TYPE, LOGIN_TYPE } from '@/store/login'
import { storeToRefs } from 'pinia'

const LEAVE_TIME = 300

function secondsToTime(seconds) {
  var mins = Math.floor(seconds / 60)
  var secs = seconds % 60
  var formattedTime = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs
  return formattedTime
}

const { t } = useI18n()
const store = useLoginStore()
const { buttonType, formModel, loginType, isByPassword, generateCodeTime } = storeToRefs(store)

const formRules = ref({
  email: [{ required: true, message: '请输入邮箱' }],
  password: [
    { required: true, message: '请输入密码' },
    {
      pattern: passwordRegex,
      message: '请输入至少8位密码'
    }
  ],
  code: [
    { required: true, message: '请输入六位验证码' },
    {
      pattern: verificationCodeRegex,
      message: '请输入六位验证码'
    }
  ]
})
const isNeedRemember = ref(false)
const leaveTime = ref(LEAVE_TIME)
const handleSubmit = () => {
  const buttonTypeValue = unref(buttonType)
  if (buttonTypeValue == BUTTON_TYPE.LOGIN) {
    console.log('login')
  } else if (buttonTypeValue === BUTTON_TYPE.NEXT_STEP) {
    buttonType.value = BUTTON_TYPE.VERTIFY
    generateCodeTime.value = new Date().getTime()
  } else {
    console.log('code登录')
    generateCodeTime.value = ''
  }
}
const handleChangeLoginType = () => {
  const isByPasswordValue = unref(isByPassword.value)
  loginType.value = isByPasswordValue ? LOGIN_TYPE.BY_CODE : LOGIN_TYPE.BY_PASSWORD
  buttonType.value = isByPasswordValue ? BUTTON_TYPE.NEXT_STEP : BUTTON_TYPE.LOGIN
}

const setLeaveTime = () => {
  const generateCodeTimeValue = unref(generateCodeTime)
  leaveTime.value -= parseInt((new Date().getTime() - parseInt(generateCodeTimeValue)) / 1000)
  const timer = setInterval(function () {
    if (leaveTime.value > 0) {
      leaveTime.value -= 1
    }
    const currentTime = new Date().getTime()
    if (currentTime >= parseInt(generateCodeTimeValue) + LEAVE_TIME * 1000) {
      clearInterval(timer)
      generateCodeTime.value = ''
    }
  }, 1000)
}

const handleChangeEmail = () => {
  buttonType.value = BUTTON_TYPE.NEXT_STEP
}

watch(
  () => formModel.value.email,
  (value, oldValue) => {
    if (oldValue !== value) {
      generateCodeTime.value = ''
    }
  }
)

watch(
  generateCodeTime,
  (value) => {
    if (value && buttonType.value) {
      setLeaveTime()
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="login w-full mx-auto max-w-[556px] pt-12 pb-8">
    <div class="text-center">
      <h1 class="text-3xl text-[--primary-color]">{{ t('login.title') }}</h1>
      <p class="text-[--primary-second-color] mt-4">{{ t('login.subTitle') }}</p>
      <template v-if="buttonType === BUTTON_TYPE.VERTIFY">
        <p class="text-[--primary-second-color] mt-4">{{ formModel.email }}</p>
        <p @click="handleChangeEmail" class="text-[--warning-color] mt-4">
          {{ t('login.changeEmail') }}
        </p>
      </template>
    </div>
    <div>
      <van-form validate-trigger="onSubmit" @submit="handleSubmit" label-align="top">
        <app-input
          v-if="buttonType !== BUTTON_TYPE.VERTIFY"
          type="email"
          v-model="formModel.email"
          :label="t('inputFields.email')"
          :placeholder="t('inputFields.emailPlaceholder')"
          :rules="formRules.email"
        />
        <app-input
          v-if="isByPassword"
          v-model="formModel.password"
          type="password"
          :label="t('inputFields.password')"
          :placeholder="t('inputFields.passwordPlaceholder')"
          :rules="formRules.password"
        />
        <app-input
          v-if="buttonType === BUTTON_TYPE.VERTIFY"
          v-model="formModel.code"
          type="password"
          :label="t('inputFields.verificationCode')"
          :placeholder="t('inputFields.verificationCodePlaceholder')"
          :rules="formRules.password"
        >
          <template #button v-if="generateCodeTime">
            {{ secondsToTime(leaveTime) }}
          </template>
        </app-input>
        <div class="flex justify-between">
          <span class="flex text-[--primary-second-color]">
            <van-checkbox v-model="isNeedRemember" shape="square" class="mr-2" />
            {{ t('login.rememberMe') }}
          </span>
          <a class="text-[--warning-color]" href="/reset-password">{{
            t('login.forgotPassword')
          }}</a>
        </div>
        <div class="flex justify-center mt-5">
          <van-button round color="#ff6418" size="normal" native-type="submit" style="width: 200px">
            {{
              buttonType === BUTTON_TYPE.LOGIN
                ? t('login.login')
                : buttonType === BUTTON_TYPE.NEXT_STEP
                  ? t('login.nextStep')
                  : t('login.login')
            }}
          </van-button>
        </div>
        <div class="flex justify-center mt-5">
          <span class="text-[--primary-second-color]" @click="handleChangeLoginType">
            {{ isByPassword ? t('login.byVerificationCode') : t('login.byPassword') }}
          </span>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '@/hooks/useI18n'
import { passwordRegex, verificationCodeRegex } from '@/lib/validate'
import { unref, ref, watch } from 'vue'
import { useAuthStore, BUTTON_TYPE } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const LEAVE_TIME = 300

function secondsToTime(seconds) {
  var mins = Math.floor(seconds / 60)
  var secs = seconds % 60
  var formattedTime = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs
  return formattedTime
}

const { t } = useI18n()
const store = useAuthStore()
const { resetPasswordSetting } = storeToRefs(store)

const buttonType = computed(() => {
  return resetPasswordSetting.value.buttonType
})
const subTitle = computed(() => {
  const buttonTypeValue = unref(buttonType)
  return buttonTypeValue === BUTTON_TYPE.NEXT_STEP
    ? t('retrievePassword.subTitle')
    : buttonTypeValue === BUTTON_TYPE.VERTIFY
      ? t('retrievePassword.sendedTip')
      : t('retrievePassword.resetTip')
})
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
const leaveTime = ref(LEAVE_TIME)
const handleSubmit = () => {
  const buttonTypeValue = unref(buttonType)
  if (buttonTypeValue == BUTTON_TYPE.NEXT_STEP) {
    resetPasswordSetting.value.buttonType = BUTTON_TYPE.VERTIFY
    resetPasswordSetting.value.generateCodeTime = new Date().getTime()
  } else if (buttonTypeValue === BUTTON_TYPE.VERTIFY) {
    resetPasswordSetting.value.buttonType = BUTTON_TYPE.LOGIN
  } else {
    console.log('code登录')
    resetPasswordSetting.value.generateCodeTime = ''
  }
}

const handleChangeEmail = () => {
  resetPasswordSetting.value.buttonType = BUTTON_TYPE.NEXT_STEP
  resetPasswordSetting.value.password = ''
  resetPasswordSetting.value.generateCodeTime = ''
}

const setLeaveTime = () => {
  const generateCodeTimeValue = unref(resetPasswordSetting).generateCodeTime
  leaveTime.value -= parseInt((new Date().getTime() - parseInt(generateCodeTimeValue)) / 1000)
  const timer = setInterval(function () {
    if (leaveTime.value > 0) {
      leaveTime.value -= 1
    }
    const currentTime = new Date().getTime()
    if (currentTime >= parseInt(generateCodeTimeValue) + LEAVE_TIME * 1000) {
      clearInterval(timer)
      resetPasswordSetting.value.generateCodeTime = ''
    }
  }, 1000)
}

watch(
  () => resetPasswordSetting.value.email,
  (value, oldValue) => {
    if (oldValue !== value) {
      resetPasswordSetting.value.generateCodeTime = ''
    }
  }
)

watch(
  () => resetPasswordSetting.value.generateCodeTime,
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
      <h1 class="text-3xl text-[--primary-color]">{{ t('retrievePassword.title') }}</h1>
      <p class="text-[--primary-second-color] mt-4">{{ subTitle }}</p>
      <template v-if="buttonType !== BUTTON_TYPE.NEXT_STEP">
        <p class="text-[--primary-second-color] mt-4">{{ resetPasswordSetting.email }}</p>
        <p
          @click="handleChangeEmail"
          class="text-[--warning-color] flex items-center justify-center gap-x-2 mt-4 cursor-pointer"
        >
          {{ t('login.changeEmail') }}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="9.7958984375"
            height="9.20703125"
            viewBox="0 0 9.7958984375 9.20703125"
            fill="none"
          >
            <path
              d="M9.57473 2.07322L7.5015 0L6.7944 0.707107L8.44084 2.35355L0.14795 2.35355L0.14795 3.35355L9.0444 3.35355C9.71257 3.35355 10.0472 2.5457 9.57473 2.07322ZM0.221173 7.13388L2.2944 9.20711L3.0015 8.5L1.35506 6.85355L9.64795 6.85356L9.64795 5.85356L0.751504 5.85355C0.0833284 5.85355 -0.251302 6.66141 0.221173 7.13388Z"
              fill-rule="evenodd"
              fill="#FF6418"
            ></path>
          </svg>
        </p>
      </template>
    </div>
    <div>
      <van-form validate-trigger="onSubmit" @submit="handleSubmit" label-align="top">
        <app-input
          v-if="buttonType === BUTTON_TYPE.NEXT_STEP"
          type="email"
          v-model="resetPasswordSetting.email"
          :label="t('inputFields.email')"
          :placeholder="t('inputFields.emailPlaceholder')"
          :rules="formRules.email"
        />
        <app-input
          v-if="buttonType === BUTTON_TYPE.VERTIFY"
          v-model="resetPasswordSetting.code"
          type="password"
          :label="t('inputFields.verificationCode')"
          :placeholder="t('inputFields.verificationCodePlaceholder')"
          :rules="formRules.code"
        >
          <template #button v-if="resetPasswordSetting.generateCodeTime">
            {{ secondsToTime(leaveTime) }}
          </template>
        </app-input>
        <app-input
          v-if="buttonType === BUTTON_TYPE.LOGIN"
          v-model="resetPasswordSetting.password"
          type="password"
          :label="t('inputFields.password')"
          :placeholder="t('inputFields.passwordPlaceholder')"
          :rules="formRules.password"
        />
        <div class="flex justify-center mt-5">
          <van-button round color="#ff6418" size="normal" native-type="submit" style="width: 200px">
            {{
              buttonType === BUTTON_TYPE.NEXT_STEP
                ? t('login.nextStep')
                : buttonType === BUTTON_TYPE.VERTIFY
                  ? t('retrievePassword.verification')
                  : t('retrievePassword.reset')
            }}
          </van-button>
        </div>
        <div class="flex justify-center mt-5">
          <a class="text-[--primary-second-color]" href="/login">
            {{ t('login.byPassword') }}
          </a>
        </div>
      </van-form>
    </div>
  </div>
</template>

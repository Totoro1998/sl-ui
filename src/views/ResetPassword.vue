<script setup>
import { unref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from '@/hooks/useI18n'
import useCountDown from '@/hooks/useCountDown'
import useValidate from '@/hooks/useValidate'
import { useAuthStore, RESET_PASSWORD_BUTTON_TYPE } from '@/store/auth'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import AppLink from '@/components/widgets/AppLink.vue'
import { ref } from 'vue'

function secondsToTime(seconds) {
  var mins = Math.floor(seconds / 60)
  var secs = seconds % 60
  var formattedTime = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs
  return formattedTime
}

const { t } = useI18n()
const store = useAuthStore()
const { resetPasswordSetting, authEmail } = storeToRefs(store)
const code = ref()
const password = ref('')

const generateCodeTime = computed(() => {
  return resetPasswordSetting.value.generateCodeTime
})
const buttonType = computed(() => {
  return resetPasswordSetting.value.buttonType
})
const subTitle = computed(() => {
  const buttonTypeValue = unref(buttonType)
  return buttonTypeValue === RESET_PASSWORD_BUTTON_TYPE.NEXT_STEP
    ? t('retrievePassword.subTitle')
    : buttonTypeValue === RESET_PASSWORD_BUTTON_TYPE.VERTIFY
      ? t('email.sendedEmailTip')
      : t('retrievePassword.resetTip')
})
const { leaveTime } = useCountDown(undefined, generateCodeTime, () => {
  resetPasswordSetting.value.generateCodeTime = ''
})
const formRules = useValidate(['email', 'password', 'code'])

const handleSubmit = () => {
  const buttonTypeValue = unref(buttonType)
  const generateCodeTimeValue = unref(generateCodeTime)
  if (buttonTypeValue == RESET_PASSWORD_BUTTON_TYPE.NEXT_STEP) {
    resetPasswordSetting.value.buttonType = RESET_PASSWORD_BUTTON_TYPE.VERTIFY
    if (!generateCodeTimeValue) {
      resetPasswordSetting.value.generateCodeTime = new Date().getTime()
    }
  } else if (buttonTypeValue === RESET_PASSWORD_BUTTON_TYPE.VERTIFY) {
    resetPasswordSetting.value.buttonType = RESET_PASSWORD_BUTTON_TYPE.LOGIN
  } else {
    console.log('code登录')
    resetPasswordSetting.value.generateCodeTime = ''
  }
}
const handleChangeEmail = () => {
  resetPasswordSetting.value.buttonType = RESET_PASSWORD_BUTTON_TYPE.NEXT_STEP
}

watch(
  () => authEmail,
  () => {
    resetPasswordSetting.value.generateCodeTime = ''
    code.value = ''
  }
)

watch(generateCodeTime, (value) => {
  if (!value && buttonType.value === RESET_PASSWORD_BUTTON_TYPE.VERTIFY) {
    resetPasswordSetting.value.buttonType = RESET_PASSWORD_BUTTON_TYPE.NEXT_STEP
  }
})
</script>

<template>
  <BaseContentLayout :title="t('retrievePassword.title')" :sub-title="subTitle">
    <template v-if="buttonType !== RESET_PASSWORD_BUTTON_TYPE.NEXT_STEP" #headerExtra>
      <p class="text-[--primary-second-color] mt-4">{{ authEmail }}</p>
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

    <van-form validate-trigger="onSubmit" @submit="handleSubmit" label-align="top">
      <div class="space-y-6">
        <app-input
          v-if="buttonType === RESET_PASSWORD_BUTTON_TYPE.NEXT_STEP"
          type="email"
          v-model="authEmail"
          :label="t('inputFields.email')"
          :placeholder="t('inputFields.emailPlaceholder')"
          :rules="formRules.email"
        />
        <app-input
          v-if="buttonType === RESET_PASSWORD_BUTTON_TYPE.VERTIFY"
          v-model="code"
          type="text"
          :label="t('inputFields.verificationCode')"
          :placeholder="t('inputFields.verificationCodePlaceholder')"
          :rules="formRules.code"
        >
          <template #button v-if="generateCodeTime">
            {{ secondsToTime(leaveTime) }}
          </template>
        </app-input>
        <app-input
          v-if="buttonType === RESET_PASSWORD_BUTTON_TYPE.LOGIN"
          v-model="password"
          type="password"
          :label="t('inputFields.password')"
          :placeholder="t('inputFields.passwordPlaceholder')"
          :rules="formRules.password"
        />
        <div class="flex justify-center">
          <van-button round color="#ff6418" size="normal" native-type="submit" style="width: 200px">
            {{
              buttonType === RESET_PASSWORD_BUTTON_TYPE.NEXT_STEP
                ? t('login.nextStep')
                : buttonType === RESET_PASSWORD_BUTTON_TYPE.VERTIFY
                  ? t('retrievePassword.verification')
                  : t('retrievePassword.reset')
            }}
          </van-button>
        </div>
        <div class="flex justify-center">
          <app-link to="/login">
            {{ t('login.byPassword') }}
          </app-link>
        </div>
      </div>
    </van-form>
  </BaseContentLayout>
</template>

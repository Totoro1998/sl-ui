<script setup>
import { useI18n } from '@/hooks/useI18n'
import { unref, ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import { useAuthStore, LOGIN_TYPE, LOGIN_BUTTON_TYPE } from '@/store/auth'
import useValidate from '@/hooks/useValidate'
import useCountDown from '@/hooks/useCountDown'

function secondsToTime(seconds) {
  var mins = Math.floor(seconds / 60)
  var secs = seconds % 60
  var formattedTime = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs
  return formattedTime
}

const { t } = useI18n()
const store = useAuthStore()
const { loginSetting, isLoginByPassword } = storeToRefs(store)

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
const isNeedRemember = ref(false)

const handleSubmit = () => {
  const buttonTypeValue = unref(buttonType)
  if (buttonTypeValue == LOGIN_BUTTON_TYPE.LOGIN) {
    console.log('login')
  } else if (buttonTypeValue === LOGIN_BUTTON_TYPE.NEXT_STEP) {
    loginSetting.value.buttonType = LOGIN_BUTTON_TYPE.VERTIFY
    loginSetting.value.generateCodeTime = new Date().getTime()
  } else {
    console.log('code登录')
    loginSetting.value.generateCodeTime = ''
  }
}
const handleChangeLoginType = () => {
  const isByPasswordValue = unref(isLoginByPassword)
  loginSetting.value.loginType = isByPasswordValue ? LOGIN_TYPE.BY_CODE : LOGIN_TYPE.BY_PASSWORD
  loginSetting.value.buttonType = isByPasswordValue
    ? LOGIN_BUTTON_TYPE.NEXT_STEP
    : LOGIN_BUTTON_TYPE.LOGIN
}

const handleChangeEmail = () => {
  loginSetting.value.buttonType = LOGIN_BUTTON_TYPE.NEXT_STEP
}

watch(
  () => loginSetting.value.email,
  (value, oldValue) => {
    if (oldValue !== value) {
      loginSetting.value.generateCodeTime = ''
    }
  }
)
</script>

<template>
  <BaseContentLayout :title="t('login.title')" :sub-title="t('login.subTitle')">
    <template #headerExtra v-if="buttonType === LOGIN_BUTTON_TYPE.VERTIFY">
      <p class="text-[--primary-second-color] mt-4">{{ loginSetting.email }}</p>
      <p @click="handleChangeEmail" class="text-[--warning-color] mt-4">
        {{ t('login.changeEmail') }}
      </p>
    </template>
    <van-form validate-trigger="onSubmit" @submit="handleSubmit" label-align="top">
      <app-input
        v-if="buttonType !== LOGIN_BUTTON_TYPE.VERTIFY"
        type="email"
        v-model="loginSetting.email"
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
            v-model="isNeedRemember"
            shape="square"
            class="mr-2 rounded-md"
          />
          {{ t('login.rememberMe') }}
        </span>
        <a class="text-[--warning-color]" href="/reset-password">{{ t('login.forgotPassword') }}</a>
      </div>
      <div class="flex justify-center mt-5">
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
      <div class="flex justify-center mt-5">
        <span class="text-[--primary-second-color]" @click="handleChangeLoginType">
          {{ isLoginByPassword ? t('login.byVerificationCode') : t('login.byPassword') }}
        </span>
      </div>
    </van-form>
  </BaseContentLayout>
</template>

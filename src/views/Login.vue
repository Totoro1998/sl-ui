<script setup>
import { unref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from '@/hooks/useI18n'
import useValidate from '@/hooks/useValidate'
import useCountDown from '@/hooks/useCountDown'
import AppLink from '@/components/widgets/AppLink.vue'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import { useAuthStore, LOGIN_TYPE, LOGIN_BUTTON_TYPE } from '@/store/auth'

function secondsToTime(seconds) {
  var mins = Math.floor(seconds / 60)
  var secs = seconds % 60
  var formattedTime = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs
  return formattedTime
}

const { t } = useI18n()
const store = useAuthStore()
const { loginSetting, isLoginByPassword, authEmail } = storeToRefs(store)

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
  if (buttonTypeValue == LOGIN_BUTTON_TYPE.LOGIN) {
    console.log('login')
  } else if (buttonTypeValue === LOGIN_BUTTON_TYPE.NEXT_STEP) {
    loginSetting.value.buttonType = LOGIN_BUTTON_TYPE.VERTIFY
    if (!generateCodeTime.value) {
      loginSetting.value.generateCodeTime = new Date().getTime()
    }
  } else {
    console.log('code登录')
    store.resetLoginSetting()
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
      <p class="text-[--primary-second-color] mt-4">{{ authEmail }}</p>
      <p @click="handleChangeEmail" class="text-[--warning-color] mt-4">
        {{ t('login.changeEmail') }}
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
        <div class="flex justify-center">
          <span
            class="text-[--primary-second-color] font-medium cursor-pointer hover:text-[--warning-color] active:text-[--warning-color]"
            @click="handleChangeLoginType"
          >
            {{ isLoginByPassword ? t('login.byVerificationCode') : t('login.byPassword') }}
          </span>
        </div>
      </div>
    </van-form>
  </BaseContentLayout>
</template>

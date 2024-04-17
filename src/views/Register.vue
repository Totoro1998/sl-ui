<script setup>
import { useI18n } from '@/hooks/useI18n'
import { ref } from 'vue'
import AppInput from '@/components/widgets/AppInput.vue'
import AppSelect from '@/components/widgets/AppSelect.vue'
import AppDatePicker from '@/components/widgets/AppDatePicker.vue'
import { passwordRegex } from '@/lib/validate'

const { t } = useI18n()
const formModel = ref({
  first_name: '',
  last_name: '',
  gender: '',
  birthday: '',
  country_or_region: '',
  email: '',
  password: '',
  confirm_password: ''
})
const formRules = ref({
  first_name: [{ required: true, message: '请填写姓名' }],
  last_name: [{ required: true, message: '请填写姓氏' }],
  gender: [{ required: true, message: '请选择性别' }],
  birthday: [{ required: true, message: '请选择生日' }],
  country_or_region: [{ required: true, message: '请选择国家或地区' }],
  email: [{ required: true, message: '请输入邮箱' }],
  password: [
    { required: true, message: '请输入密码' },
    {
      pattern: passwordRegex,
      message: '请输入至少8位密码'
    }
  ],
  confirm_password: [
    { required: true, message: '请输入确认密码' },
    {
      validator: (val) => formModel.value.password && formModel.value.password === val,
      message: '与密码一致'
    }
  ]
})
const genderList = [
  {
    text: '男',
    value: 'male'
  },
  {
    text: '女',
    value: 'female'
  }
]
const checked = ref(false)
const handleSubmit = () => {
  if (!checked.value) return
}
</script>

<template>
  <div class="register w-full mx-auto max-w-[556px] pt-12 pb-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl text-[--primary-color]">{{ t('register.title') }}</h1>
      <p class="text-[--primary-second-color] mt-4">{{ t('register.subTitle') }}</p>
    </div>
    <van-form validate-trigger="onSubmit" @submit="handleSubmit" label-align="top">
      <div class="space-y-6">
        <div class="grid grid-cols-1 gap-x-2 lg:grid-cols-2">
          <app-input
            v-model="formModel.first_name"
            :label="t('inputFields.firstName')"
            :placeholder="t('inputFields.firstNamePlaceholder')"
            :rules="formRules.first_name"
          />
          <app-input
            v-model="formModel.last_name"
            :label="t('inputFields.lastName')"
            :placeholder="t('inputFields.lastNamePlaceholder')"
            :rules="formRules.last_name"
          />
        </div>
        <div class="grid grid-cols-1 gap-x-2 lg:grid-cols-2">
          <app-select
            v-model="formModel.gender"
            :columns="genderList"
            :label="t('inputFields.gender')"
            :placeholder="t('inputFields.genderPlaceholder')"
            :rules="formRules.gender"
          />
          <app-date-picker
            v-model="formModel.birthday"
            :label="t('inputFields.birthday')"
            :placeholder="t('inputFields.birthdayPlaceholder')"
            :rules="formRules.birthday"
          />
        </div>
        <div class="grid grid-cols-1">
          <app-input
            v-model="formModel.country_or_region"
            :label="t('inputFields.countryOrRegion')"
            placeholder=""
            :rules="formRules.country_or_region"
          />
        </div>
        <div>Email & Password</div>
        <div class="grid grid-cols-1">
          <app-input
            type="email"
            v-model="formModel.email"
            :label="t('inputFields.email')"
            :placeholder="t('inputFields.emailPlaceholder')"
            :rules="formRules.email"
          />
        </div>
        <div class="grid grid-cols-1">
          <app-input
            v-model="formModel.password"
            type="password"
            :label="t('inputFields.password')"
            :placeholder="t('inputFields.passwordPlaceholder')"
            :rules="formRules.password"
          />
        </div>
        <div class="grid grid-cols-1">
          <app-input
            v-model="formModel.confirm_password"
            type="password"
            :label="t('inputFields.confirmPassword')"
            :placeholder="t('inputFields.confirmPasswordPlaceholder')"
            :rules="formRules.confirm_password"
          />
        </div>
        <div class="flex justify-center">
          <van-checkbox v-model="checked" shape="square" class="mr-2" />
          {{ t('policy.needAgree') }}
          <a href="/" class="text-[--warning-color]">{{ t('policy.userAgreement') }}</a>
          {{ t('policy.and')
          }}<a href="/" class="text-[--warning-color]">{{ t('policy.privacyPolicy') }}</a>
        </div>
        <div class="flex justify-center">
          <van-button round color="#ff6418" size="normal" native-type="submit" style="width: 200px">
            {{ t('register.createButton') }}
          </van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>
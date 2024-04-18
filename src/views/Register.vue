<script setup>
import { useI18n } from '@/hooks/useI18n'
import { ref } from 'vue'
import AppInput from '@/components/widgets/AppInput.vue'
import AppSelect from '@/components/widgets/AppSelect.vue'
import AppDatePicker from '@/components/widgets/AppDatePicker.vue'
import useValidate from '@/hooks/useValidate'
import { useRouter } from 'vue-router'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import { useCountryStore } from '@/store/country'
import { computed, watch } from 'vue'
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
const { t } = useI18n()
const router = useRouter()

const countryStore = useCountryStore()

const country = computed(() => countryStore.country)

const formModel = ref({
  first_name: '',
  last_name: '',
  gender: '',
  birthday: '',
  country_or_region: '',
  email: '',
  password: ''
})
const { formRules } = useValidate(Object.keys(formModel.value))

watch(
  country,
  () => {
    formModel.value.country_or_region = country.value.alpha3
  },
  {
    immediate: true
  }
)

const checked = ref(false)

const handleSubmit = () => {
  if (!checked.value) return
}
</script>

<template>
  <BaseContentLayout :title="t('register.title')" :sub-title="t('register.subTitle')">
    <van-form validate-trigger="onSubmit" @submit="handleSubmit" label-align="top">
      <div class="space-y-6">
        <div class="grid grid-cols-1 gap-y-6 gap-x-4 lg:grid-cols-2">
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
        <div class="grid grid-cols-1 gap-y-6 gap-x-4 lg:grid-cols-2">
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
        <app-input
          :modelValue="country.en"
          :label="t('inputFields.countryOrRegion')"
          :placeholder="t('inputFields.countryOrRegionPlaceholder')"
          readonly
          is-link
          @click="router.push({ name: 'COUNTRY_REGION_LIST' })"
          :rules="formRules.country_or_region"
        />
        <div>Email & Password</div>
        <app-input
          type="email"
          v-model="formModel.email"
          :label="t('inputFields.email')"
          :placeholder="t('inputFields.emailPlaceholder')"
          :rules="formRules.email"
        />
        <app-input
          v-model="formModel.password"
          type="password"
          :label="t('inputFields.password')"
          :placeholder="t('inputFields.passwordPlaceholder')"
          :rules="formRules.password"
        />
        <div class="flex justify-center">
          <van-checkbox
            checked-color="#ff6418"
            v-model="checked"
            shape="square"
            class="mr-2 rounded-md"
          />
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
  </BaseContentLayout>
</template>

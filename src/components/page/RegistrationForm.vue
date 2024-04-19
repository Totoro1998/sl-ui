<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from '@/hooks/useI18n'
import { useCountryStore } from '@/store/country'
import { computed, watch } from 'vue'
import { useRegistrationStore } from '@/store/registration'
import AppInput from '../widgets/AppInput.vue'
import AppSelect from '@/components/widgets/AppSelect.vue'
import AppDatePicker from '@/components/widgets/AppDatePicker.vue'
import useValidate from '@/hooks/useValidate'

const { t } = useI18n()
const countryStore = useCountryStore()
const store = useRegistrationStore()
const { formModel } = storeToRefs(store)
const { formRules } = useValidate(Object.keys(formModel.value))

const country = computed(() => countryStore.country)

watch(
  country,
  () => {
    formModel.value.country_or_region = country.value.alpha3
  },
  {
    immediate: true
  }
)
</script>
<template>
  <van-form validate-trigger="onSubmit" @submit="handleSubmit" label-align="top">
    <div>
      <div>
        <div>1个人信息</div>
        <div class="flex flex-col lg:flex-row gap-6">
          <div>
            <van-uploader v-model="fileList" :after-read="afterRead" />
          </div>
          <div>
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
          v-model="formModel.full_address"
          :label="t('inputFields.fullAddress')"
          :placeholder="t('inputFields.fullAddressPlaceholder')"
          :rules="formRules.full_address"
          type="textarea"
          show-word-limit
          rows="4"
          maxlength="200"
        />
        <app-input
          type="email"
          v-model="formModel.email"
          :label="t('inputFields.email')"
          :placeholder="t('inputFields.emailPlaceholder')"
          :rules="formRules.email"
        />
        <app-input
          v-model="formModel.phone"
          type="text"
          :label="t('inputFields.phone')"
          :placeholder="t('inputFields.phonePlaceholder')"
        />
      </div>
      <div>
        <div>2报名项目信息</div>
      </div>
      <div>
        <div>3参赛项目信息</div>
      </div>
      <div>
        <div>4参赛项目信息</div>
      </div>
    </div>
  </van-form>
</template>

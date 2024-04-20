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
import AppTelInput from '../widgets/AppTelInput.vue'

const { t } = useI18n()
const countryStore = useCountryStore()
const store = useRegistrationStore()
const { formModel } = storeToRefs(store)
const { formRules } = useValidate(Object.keys(formModel.value))

const country = computed(() => countryStore.country)

const handleDeleteProject = (index) => {
  formModel.value.projects.splice(index, 1)
}

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
    <div class="space-y-6">
      <div class="space-y-6">
        <div class="flex gap-x-2">
          <span
            class="flex items-center bg-[--success-color] text-white justify-center rounded-full h-6 w-6"
          >
            1
          </span>
          <span class="text-[--primary-second-color]">
            {{ t('registrationForm.personInfo') }}
          </span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4">
          <div class="flex items-center justify-center">
            <van-uploader v-model="fileList" :after-read="afterRead" />
          </div>
          <div class="space-y-6">
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
        <app-tel-input
          v-model="formModel.phone"
          type="text"
          :label="t('inputFields.phone')"
          :placeholder="t('inputFields.phonePlaceholder')"
        />
      </div>
      <div class="space-y-6">
        <div class="flex gap-x-2">
          <span
            class="flex items-center bg-[--success-color] text-white justify-center rounded-full h-6 w-6"
          >
            2
          </span>
          <span class="text-[--primary-second-color]">
            {{ t('registrationForm.organizationInfo') }}
          </span>
        </div>
        <app-input
          v-model="formModel.company_name"
          :label="t('inputFields.companyName')"
          :placeholder="t('inputFields.companyNamePlaceholder')"
          :rules="formRules.company_name"
        />
        <app-input
          v-model="formModel.contact_person_name"
          :label="t('inputFields.contactPersonName')"
          :placeholder="t('inputFields.contactPersonNamePlaceholder')"
          :rules="formRules.contact_person_name"
        />
        <app-input
          v-model="formModel.company_address"
          :label="t('inputFields.companyAddress')"
          :placeholder="t('inputFields.companyAddressPlaceholder')"
          :rules="formRules.company_address"
        />
        <app-input
          v-model="formModel.contact_type"
          :label="t('inputFields.contactType')"
          :placeholder="t('inputFields.contactTypePlaceholder')"
          :rules="formRules.contact_type"
        />
      </div>
      <div>
        <div class="flex gap-x-2">
          <span
            class="flex items-center bg-[--success-color] text-white justify-center rounded-full h-6 w-6"
          >
            3
          </span>
          <span class="text-[--primary-second-color]">
            {{ t('registrationForm.projectInfo') }}
          </span>
        </div>
        <div class="border-t border-b">
          <div
            class="py-3 space-y-1 border-b last:border-none"
            v-for="(project, index) in formModel.projects"
            :key="project.id || project.uuid"
          >
            <div class="flex justify-between gap-x-4">
              <span class="space-x-2">
                <span>{{ project.type }}</span>
                <span
                  v-if="project.id"
                  class="text-[--warning-color] rounded-full px-2 py-1 text-[12px] font-medium bg-[--waring-light-color]"
                  >{{ project.id }}</span
                >
              </span>
              <span role="button" class="cursor-pointer" @click="handleDeleteProject(index)">
                <van-icon size="20" name="clear" color="#F5222D" />
              </span>
            </div>
            <div class="text-[--primary-second-color] text-[14px]" v-if="project.id">
              {{ project.name }}
            </div>
          </div>
          <div class="flex justify-between py-3 items-center">
            <button class="flex items-center gap-x-2">
              <van-icon name="add" size="20" color="#8D8BA7" />
              {{ t('registrationForm.addProject') }}
            </button>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="space-y-6">
        <div>
          <div class="flex gap-x-2">
            <span
              class="flex items-center bg-[--success-color] text-white justify-center rounded-full h-6 w-6"
            >
              4
            </span>
            <span class="text-[--primary-second-color]">
              {{ t('registrationForm.accompanyingPersonnelInfo') }}
            </span>
          </div>
        </div>
        <div>
          <div class="mb-1">
            <label class="text-[--primary-color] font-semibold text-[14px]">{{
              t('registrationForm.accompanyingPersonnelInfo')
            }}</label>
          </div>
          <div class="h-[56px] flex items-center bg-white rounded-full px-4 justify-between">
            <span class="text-[--primary-second-color]">
              {{ t('registrationForm.alreadySelect') }}
              {{ formModel.accompanying_count }}
              {{ t('registrationForm.person') }}
            </span>
            <van-stepper v-model="formModel.accompanying_count" min="1" />
          </div>
        </div>
      </div>
    </div>
  </van-form>
</template>

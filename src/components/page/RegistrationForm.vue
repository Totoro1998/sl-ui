<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from '@/hooks/useI18n'
import { useCountryStore } from '@/store/country'
import { useCommonStore } from '@/store/common'
import { computed, watch, ref } from 'vue'
import { useRegistrationStore } from '@/store/registration'
import useValidate from '@/hooks/useValidate'
import { requestPost } from '@/lib/request'
import { ORDER_TYPE, REQUEST_URL } from '@/lib/const'
import { useProjectsStore } from '@/store/projects'
import { omit } from 'lodash-es'
import AppInput from '../widgets/AppInput.vue'
import AppSelect from '@/components/widgets/AppSelect.vue'
import AppDatePicker from '@/components/widgets/AppDatePicker.vue'
import AppTelInput from '../widgets/AppTelInput.vue'
import AppLink from '../widgets/AppLink.vue'
import { useRouter } from 'vue-router'

const genderList = [
  {
    text: '男',
    value: 1
  },
  {
    text: '女',
    value: 2
  }
]
const props = defineProps(['type'])
const { t } = useI18n()
const router = useRouter()
const countryStore = useCountryStore()
const store = useRegistrationStore()
const { formModel } = storeToRefs(store)
const projectsStore = useProjectsStore()
const commonStore = useCommonStore()
const { projectSetting } = storeToRefs(projectsStore)
const { formRules } = useValidate(Object.keys(formModel.value))

const uploadFileId = ref('')

const country = computed(() => countryStore.country)
const isUser = computed(() => props.type === ORDER_TYPE.USER)
const shaolinTechniqueList = computed(() => commonStore.shaolinTechniqueList)

const projects = computed(() => {
  return projectSetting.value.project_id.map((id) => {
    const item = {}
    for (let i = 0; i < shaolinTechniqueList.value.length; i++) {
      const parent = shaolinTechniqueList.value[i]
      for (let j = 0; j < parent.children.length; j++) {
        const child = parent.children[j]
        if (child.id === id) {
          item.parentName = parent.text
          item.id = child.id
          item.name = child.text
          break
        }
      }
    }
    return item
  })
})
const afterRead = (file) => {
  const formData = new FormData()
  formData.append('file', file.file)
  requestPost(REQUEST_URL.UPLOAD_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    uploadFileId.value = res.data.hash
  })
}

const handleSubmit = () => {
  let params = { ...formModel.value, ...projectSetting.value }
  params.headimg = uploadFileId.value
  params.organize_info = {
    organize_name: params.organize_name,
    organize_head: params.organize_head,
    organize_address: params.organize_address,
    organize_contact: params.organize_contact
  }
  params = omit(params, ['organize_name', 'organize_head', 'organize_address', 'organize_contact'])
  if (isUser.value) {
    params.type = ORDER_TYPE.USER
    params.role = 'personal'
  } else {
    params.type = ORDER_TYPE.ORGANIZE
  }
  requestPost(REQUEST_URL.ORDER_SUBMIT, params).then((res) => {
    console.log(res)
  })
}

watch(
  country,
  () => {
    formModel.value.country = country.value.alpha3
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
              v-model="formModel.name"
              :label="t('inputFields.name')"
              :placeholder="t('inputFields.namePlaceholder')"
              :rules="formRules.name"
            />
            <app-input
              v-model="formModel.surname"
              :label="t('inputFields.surName')"
              :placeholder="t('inputFields.surNamePlaceholder')"
              :rules="formRules.surname"
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
            v-model="formModel.birth"
            :label="t('inputFields.birth')"
            :placeholder="t('inputFields.birthPlaceholder')"
            :rules="formRules.birth"
          />
        </div>
        <app-input
          :modelValue="country.en"
          :label="t('inputFields.countryOrRegion')"
          :placeholder="t('inputFields.countryOrRegionPlaceholder')"
          readonly
          is-link
          @click="router.push({ name: 'COUNTRY_REGION_LIST' })"
          :rules="formRules.country"
        />
        <app-input
          v-model="formModel.address"
          :label="t('inputFields.address')"
          :placeholder="t('inputFields.addressPlaceholder')"
          :rules="formRules.address"
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
          v-model="formModel.mobile"
          type="text"
          :label="t('inputFields.mobile')"
          :placeholder="t('inputFields.mobilePlaceholder')"
        />
        <app-select
          v-if="!isUser"
          v-model="formModel.role"
          :columns="genderList"
          :label="t('inputFields.role')"
          :placeholder="t('inputFields.rolePlaceholder')"
          :rules="formRules.role"
        ></app-select>
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
          v-model="formModel.organize_name"
          :label="t('inputFields.companyName')"
          :placeholder="t('inputFields.companyNamePlaceholder')"
          :rules="formRules.organize_name"
        />
        <app-input
          v-model="formModel.organize_head"
          :label="t('inputFields.contactPersonName')"
          :placeholder="t('inputFields.contactPersonNamePlaceholder')"
          :rules="formRules.organize_head"
        />
        <app-input
          v-model="formModel.organize_address"
          :label="t('inputFields.companyAddress')"
          :placeholder="t('inputFields.companyAddressPlaceholder')"
          :rules="formRules.organize_address"
        />
        <app-input
          v-model="formModel.organize_contact"
          :label="t('inputFields.contactType')"
          :placeholder="t('inputFields.contactTypePlaceholder')"
          :rules="formRules.organize_contact"
        />
      </div>
      <div class="space-y-6">
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
            v-for="(project, index) in projects"
            :key="project.id"
          >
            <div class="flex justify-between gap-x-4">
              <span class="space-x-2">
                <span>{{ project.parentName }}</span>
                <span
                  class="text-[--warning-color] rounded-full px-2 py-1 text-[12px] font-medium bg-[--waring-light-color]"
                  >{{ project.id }}</span
                >
              </span>
              <span
                role="button"
                class="cursor-pointer"
                @click="projectSetting.project_id.splice(index, 1)"
              >
                <van-icon size="20" name="clear" color="#F5222D" />
              </span>
            </div>
            <div class="text-[--primary-second-color] text-[14px]">
              {{ project.name }}
            </div>
          </div>
          <div
            class="py-3 space-y-1 border-b last:border-none"
            v-for="(project, index) in projectSetting.custom_project"
            :key="project"
          >
            <div class="flex justify-between gap-x-4">
              <span class="space-x-2">
                <span>{{ project }}</span>
              </span>
              <span
                role="button"
                class="cursor-pointer"
                @click="projectSetting.custom_project.splice(index, 1)"
              >
                <van-icon size="20" name="clear" color="#F5222D" />
              </span>
            </div>
          </div>
          <app-link class="flex justify-between py-3 items-center" to="/shaolin-techniques">
            <button class="flex items-center gap-x-2">
              <van-icon name="add" size="20" color="#8D8BA7" />
              {{ t('registrationForm.addProject') }}
            </button>
            <van-icon name="arrow" />
          </app-link>
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
              {{ formModel.entourage_num }}
              {{ t('registrationForm.person') }}
            </span>
            <van-stepper v-model="formModel.entourage_num" :min="0" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 flex justify-between items-center">
        <div class="flex flex-col gap-y-2">
          <span>
            {{ t('registrationForm.total') }}
            {{ formModel.entourage_num + 1 }}
            {{ t('registrationForm.person') }}
          </span>
          <span>
            <span class="font-bold font-base">{{ t('registrationForm.grandTotal') }}</span>
            <span class="text-[--warning-color]">${{ 50 * (formModel.entourage_num + 1) }}</span>
          </span>
        </div>
        <van-button native-type="submit" style="width: 100px" round color="#ff6418">{{
          t('registrationForm.payment')
        }}</van-button>
      </div>
    </div>
  </van-form>
</template>

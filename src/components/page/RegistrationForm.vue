<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from '@/hooks/useI18n'
import { useCountryStore } from '@/store/country'
import { useCommonStore } from '@/store/common'
import appCountryList from '@/lib/countries'
import { computed, watch, ref } from 'vue'
import { useRegistrationStore, DEFAULT_FORM_MODEL } from '@/store/registration'
import useValidate from '@/hooks/useValidate'
import { requestPost } from '@/lib/request'
import { ORDER_TYPE, REQUEST_URL, SEND_EMAIL_CODE_TYPE, STORAGE_KEY } from '@/lib/const'
import { useProjectsStore } from '@/store/projects'
import { pick } from 'lodash-es'
import AppInput from '../widgets/AppInput.vue'
import AppSelect from '@/components/widgets/AppSelect.vue'
import AppDatePicker from '@/components/widgets/AppDatePicker.vue'
import AppTelInput from '../widgets/AppTelInput.vue'
import { useRouter } from 'vue-router'
import { isEmptyData } from '@/lib/util'
import { REGISTRATION_STATUS } from '@/hooks/useRegistration'
import { useAuthStore } from '@/store/auth'
import LocalStorage from '@/lib/storage'

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

const props = defineProps({
  type: {
    default: ORDER_TYPE.USER
  },
  initData: {
    default: () => {}
  },
  isEdit: {
    default: true
  }
})
const authStore = useAuthStore()
const { t } = useI18n()
const router = useRouter()
const countryStore = useCountryStore()
const store = useRegistrationStore()
const projectsStore = useProjectsStore()
const commonStore = useCommonStore()
const { projectSetting } = storeToRefs(projectsStore)
const { formModel } = storeToRefs(store)
const { formRules } = useValidate(Object.keys(formModel.value))

const RegistrationFormRef = ref(null)

const country = computed(() => countryStore.country)
const isUser = computed(
  () =>
    props.type === ORDER_TYPE.USER ||
    (props.initData.role && props.initData.role.value === ORDER_TYPE.USER)
)
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
const statusValue = computed(() => {
  if (formModel.value.status) {
    return formModel.value.status.value
  }
  return ''
})
const notPaied = computed(() => {
  return !formModel.value.order_no || statusValue.value === REGISTRATION_STATUS.WAIT_SUBMIT
})

const afterRead = (file) => {
  const formData = new FormData()
  formData.append('file', file.file)
  requestPost(REQUEST_URL.UPLOAD_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    formModel.value.headimg = res.data.hash
  })
}
const handleSubmit = async (type, callback) => {
  await RegistrationFormRef.value.validate()
  if (formModel.value.order_no && type === 'payment') {
    router.push({
      name: 'PAYMENT',
      params: {
        id: formModel.value.order_no
      }
    })
    return
  }
  let params = { ...formModel.value, ...projectSetting.value }
  params.organize_info = {
    organize_name: params.organize_name,
    organize_head: params.organize_head,
    organize_address: params.organize_address,
    organize_contact: params.organize_contact
  }
  if (isUser.value) {
    params.type = ORDER_TYPE.USER
    params.role = 'personal'
  } else {
    params.type = ORDER_TYPE.ORGANIZE
  }
  params = pick(params, [
    'order_no',
    'role',
    'type',
    'headimg',
    'name',
    'surname',
    'gender',
    'birth',
    'country',
    'address',
    'email',
    'code',
    'mobile',
    'organize_info',
    'project_id',
    'custom_project',
    'organize_project_id',
    'entourage_num'
  ])

  if (!authStore.userInfo.email) {
    const sendEmailSetting = {
      email: params.email,
      data: params
    }
    LocalStorage.setItem(STORAGE_KEY.SEND_EMAIL, sendEmailSetting)
    requestPost(REQUEST_URL.SEND_EMAIL_CODE, {
      email: sendEmailSetting.email,
      type: SEND_EMAIL_CODE_TYPE.AUTH
    })
    router.push({
      name: 'SEND_EMAIL',
      params: {
        type: 'registration'
      }
    })
  } else {
    requestPost(REQUEST_URL.ORDER_SUBMIT, params).then((res) => {
      if (type !== 'edit') {
        router.push({
          name: 'PAYMENT',
          params: {
            id: res.data.orderId
          }
        })
      } else {
        callback()
      }
    })
  }
}
const handleSetValueFromInit = (value) => {
  if (!isEmptyData(value)) {
    formModel.value = {
      ...formModel.value,
      ...value,
      ...value.organize_info
    }
    const findItem = appCountryList.find((item) => item.value === value.country)
    countryStore.setCountry(findItem)
    formModel.value.fileList = [{ url: value.headimg.url }]
    formModel.value.headimg = value.headimg.hash
    projectSetting.value = {
      project_id: value ? value.projectInfo.map((item) => item.code) : [],
      custom_project: value ? value.custom_project : []
    }
  } else {
    formModel.value = DEFAULT_FORM_MODEL
  }
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
watch(
  () => props.initData,
  (value) => {
    handleSetValueFromInit(value)
  },
  { immediate: true }
)

defineExpose({ handleSubmit, handleSetValueFromInit })
</script>
<template>
  <van-form
    validate-trigger="onSubmit"
    ref="RegistrationFormRef"
    class="registration-form"
    :disabled="!isEdit"
    label-align="top"
  >
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
            <van-uploader
              :after-read="afterRead"
              max-count="1"
              :deletable="isEdit"
              v-model="formModel.fileList"
              :max-size="2 * 1024 * 1024"
            >
              <div class="flex flex-col items-center gap-6">
                <div
                  class="bg-[#8D8BA7] rounded-full w-[144px] h-[144px] flex items-center justify-center"
                >
                  <van-icon name="contact" color="white" size="77" />
                </div>
                <span class="text-[#86909C] text-xs">{{ t('registrationForm.maxFileSize') }}</span>
              </div>
            </van-uploader>
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
          :disabled="!isEdit"
          :country="country.alpha3"
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
                <span>{{ project.name }}</span>
                <span
                  class="text-[--warning-color] rounded-full px-2 py-1 text-[12px] font-medium bg-[--waring-light-color]"
                  >{{ project.id }}</span
                >
              </span>
              <span
                role="button"
                class="cursor-pointer"
                v-if="isEdit"
                @click="projectSetting.project_id.splice(index, 1)"
              >
                <van-icon size="20" name="clear" color="#F5222D" />
              </span>
            </div>
            <div class="text-[--primary-second-color] text-[14px]">
              {{ project.parentName }}
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
                v-if="isEdit"
                role="button"
                class="cursor-pointer"
                @click="projectSetting.custom_project.splice(index, 1)"
              >
                <van-icon size="20" name="clear" color="#F5222D" />
              </span>
            </div>
          </div>
          <div
            @click="router.push({ name: 'SHAOLIN_TECHNIQUES' })"
            :disabled="!isEdit"
            class="flex justify-between w-full py-3 items-center cursor-pointer"
          >
            <span class="flex items-center gap-x-2">
              <van-icon name="add" size="20" color="#8D8BA7" />
              {{ t('registrationForm.addProject') }}
            </span>
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
              {{ formModel.entourage_num }}
              {{ t('registrationForm.person') }}
            </span>
            <van-stepper :disabled="!isEdit" v-model="formModel.entourage_num" :min="0" />
          </div>
        </div>
      </div>
      <slot name="actionButton"></slot>
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
        <van-button
          :disabled="!notPaied"
          @click="handleSubmit('payment')"
          :style="{ width: '100px', color: notPaied ? 'white' : '#8D8BA7' }"
          round
          :color="notPaied ? '#ff6418' : '#D4D2E3'"
          >{{
            notPaied ? t('registrationForm.payment') : t('participantRegistrationDetail.paied')
          }}</van-button
        >
      </div>
    </div>
  </van-form>
</template>

<style lang="less">
.registration-form {
  .van-uploader .van-uploader__preview-image {
    width: 144px;
    height: 144px;
  }
}
</style>

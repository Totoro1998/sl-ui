<script setup>
import { useI18n } from '@/hooks/useI18n'
import { ref } from 'vue'
import { copyToClipboard } from '@/lib/util'
import CopyIcon from '@/assets/icons/copy.svg'
import DownloadIcon from '@/assets/icons/download.svg'
import PayCode from '@/assets/images/paycode.webp'
import { requestPost } from '@/lib/request'
import { REQUEST_URL } from '@/lib/const'
import { router } from '@/router'

const props = defineProps(['id'])
const uploadedList = ref([])
const fileList = ref([])
const paySetting = ref({
  amount: 50,
  email: 'test@gmail.com',
  account: 'slse',
  payee: 'test@china',
  registration_number: 'dfadf aef ad adfae',
  receiptImages: [],
  pay_code_src: PayCode
})
const { t } = useI18n()

const afterRead = (data) => {
  let uploadFileList = data
  if (!Array.isArray(uploadFileList)) {
    uploadFileList = [data]
  }
  uploadFileList.forEach((file) => {
    const formData = new FormData()
    formData.append('file', file.file)
    requestPost(REQUEST_URL.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      uploadedList.value.push({
        objectUrl: file.objectUrl,
        headimg: res.data.hash
      })
    })
  })
}
const handleSubmit = () => {
  const evidences = fileList.value.map((item) => {
    const fintItem = uploadedList.value.find((e) => e.objectUrl === item.objectUrl)
    return fintItem.headimg
  })
  requestPost(REQUEST_URL.SUBMIT_PAYINFO, {
    orderNo: props.id,
    evidences
  }).then((res) => {
    console.log(res)
    router.push({
      name: 'REGISTRATION_DETAIL',
      params: {
        id: props.id
      }
    })
  })
}
</script>
<template>
  <div class="w-full mx-auto max-w-[564px] pt-12 pb-8 px-6 space-y-6">
    <div class="flex flex-col gap-y-4 items-center justify-center">
      <span class="flex flex-col gap-y-2 items-center justify-center">
        <van-icon name="more" size="96" color="rgb(40, 120, 255)" />
        <span class="text-[--blue-primay-color] text-[12px] font-medium">
          {{ t('payment.toBePaid') }}
        </span>
        <span class="text-2xl font-semibold"> {{ `$${paySetting.amount}` }} </span>
      </span>
      <span class="font-semibold">{{ t('payment.tip') }}</span>
    </div>
    <div class="space-y-6">
      <div class="flex gap-x-2">
        <span
          class="flex items-center bg-[--success-color] text-white justify-center rounded-full h-6 w-6"
        >
          1
        </span>
        <span class="text-[--primary-second-color]">
          {{ t('payment.chooseAnyPaymentType') }}
        </span>
      </div>
      <div class="w-full bg-white py-4 px-6 rounded-full text-sm">
        {{ t('payment.chooseAnyPaymentTypeTip') }}
      </div>
      <div class="divide-y border-t border-b">
        <div class="py-3 flex gap-x-2 items-start">
          <div class="font-semibold text-[--primary-second-color] text-xl">01</div>
          <div class="flex-1 space-y-2">
            <div class="text-xl font-medium">{{ t('payment.payByEmail') }}</div>
            <div class="flex justify-between items-center text-[--primary-second-color] text-sm">
              <span>
                {{ paySetting.email }}
              </span>
              <span class="flex items-center gap-x-2">
                {{ t('payment.copyEmail') }}
                <van-image
                  class="cursor-pointer"
                  @click="copyToClipboard(paySetting.email)"
                  :src="CopyIcon"
                />
              </span>
            </div>
          </div>
        </div>
        <div class="py-3 flex gap-x-2 items-start">
          <div class="font-semibold text-[--primary-second-color] text-xl">02</div>
          <div class="flex-1 space-y-2">
            <div class="text-xl font-medium">{{ t('payment.payByPaypal') }}</div>
            <div class="flex justify-between items-center text-sm text-[--primary-second-color]">
              <span>
                {{ t('payment.account') }}
              </span>
              <span class="flex items-center gap-x-2">
                {{ paySetting.account }}
                <van-image
                  class="cursor-pointer"
                  @click="copyToClipboard(paySetting.account)"
                  :src="CopyIcon"
                />
              </span>
            </div>
            <div class="flex justify-between items-center text-sm text-[--primary-second-color]">
              <span>
                {{ t('payment.payee') }}
              </span>
              <span class="flex items-center gap-x-2">
                {{ paySetting.payee }}
                <van-image
                  class="cursor-pointer"
                  @click="copyToClipboard(paySetting.payee)"
                  :src="CopyIcon"
                />
              </span>
            </div>
          </div>
        </div>
        <div class="py-3 flex gap-x-2 items-start">
          <div class="font-semibold text-[--primary-second-color] text-xl">03</div>
          <div class="flex-1 space-y-2">
            <div class="text-xl font-medium">{{ t('payment.payByEmail') }}</div>
            <div class="flex justify-between items-end text-[--primary-second-color] text-sm">
              <van-Image height="96" width="96" :src="paySetting.pay_code_src" />
              <span class="flex items-center gap-x-2">
                {{ t('payment.saveToLocal') }}
                <van-image
                  class="cursor-pointer"
                  @click="copyToClipboard(paySetting.email)"
                  :src="DownloadIcon"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-6">
      <div class="flex gap-x-2">
        <span
          class="flex items-center bg-[--success-color] text-white justify-center rounded-full h-6 w-6"
        >
          2
        </span>
        <span class="text-[--primary-second-color]">
          {{ t('payment.paymentReference') }}
        </span>
      </div>
      <div class="w-full bg-white py-4 px-6 rounded-full text-sm">
        {{ t('payment.chooseAnyPaymentTypeTip') }}
      </div>
      <div class="divide-y border-t border-b">
        <div class="py-3 flex gap-x-2 items-start">
          <div class="flex-1 space-y-2">
            <div class="text-[--primary-second-color] font-medium">
              {{ t('payment.registrationNumber') }}
            </div>
            <div class="flex justify-between items-center text-sm">
              <span>
                {{ paySetting.registration_number }}
              </span>
              <span class="flex items-center text-[--primary-second-color] gap-x-2">
                {{ t('payment.copy') }}
                <van-image
                  class="cursor-pointer"
                  @click="copyToClipboard(paySetting.registration_number)"
                  :src="CopyIcon"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-6">
      <div class="flex gap-x-2">
        <span
          class="flex items-center bg-[--success-color] text-white justify-center rounded-full h-6 w-6"
        >
          3
        </span>
        <span class="text-[--primary-second-color]">
          {{ t('payment.uploadReceipt') }}
        </span>
      </div>
      <div class="w-full bg-white py-4 px-6 rounded-full text-sm">
        {{ t('payment.uploadReceiptTip') }}
      </div>
      <div class="divide-y border-t border-b">
        <div class="py-3 flex gap-x-2 items-start">
          <div class="flex-1 space-y-2">
            <van-uploader v-model="fileList" :max-count="3" multiple :after-read="afterRead" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex items-center justify-center">
      <van-button
        round
        color="#ff6418"
        style="width: 200px"
        class="rounded-full"
        @click="handleSubmit"
        >{{ t('payment.finishPayment') }}</van-button
      >
    </div>
  </div>
</template>

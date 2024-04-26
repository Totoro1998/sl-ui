<script setup>
import { REQUEST_URL } from '@/lib/const'
import { requestGet } from '@/lib/request'

const props = defineProps(['id'])
requestGet(`${REQUEST_URL.ORDER_DETAIL}?orderNo=${props.id}`).then((res) => {
  console.log(res)
})
</script>
<template>
  <div>fuck</div>
</template>

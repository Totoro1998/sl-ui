<script setup>
import countryList from '@/assets/country.json'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { groupBy, sortBy } from 'lodash-es'
import AppIndexBar from '@/components/widgets/AppIndexBar.vue'
import { useCountryStore } from '@/store/country'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const countryStore = useCountryStore()
const router = useRouter()

const search = ref('')

const filteredCountryList = computed(() => {
  return countryList.filter(
    (country) => country.en.toUpperCase().includes(search.value.toUpperCase()) || !search.value
  )
})
const indexBarList = computed(() => {
  const groupedData = groupBy(filteredCountryList.value, (item) => item.en.charAt(0))
  for (const key in groupedData) {
    groupedData[key] = sortBy(groupedData[key], 'en')
  }
  const list = []
  Object.keys(groupedData).forEach((item) => {
    list.push({
      key: item,
      items: groupedData[item]
    })
  })
  return list
})

const handleClick = (item) => {
  countryStore.setCountry(item)
  search.value = ''
  router.back()
}
</script>
<template>
  <div class="register w-full mx-auto lg:w-[556px] pt-12 pb-8 space-y-8">
    <div class="text-center">
      <h1 class="text-3xl text-[--primary-color]">{{ t('inputFields.countryOrRegion') }}</h1>
    </div>
    <van-search
      v-model="search"
      :placeholder="t('inputFields.countryOrRegionPlaceholder')"
      shape="round"
      class="app-search"
    />
    <AppIndexBar :bar-list="indexBarList" @click-item="handleClick">
      <template #barItem="{ item }">
        <span>{{ item.en }}</span>
      </template>
    </AppIndexBar>
  </div>
</template>

<style lang="less">
.app-search {
  height: 64px;
  .van-search__content {
    background-color: white;
  }
}
</style>

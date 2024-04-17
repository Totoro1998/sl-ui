<script setup>
import countryList from '@/assets/country.json'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { groupBy, sortBy } from 'lodash-es'
import AppIndexBar from '@/components/widgets/AppIndexBar.vue'

const { t } = useI18n()

const search = ref('')

const filteredCountryList = computed(() => {
  return countryList.filter((country) => country.en.includes(search.value) || !search.value)
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
</script>
<template>
  <div class="register w-full mx-auto max-w-[556px] pt-12 pb-8 space-y-8">
    <div class="text-center">
      <h1 class="text-3xl text-[--primary-color]">{{ t('inputFields.countryOrRegion') }}</h1>
    </div>
    <van-search
      v-model="search"
      :placeholder="t('inputFields.countryOrRegionPlaceholder')"
      shape="round"
      class="app-search"
    />
    <AppIndexBar :bar-list="indexBarList">
      <template #barItem="{ item }">
        <span>{{ item.en }}</span>
      </template>
    </AppIndexBar>
  </div>
</template>

<style lang="less">
.app-search {
  background-color: transparent;
  height: 64px;
  .van-search__content {
    background-color: white;
  }
}
</style>

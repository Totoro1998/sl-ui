<script setup>
import { ref } from 'vue'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import { useI18n } from '@/hooks/useI18n'
import { computed } from 'vue'
import AppInput from '@/components/widgets/AppInput.vue'
import { intersection } from 'lodash-es'

const { t } = useI18n()
const items = ref([
  {
    text: '浙江',
    children: [
      { text: '杭州', id: 1 },
      { text: '温州', id: 2 },
      { text: '宁波', id: 3, disabled: true }
    ]
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: 4 },
      { text: '无锡', id: 5 },
      { text: '徐州', id: 6 }
    ]
  },
  { text: '福建', disabled: true, children: [] }
])
const activeIds = ref([1, 2])
const activeIndex = ref(0)
const tab = ref('sl')

const search = ref('')

const addText = ref('')

const addedList = ref([])

const isSlTab = computed(() => tab.value === 'sl')

const tabList = computed(() => {
  return [
    {
      text: t('slTechniques.slTechniques'),
      value: 'sl'
    },
    {
      text: t('slTechniques.notSlTechniques'),
      value: 'not-sl'
    }
  ]
})

const displayItems = computed(() => {
  const searchValue = search.value
  let filterItems = items.value
    .map((item) => {
      return {
        ...item,
        children: item.children.filter(
          (c) =>
            !searchValue ||
            c.text.toLowerCase().includes(searchValue.toLowerCase()) ||
            `${c.id}` === `${searchValue}`
        )
      }
    })
    .filter((f) => f.children.length !== 0)
  filterItems = filterItems.map((item) => {
    const count = intersection(
      activeIds.value,
      item.children.map((c) => c.id)
    ).length
    if (count) {
      item.badge = count
    }
    return item
  })
  return filterItems
})

const currentTreeItem = computed(() => {
  return displayItems.value[activeIndex.value]
})

const handleAddByManual = () => {
  const addTextValue = addText.value
  if (!addTextValue.trim()) {
    return
  }
  if (addedList.value.includes(addTextValue)) {
    return
  }
  addedList.value.push(addTextValue)
}
</script>
<template>
  <BaseContentLayout :title="t('slTechniques.title')" class="space-y-4">
    <div class="tab grid grid-cols-2 rounded-lg bg-[--tab-not-active-bg-color] p-[2px]">
      <div
        v-for="tabItem in tabList"
        :key="tabItem.value"
        @click="tab = tabItem.value"
        :class="{
          'font-medium rounded-lg cursor-pointer h-[40px] flex items-center justify-center text-center': true,
          'bg-white': tab === tabItem.value
        }"
      >
        {{ tabItem.text }}
      </div>
    </div>
    <template v-if="isSlTab">
      <van-search
        v-model="search"
        :placeholder="t('slTechniques.searchPlaceholder')"
        shape="round"
        class="app-search"
      />
      <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="displayItems"
      >
        <template #content>
          <div
            v-for="item in currentTreeItem.children"
            :key="item.id"
            class="flex gap-x-2 justify-between px-6 py-4"
          >
            <span class="font-bold flex items-center gap-x-2">
              <span
                :class="{
                  'flex items-center gap-x-2 rounded-full px-2 py-1 text-[12px] font-medium bg-[#F2F1FA] text-[#8D8BA7]': true,
                  'bg-[--waring-light-color] text-[#FF6418]': activeIds.includes(item.id)
                }"
                >{{ item.id }}</span
              >
              <span :class="{ 'text-[#31cc80] font-semibold': activeIds.includes(item.id) }">{{
                item.text
              }}</span>
            </span>
            <span>
              <van-icon
                color="#31cc80"
                size="20"
                v-if="activeIds.includes(item.id)"
                name="checked"
              />
              <van-icon size="20" v-else name="circle" />
            </span>
          </div>
        </template>
      </van-tree-select>
    </template>

    <div class="border-t border-b py-6 space-y-2" v-show="!isSlTab">
      <p>{{ t('slTechniques.inputOtherName') }}</p>
      <span class="flex gap-x-2 items-center slgf-wrapper">
        <app-input v-model="addText" :placeholder="t('slTechniques.inputPlaceholder')" />
        <van-button
          color="#ff6418"
          round
          style="width: 100px; height: 32px"
          @click="handleAddByManual"
          >{{ t('slTechniques.add') }}</van-button
        >
      </span>
    </div>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(addItem, index) in addedList"
        :key="addItem"
        class="text-[--warning-color] flex items-center gap-x-2 rounded-full px-2 py-1 text-[12px] font-medium bg-[--waring-light-color]"
      >
        {{ addItem }}

        <van-icon name="cross" @click="addedList.splice(index, 1)" />
      </span>
    </div>
  </BaseContentLayout>
</template>

<style lang="less" scoped>
.app-search {
  padding: 0;
}
.slgf-wrapper {
  .app-input {
    background-color: transparent;
    padding: 0;
  }
  .van-field__value {
    background-color: transparent;
  }
}
</style>

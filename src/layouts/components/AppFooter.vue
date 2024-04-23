<script setup>
import Logo from '@/assets/icons/Logo.svg'
import Facebook from '@/assets/icons/Facebook.svg'
import Twitter from '@/assets/icons/Twitter.svg'
import Instagram from '@/assets/icons/Instagram.svg'
import LinkedIn from '@/assets/icons/LinkedIn.svg'
import YouTube from '@/assets/icons/YouTube.svg'
import AppLink from '@/components/widgets/AppLink.vue'
import { useI18n } from '@/hooks/useI18n'

const imageList = [
  { src: Facebook, alt: 'Facebook' },
  { src: Twitter, alt: 'Twitter' },
  { src: Instagram, alt: 'Instagram' },
  { src: LinkedIn, alt: 'LinkedIn' },
  { src: YouTube, alt: 'YouTube' }
]
const linkList = [
  {
    title: '关于2024考功大赛',
    items: [
      {
        title: '主办方：xxx',
        href: '/'
      },
      {
        title: '承办方：xxx',
        href: '/'
      },
      {
        title: '平台支持：xxx',
        href: '/'
      }
    ]
  },
  {
    title: '参赛',
    items: [
      {
        title: '报道',
        href: '/'
      },
      {
        title: '研讨会',
        href: '/'
      },
      {
        title: '总决赛',
        href: '/'
      }
    ]
  },
  {
    title: '报名入口',
    items: [
      {
        title: '参赛选手报名',
        href: '/'
      },
      {
        title: '参赛机构报名',
        href: '/'
      },
      {
        title: '2024功夫之星名单',
        href: '/'
      }
    ]
  },
  {
    title: '下载',
    items: [
      {
        title: '2024考功大赛规程',
        href: '/'
      },
      {
        title: '2024考功大赛风险告知书',
        href: '/'
      },
      {
        title: '2024考功大赛规则',
        href: '/'
      },
      {
        title: '2024考功大赛项目表',
        href: '/'
      }
    ]
  }
]

const { t } = useI18n()
</script>

<template>
  <footer class="lg:px-[154px] bg-[#E7E6F2]">
    <div class="max-w-[--max-content-width] m-auto">
      <div
        class="flex border-b border-b-[#D4D2E3] flex-col gap-y-6 gap-x-6 px-6 lg:flex-row justify-between py-[48px] lg:py-[60px]"
      >
        <div class="flex flex-col gap-y-4 items-center">
          <img :src="Logo" alt="logo" />
          <app-link to="/" class="text-[--warning-color] underline">
            {{ t('common.slOfficialWebsite') }}
          </app-link>
          <div class="gap-x-4 items-center hidden lg:flex">
            <span
              v-for="item in imageList"
              :key="item.alt"
              class="flex h-9 w-9 rounded-md items-center justify-center bg-[#E7E6F2]"
            >
              <img :src="item.src" :alt="item.alt" />
            </span>
          </div>
        </div>
        <div v-for="link in linkList" :key="link.title">
          <div class="text-[--primary-color] text-xl font-semibold mb-6">{{ link.title }}</div>
          <div class="flex flex-col space-y-4">
            <a
              class="text-[--primary-second-color] text-base"
              v-for="item in link.items"
              :key="item.title"
              :href="item.href"
            >
              {{ item.title }}
            </a>
          </div>
        </div>
        <div class="flex gap-x-4 items-center justify-center lg:hidden">
          <span
            v-for="item in imageList"
            :key="item.alt"
            class="flex h-9 w-9 rounded-md items-center justify-center bg-[#E7E6F2]"
          >
            <img :src="item.src" :alt="item.alt" />
          </span>
        </div>
      </div>
      <div class="text-[--primary-second-color] text-center border-t py-6 px-6">
        Copyright © 2009-now Shaolin Temple . All rights reserved 豫ICP备13016364号-1
      </div>
    </div>
  </footer>
</template>

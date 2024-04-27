<template>
  <section class="medal-wrapper" :style="{ '--bg-url': medalBgSrc }">
    <div class="top-block wow animated fadeInUp">
      <img :src="medalTopSrc" class="top-block--icon" />
      <div class="top-title">{{ t('homeMedalSection.title') }}</div>
      <div class="top-tips">{{ t('homeMedalSection.tips') }}</div>
    </div>
    <div class="medal-list">
      <div class="medal-list--item wow animated fadeInUp">
        <img :src="medalIcon1" class="medal-icon" />
        <div class="medal-label">{{ t('homeMedalSection.medalA') }}</div>
      </div>
      <div class="medal-list--item wow animated fadeInUp">
        <img :src="medalIcon2" class="medal-icon" />
        <div class="medal-label">{{ t('homeMedalSection.medalB') }}</div>
      </div>
      <div class="medal-list--item wow animated fadeInUp">
        <img :src="medalIcon3" class="medal-icon" />
        <div class="medal-label">{{ t('homeMedalSection.medalC') }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '@/hooks/useI18n'
import medalBg from '@/assets/images/home-medal-bg.png'
import medalTopSrc from '@/assets/images/home-medal-1.png'
import medalIcon1 from '@/assets/images/home-medal-2.png'
import medalIcon2 from '@/assets/images/home-medal-3.png'
import medalIcon3 from '@/assets/images/home-medal-4.png'

const { t } = useI18n()
const medalBgSrc = computed(() => `url(${medalBg})`)
</script>

<style lang="less" scoped>
.medal-wrapper {
  width: 100%;
  padding: 175px 110px;
  background-image: var(--bg-url);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
}

.top-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  margin-bottom: 150px;

  .top-block--icon {
    width: 166px;
    height: 455px;
    object-fit: contain;
    margin-bottom: 90px;
  }
  .top-title {
    font-size: 48px;
    font-weight: bold;
  }
  .top-tips {
    font-size: 24px;
    color: #ffffff;
  }
}

.medal-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 70px;

  .medal-icon {
    width: 360px;
    height: 510px;
    object-fit: contain;
    margin-bottom: 27px;
  }
  .medal-label {
    text-align: center;
    font-size: 36px;
    color: #ffffff;
  }
}

@media screen and (max-width: 750px) {
  .medal-wrapper {
    padding: 32px 22px;
  }
  .top-block {
    margin-bottom: 40px;
    .top-block--icon {
      width: 120px;
      height: 280px;
      margin-bottom: 30px;
    }
    .top-title {
      text-align: center;
      line-height: 44px;
      font-size: 38px;
      margin-bottom: 12px;
    }
  }
  .medal-list {
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 22px;
    .medal-icon {
      height: 390px;
      margin-bottom: 22px;
      margin: 0 auto 12px;
    }
    .medal-label {
      font-size: 28px;
    }
  }
}
</style>

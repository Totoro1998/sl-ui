<template>
  <section class="banner-wrapper" :style="{ '--bg-url': bannerSrc }">
    <div class="header-wrapper wow animated fadeInUp">
      <div class="header-nav">
        <a href="/" class="header-nav--link">{{ t('homeNavBarSection.home') }}</a>
        <a href="#schedule" class="header-nav--link">{{ t('homeNavBarSection.schedule') }}</a>
        <a href="#sign-up-notice" class="header-nav--link">{{ t('homeNavBarSection.signUp') }}</a>
      </div>
      <img :src="logoSrc" alt="logo" class="header-logo" />
      <div class="header-link">
        <router-link class="header-link--btn" to="#">
          {{ t('homeNavBarSection.donation') }}
        </router-link>
      </div>
    </div>

    <div class="banner-content wow animated fadeInUp">
      <div class="content-title">{{ t('homeBannerSection.titleLineOne') }}</div>
      <div class="content-title">{{ t('homeBannerSection.titleLineSecond') }}</div>
      <div class="content-position">
        <van-icon name="location-o" style="margin-right: 10px" />
        <span>{{ t('homeBannerSection.position') }}</span>
      </div>
      <div class="content-link">
        <router-link class="link-item" to="#">
          {{ t('homeBannerSection.competitorsEnter') }} →
        </router-link>
        <div class="gap-block"></div>
        <router-link class="link-item active" to="#">
          {{ t('homeBannerSection.coach') }} →
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import logoSrc from '@/assets/icons/Logo.svg'
import banner from '@/assets/images/home-banner.png'

import { useI18n } from '@/hooks/useI18n'

const { t } = useI18n()
const bannerSrc = computed(() => `url(${banner})`)
</script>

<style lang="less" scoped>
.banner-wrapper {
  position: relative;
  width: 100%;
  min-height: 903px;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  background-image: var(--bg-url);

  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
    z-index: 0;
  }

  .header-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 120px;
  }

  .header-nav {
    flex: 1;
  }

  .header-logo {
    height: 72px;
    object-fit: contain;
  }

  .header-link {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    &:last-child {
      margin-right: 0;
    }

    .header-link--btn {
      font-size: 16px;
      padding: 18px 74px;
      color: #fff;
      background-color: var(--app-color-primary);
      border-radius: 30px;
    }
  }

  .header-nav--link {
    display: inline-block;
    margin-right: 30px;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
    &:hover {
      color: var(--app-color-primary);
    }
  }

  .banner-content {
    position: relative;
    z-index: 1;
    padding-top: 40px;
    text-align: center;

    .content-title {
      font-size: 72px;
      color: #fff;
      font-weight: bold;
      line-height: 96px;
    }

    .content-position {
      color: #fff;
      font-size: 18px;
      margin: 20px 0 41px 0;
    }
    .location-o {
      font-size: 16px;
    }

    .content-link {
      display: flex;
      justify-content: center;

      .gap-block {
        width: 24px;
      }
      .link-item {
        min-width: 233px;
        display: inline-block;
        padding: 24px;
        border-radius: 40px;
        font-size: 18px;
        color: #fff;
        background-color: var(--app-color-primary);

        &.active {
          background-color: #fff;
          color: var(--app-color-primary);
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .banner-wrapper {
    min-height: calc(100vh - 64px);
    .header-wrapper {
      padding: 22px;

      .header-nav--link {
        font-size: 16px;
        margin-right: 10px;
      }
      .header-logo {
        height: 45px;
      }

      .header-link {
        .header-link--btn {
          padding: 8px 24px;
          line-height: 1;
        }
      }
    }

    .banner-content {
      padding-top: 22px;
      .content-title {
        padding: 0 22px;
        font-size: 36px;
        line-height: 60px;
      }
      .content-position {
        font-size: 16px;
      }
      .content-link {
        display: block;
        .link-item {
          font-size: 16px;
          padding: 14px 18px;
          min-width: 350px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>

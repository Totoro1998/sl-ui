<template>
  <section class="partners-wrapper">
    <div class="partners-title wow animated fadeInUp">{{ t('homePartnersSection.title') }}</div>
    <div class="partners-icons wow animated fadeInUp">
      <img :src="Google" alt="Google" />
      <img :src="Facebook" alt="Facebook" />
      <img :src="YouTube" alt="YouTube" />
      <img :src="Pinterest" alt="Pinterest" />
      <img :src="Twitch" alt="Twitch" />
      <img :src="Webflow" alt="Webflow" />
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '@/hooks/useI18n'
import Google from '@/assets/images/Google.png'
import Facebook from '@/assets/images/Facebook.png'
import YouTube from '@/assets/images/YouTube.png'
import Pinterest from '@/assets/images/Pinterest.png'
import Twitch from '@/assets/images/Twitch.png'
import Webflow from '@/assets/images/Webflow.png'

const { t } = useI18n()
</script>

<style lang="less" scoped>
.partners-wrapper {
  padding: 95px 110px 122px;
  background-color: #fff;
}

.partners-title {
  text-align: center;
  font-size: 48px;
  color: #251715;
  line-height: 56px;
  font-weight: bold;
  margin-bottom: 52px;
}

.partners-icons {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 90px;

  img {
    object-fit: contain;
  }
}

@media screen and (max-width: 750px) {
  .partners-wrapper {
    padding: 32px 22px;

    .partners-title {
      font-size: 34px;
      margin-bottom: 22px;
      line-height: 44px;
    }

    .partners-icons {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 22px;
      grid-row-gap: 22px;

      img {
        margin: 0 auto;
      }
    }
  }
}
</style>

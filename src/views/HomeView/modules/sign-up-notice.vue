<template>
  <section class="sign-up-wrapper">
    <img :src="imgSrc" alt="sign-up-notice" class="sign-up-img wow animated fadeInUp" />
    <div class="sign-content wow animated fadeInUp">
      <div class="content-title">{{ t('homeSignUpSection.title') }}</div>
      <div class="content-date">
        {{ t('homeSignUpSection.actionDate') }} - {{ t('homeSignUpSection.endDate') }}
      </div>
      <div class="content-desc">
        <div class="content-desc--title">{{ t('homeSignUpSection.contentTitle') }}</div>
        <div class="content-desc--tips" v-replace-newline="t('homeSignUpSection.content')"></div>
      </div>
      <router-link to="#" class="sign-btn">{{ t('homeSignUpSection.clickBtnText') }}</router-link>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '@/hooks/useI18n'
import vReplaceNewline from '@/directive/replace-newline'
import imgSrc from '@/assets/images/home-sign-up-notice.png'

const { t } = useI18n()
</script>

<style lang="less" scoped>
.sign-up-wrapper {
  display: flex;
  padding: 110px;
  background-color: #fff;
}

.sign-up-img {
  width: 510px;
  height: 630px;
  object-fit: contain;
  margin-right: 132px;
}

.sign-content {
  .content-title {
    font-size: 48px;
    font-weight: bold;
    color: #251715;
    line-height: 56px;
    margin-bottom: 10px;
  }
  .content-date {
    font-size: 24px;
    color: #7d8398;
    margin-bottom: 38px;
  }
  .content-desc {
    width: 555px;
    height: 335px;
    display: flex;
    flex-direction: column;
    background: #f2f2f7;
    border-radius: 24px;
    padding: 38px;
    margin-bottom: 57px;
    overflow: hidden;

    .content-desc--title {
      font-size: 32px;
      color: #251715;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .content-desc--tips {
      flex: 1;
      overflow-y: auto;
    }
  }

  .sign-btn {
    display: block;
    width: 300px;
    color: #fff;
    font-weight: 700;
    padding: 24px;
    text-align: center;
    background-color: var(--app-color-primary);
    border-radius: 40px;
  }
}

@media screen and (max-width: 750px) {
  .sign-up-wrapper {
    display: block;
    padding: 32px 22px;

    .sign-up-img {
      width: 100%;
      height: 420px;
      object-fit: cover;
      margin: 0 auto 22px;
    }

    .sign-content {
      .content-title {
        font-size: 38px;
        line-height: 44px;
      }
      .content-date {
        font-size: 22px;
        margin-bottom: 22px;
      }
      .content-desc {
        width: 100%;
        padding: 22px;
        margin-bottom: 22px;
        .content-desc--title {
          font-size: 28px;
          margin-bottom: 12px;
        }
      }
      .sign-btn {
        margin: 0 auto;
        padding: 22px;
      }
    }
  }
}
</style>

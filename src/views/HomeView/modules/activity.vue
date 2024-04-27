<template>
  <section class="activity-wrapper">
    <div class="card-item">
      <img :src="actorAvatar" alt="" class="card-item--avatar wow animated fadeInUp" />
      <div class="card-content">
        <div class="card-item--title wow animated fadeInUp">
          <span>{{ t('homeActivitySection.title') }}</span>
          <img :src="SymbolIcon" class="symbol-icon" />
        </div>
        <div class="card-item--desc wow animated fadeInUp">
          <span>{{ t('homeActivitySection.description') }}</span>
        </div>
        <div class="card-item--actor wow animated fadeInUp">
          {{ t('homeActivitySection.actor') }}
        </div>
        <div class="card-item--position wow animated fadeInUp">
          {{ t('homeActivitySection.position') }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '@/hooks/useI18n'
import actorAvatar from '@/assets/images/home-activity.png'
import SymbolIcon from '@/assets/images/home-symbol.png'

const { t } = useI18n()
</script>

<style lang="less" scoped>
.activity-wrapper {
  padding: 60px 110px;
  background: #f2f2f7;

  .card-item {
    width: 100%;
    height: 491px;
    display: flex;
    .card-item--avatar {
      width: 566px;
      height: 100%;
      object-fit: contain;
    }
    .card-content {
      position: relative;
      background-color: #fff;
      border-radius: 0 24px 24px 0;
      padding: 69px 83px 0;

      .card-item--title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 48px;
        color: #251715;
        line-height: 56px;
        font-weight: bold;
        margin-bottom: 20px;

        .symbol-icon {
          display: inline-block;
          width: 46px;
          height: 41px;
        }
      }

      .card-item--desc {
        font-size: 18px;
        color: #5d5a88;
        line-height: 30px;
        margin-bottom: 33px;
      }
      .card-item--actor {
        font-size: 20px;
        font-weight: bold;
        color: #5d5a88;
        margin-bottom: 16px;
      }
      .card-item--position {
        font-size: 20px;
        color: #8d8ba7;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .activity-wrapper {
    padding: 32px 22px;

    .card-item {
      display: block;
      height: auto;

      .card-content {
        padding: 22px;
        margin-top: 22px;
        border-radius: 22px;

        .card-item--title {
          font-size: 38px;
        }
        .card-item--desc {
          font-size: 16px;
          margin-bottom: 22px;
        }
        .card-item--actor {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .card-item--position {
          font-size: 18px;
        }
      }
    }
  }
}
</style>

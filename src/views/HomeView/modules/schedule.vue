<template>
  <section class="schedule-wrapper">
    <div class="title-wrapper wow animated fadeInUp">
      <div class="title-label">{{ t('homeScheduleSection.title') }}</div>
      <div class="title-tips">
        {{ t('homeScheduleSection.actionDate') }} - {{ t('homeScheduleSection.endDate') }}
      </div>
    </div>
    <div class="plan-list">
      <div
        :class="['plan-list--item wow animated fadeInUp', { active: activeIndex === 'A' }]"
        @click="changeSelected('A')"
      >
        <img :src="activeIndex === 'A' ? planASelectedSrc : planASrc" class="list-item--icon" />
        <div class="list-item--label">
          {{ t('homeScheduleSection.planA') }}
        </div>
        <div class="list-item--date">{{ t('homeScheduleSection.planADate') }}</div>
      </div>
      <div
        :class="['plan-list--item wow animated fadeInUp', { active: activeIndex === 'B' }]"
        @click="changeSelected('B')"
      >
        <img :src="activeIndex === 'B' ? planBSelectedSrc : planBSrc" class="list-item--icon" />
        <div class="list-item--label">
          {{ t('homeScheduleSection.planB') }}
        </div>
        <div class="list-item--date">{{ t('homeScheduleSection.planBDate') }}</div>
      </div>
      <div
        :class="['plan-list--item wow animated fadeInUp', { active: activeIndex === 'C' }]"
        @click="changeSelected('C')"
      >
        <img :src="activeIndex === 'C' ? planCSelectedSrc : planCSrc" class="list-item--icon" />
        <div class="list-item--label">
          {{ t('homeScheduleSection.planC') }}
        </div>
        <div class="list-item--date">{{ t('homeScheduleSection.planCDate') }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '@/hooks/useI18n'
import planASelectedSrc from '@/assets/images/home-schedule-icon-1.png'
import planASrc from '@/assets/images/home-schedule-icon-1.1.png'
import planBSelectedSrc from '@/assets/images/home-schedule-icon-2.png'
import planBSrc from '@/assets/images/home-schedule-icon-2.1.png'
import planCSelectedSrc from '@/assets/images/home-schedule-icon-3.png'
import planCSrc from '@/assets/images/home-schedule-icon-3.1.png'

const { t } = useI18n()

const activeIndex = ref('A')
function changeSelected(index) {
  activeIndex.value = index
}
</script>

<style lang="less" scoped>
.schedule-wrapper {
  padding: 86px 110px;
  background-color: #fff;
}

.title-wrapper {
  margin-bottom: 48px;
  .title-label {
    font-size: 48px;
    font-weight: bold;
    color: #251715;
    line-height: 56px;
    margin-bottom: 10px;
  }
  .title-tips {
    font-size: 24px;
    color: #7d8398;
    line-height: 28px;
  }
}

.plan-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-left: 1px solid #d4d2e3;

  .plan-list--item {
    padding: 40px 33px;
    border: 1px solid #d4d2e3;
    border-left: none;

    .list-item--icon {
      width: 60px;
      height: 60px;
      object-fit: contain;
      margin-bottom: 38px;
    }
    .list-item--label {
      font-size: 32px;
      font-weight: bold;
      color: #251715;
      line-height: 20px;
      margin-bottom: 22px;
    }
    .list-item--date {
      font-size: 24px;
      color: #7d8398;
      line-height: 18px;
    }

    &.active {
      background-color: var(--app-color-primary);
      border-color: var(--app-color-primary);
      .list-item--label,
      .list-item--date {
        color: #fff;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .schedule-wrapper {
    padding: 32px 22px;

    .title-wrapper {
      margin-bottom: 22px;
      .title-label {
        font-size: 38px;
        line-height: 48px;
      }
      .title-tips {
        font-size: 18px;
      }
    }
    .plan-list {
      display: block;
      .plan-list--item {
        padding: 22px;

        .list-item--icon {
          width: 40px;
          height: 40px;
          margin-bottom: 22px;
        }
        .list-item--label {
          font-size: 26px;
        }
        .list-item--date {
          font-size: 20px;
        }
      }
    }
  }
}
</style>

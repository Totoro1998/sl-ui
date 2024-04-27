<template>
  <section class="time-block__wrapper">
    <div class="left-content wow animated fadeInUp">
      <div class="left-title">{{ t('homeTimeBlockSection.title') }}</div>
      <div class="left-tips">
        <van-icon name="notes-o mr-[8px]" />
        <span class="">{{ t('homeTimeBlockSection.date') }}</span>
      </div>
    </div>
    <div class="right-content wow animated fadeInUp">
      <div class="item-block">
        <span class="item-block--value">{{ dateMap.days }}</span>
        <span class="item-block--tips">{{ t('homeTimeBlockSection.days') }}</span>
      </div>
      <div class="item-block">
        <span class="item-block--value">{{ dateMap.hour }}</span>
        <span class="item-block--tips">{{ t('homeTimeBlockSection.hour') }}</span>
      </div>
      <div class="item-block">
        <span class="item-block--value">{{ dateMap.minute }}</span>
        <span class="item-block--tips">{{ t('homeTimeBlockSection.minute') }}</span>
      </div>
      <div class="item-block">
        <span class="item-block--value">{{ dateMap.second }}</span>
        <span class="item-block--tips">{{ t('homeTimeBlockSection.second') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { reactive, onBeforeUnmount } from 'vue'
import { useI18n } from '@/hooks/useI18n'

dayjs.extend(duration)
const { t } = useI18n()

const targetDate = '2024/07/15 00:00:00'
const dateMap = reactive({
  days: 0,
  hour: 0,
  minute: 0,
  second: 0
})

function calculateRemainingTime() {
  const now = dayjs() // 获取当前时间
  const _target = dayjs(targetDate)
  const duration = dayjs.duration(_target.diff(now)) // 计算时间差

  // 从时间差中提取天数、小时、分钟和秒数
  dateMap.days = duration.days()
  dateMap.hour = duration.hours()
  dateMap.minute = duration.minutes()
  dateMap.second = duration.seconds()
}

let timer = setInterval(calculateRemainingTime, 1000)

onBeforeUnmount(() => {
  clearInterval(timer)
  timer = null
})
</script>

<style lang="less" scoped>
.time-block__wrapper {
  display: flex;
  align-items: center;
  height: 362px;
  background-color: var(--app-color-primary);
}

.left-content {
  color: #ffffff;
  padding-left: 110px;

  .left-title {
    font-weight: bold;
    font-size: 36px;
    margin-bottom: 22px;
  }
  .left-tips {
    font-weight: bold;
    font-size: 24px;
  }
}

.right-content {
  display: flex;
  align-items: center;
  padding-left: 223px;

  .item-block {
    margin-right: 40px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item-block--value {
    width: 120px;
    display: block;
    margin-bottom: 10px;
    background: #ffffff;
    border-radius: 12px;
    font-size: 44px;
    line-height: 50px;
    padding: 35px 0;
    text-align: center;
    color: var(--app-color-primary);
  }
  .item-block--tips {
    font-size: 24px;
    color: #ffffff;
  }
}

@media screen and (max-width: 750px) {
  .time-block__wrapper {
    display: block;
    padding: 34px 0;
    height: auto;

    .left-content {
      padding: 0 22px;
      margin-bottom: 22px;
      .left-title {
        margin-bottom: 12px;
      }
    }
    .right-content {
      padding-left: 22px;

      .item-block {
        flex: 1;
        margin-right: 22px;
        .item-block--value {
          width: 100%;
          font-size: 34px;
          padding: 10px;
        }
        .item-block--tips {
          font-size: 20px;
        }
      }
    }
  }
}
</style>

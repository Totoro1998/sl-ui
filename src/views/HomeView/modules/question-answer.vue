<template>
  <section class="QA-wrapper">
    <div class="title-wrapper wow animated fadeInUp">
      <div class="title-label">{{ t('homeFAQSection.title') }}</div>
      <div class="title-tips">{{ t('homeFAQSection.tips') }} →</div>
    </div>

    <div class="QA-list">
      <template v-for="(item, index) in questionList" :key="index">
        <div
          :class="['QA-list-item wow animated fadeInUp', { 'is-open': isOpened(index) }]"
          @click="toggleChange(index)"
        >
          <div class="toggle-icon">
            <van-icon name="plus" size="24" />
          </div>
          <div class="item-content">
            <div class="item-content--question">{{ item.question }}</div>
            <div
              class="item-content--answer"
              v-replace-newline="item.answer"
              v-set-auto-height
            ></div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '@/hooks/useI18n'
import vReplaceNewline from '@/directive/replace-newline'
import vSetAutoHeight from '@/directive/set-auto-height'

const { t } = useI18n()
const openKeys = ref({})
const questionList = computed(() => [
  { question: t('homeFAQSection.questionA'), answer: t('homeFAQSection.answerA') },
  { question: t('homeFAQSection.questionB'), answer: t('homeFAQSection.answerB') },
  { question: t('homeFAQSection.questionC'), answer: t('homeFAQSection.answerC') },
  { question: t('homeFAQSection.questionD'), answer: t('homeFAQSection.answerD') }
])
const isOpened = computed(() => {
  return (index) => !!openKeys.value[index]
})

function toggleChange(index) {
  openKeys.value[index] = !openKeys.value[index]
}
</script>

<style lang="less" scoped>
.QA-wrapper {
  padding: 148px 292px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-wrapper {
  margin-bottom: 59px;
  text-align: center;
  .title-label {
    font-size: 48px;
    color: #251715;
    line-height: 56px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .title-tips {
    font-size: 24px;
    color: #7d8398;
    line-height: 28px;
  }
}

.QA-list {
  width: 100%;

  .toggle-icon {
    width: 50px;
    height: 50px;
    background: #f2f1fa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8d8ba7;
    cursor: pointer;
    transition: all 0.3s;
  }
  .QA-list-item {
    display: flex;
    padding: 48px 68px;
    border-radius: 15px;
    border: 1px solid #adabc3;
    background-color: #fff;
    margin-bottom: 32px;

    &.is-open {
      .toggle-icon {
        transform: rotate(45deg);
      }

      .item-content .item-content--answer {
        height: var(--height);
        margin-top: 16px;
      }
    }

    .toggle-icon {
      margin-right: 24px;
    }

    .item-content {
      flex: 1;
      overflow: hidden;
      .item-content--question {
        font-weight: bold;
        font-size: 24px;
        color: #5d5a88;
        line-height: 50px;
      }
      .item-content--answer {
        font-size: 18px;
        color: #9795b5;
        line-height: 30px;
        height: 0;
        overflow: hidden;
        transition: all 0.3s;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .QA-wrapper {
    padding: 32px 22px;
    .title-wrapper {
      margin-bottom: 22px;

      .title-label {
        font-size: 38px;
        line-height: 46px;
      }
      .title-tips {
        font-size: 20px;
      }
    }

    .QA-list {
      .QA-list-item {
        padding: 22px;

        .item-content {
          .item-content--question {
            font-size: 16px;
            line-height: 24px;
          }
          .item-content--answer {
            font-size: 16px;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>

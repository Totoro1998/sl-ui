<script setup>
const props = defineProps([
  'type',
  'label',
  'name',
  'maxlength',
  'placeholder',
  'disabled',
  'rules',
  'label-align',
  'onClick',
  'readonly',
  'is-link'
])
const model = defineModel()
</script>

<template>
  <van-field class="app-input" v-model="model" :border="false" v-bind="props">
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <template #button>
      <slot name="button"></slot>
    </template>
  </van-field>
</template>

<style lang="less">
.van-field__label {
  color: var(--primary-color);
  font-weight: bold;
}
.app-input.van-field--label-top {
  background-color: transparent;
  padding: 0;
  .van-field__label--top {
    margin-right: 0;
  }
  .van-field__value {
    background-color: white;
    border-radius: 99px;
    padding: 16px;
  }

  .van-cell__right-icon {
    position: absolute;
    top: calc(50% + 15px);
    transform: translateY(-50%);
    right: 32px;
  }
}
</style>

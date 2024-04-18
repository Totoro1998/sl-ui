<script setup>
import { computed } from 'vue'
import { ref } from 'vue'

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

const innerType = ref(props.type)

const isPassword = computed(() => innerType.value === 'password')
</script>

<template>
  <van-field class="app-input" v-model="model" v-bind="props" :type="innerType" :border="false">
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <template #button>
      <slot name="button" v-if="type !== 'password'"></slot>
      <span
        class="cursor-pointer"
        v-if="type === 'password' && model"
        @click="innerType = isPassword ? 'text' : 'password'"
      >
        <van-icon size="24" :name="isPassword ? 'eye-o' : 'closed-eye'" />
      </span>
    </template>
  </van-field>
</template>

<style lang="less">
.van-field__label {
  color: var(--primary-color);
  label {
    font-weight: 600;
  }
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

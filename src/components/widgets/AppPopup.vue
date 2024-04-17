<script setup>
import { computed, unref } from 'vue';
import useIsMobile from '@/hooks/useIsMobile'

const props = defineProps(['postion'])

const show = defineModel(['show'])

const isMobileScreen = useIsMobile();

const position = computed(() => {
    if (props.postion) {
        return props.postion
    }
    return unref(isMobileScreen) ? 'bottom' : 'center'
})
</script>

<template>
    <van-popup :class="{ 'app-popup': true, 'pc-app-popup': !isMobileScreen }" safe-area-inset-bottom
        safe-area-inset-top v-model:show="show" round :position="position">
        <slot />
    </van-popup>
</template>

<style lang="less">
.pc-app-popup {
    min-width: 400px
}
</style>

<script setup lang="ts">
import { bgFarX1, bgFarX2, bgMidX1, bgMidX2, fgX1, fgX2 } from '@/use/useParallaxBackground'
import { GROUND_OFFSET } from '@/utils/constants.ts'
import { ref } from 'vue'

const bgMidOffset = ref(`${GROUND_OFFSET}px`)
</script>

<template lang="pug">
  // Far Background (slowest)
  img.background-layer.absolute.top-0.left-0.w-full.h-full.z-0(
    :style="{ transform: `translate3d(${bgFarX1}px, 0, 0)` }"
    src="/images/bg/bg-far_607x324.jpg" alt="Far Background"
  )
  img.background-layer.absolute.top-0.left-0.w-full.h-full.z-0(
    :style="{ transform: `translate3d(${bgFarX2}px, 0, 0) scaleX(101%)` }"
    src="/images/bg/bg-far_607x324.jpg" alt="Far Background"
  )

  // Mid Background (faster than far)
  img.background-layer.bg-mid.absolute.left-0.w-full.z-10.bg-contain(
    :style="{ transform: `translate3d(${bgMidX1}px, 0, 0)` }"
    class="h-full"
    src="/images/bg/bg-mid_607x324.webp" alt="Mid Background"
  )
  img.background-layer.bg-mid.absolute.left-0.w-full.z-10.bg-contain(
    :style="{ transform: `translate3d(${bgMidX2}px, 0, 0)` }"
    class="h-full"
    src="/images/bg/bg-mid_607x324.webp" alt="Mid Background"
  )

  // Foreground (main game speed - ground)
  //.background-layer.absolute.top-0.left-0.w-full.h-full.z-20.bg-gray-600.opacity-40(
  //:style="{ transform: `translate3d(${fgX1}px, 0, 0)` }"
  //)
  //.background-layer.absolute.top-0.left-0.w-full.h-full.z-20.bg-gray-600.opacity-40(
  //:style="{ transform: `translate3d(${fgX2}px, 0, 0)` }"
  //)
</template>

<style scoped lang="sass">
.bg-mid
  bottom: v-bind(bgMidOffset)
</style>

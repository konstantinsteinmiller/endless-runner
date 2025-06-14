<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { prependBaseUrl } from '@/utils/function'

interface ObstacleProps {
  entity: {
    id: number
    x: number
    y: number
    width: number
    height: number
    type: number
  }
  time: number
  speed: number
}
const props = defineProps<ObstacleProps>()

// Constants for wobble tuning
const WOBBLE_AMPLITUDE = 3 // Max vertical displacement (in pixels)
const WOBBLE_FREQUENCY = 0.0025 // How fast the wobble oscillates (adjust this for speed)

const wobbleY = computed(() => {
  // props.time * WOBBLE_FREQUENCY gives us a value that changes over time, scaled for frequency
  const verticalOffset = Math.sin(props.time * WOBBLE_FREQUENCY) * WOBBLE_AMPLITUDE * props.speed
  return props.entity.y + verticalOffset
})

const randomRotation = Math.random() * 30 - 15 // Random rotation between -30 and 30 degrees
</script>

<template lang="pug">
  div.obstacle(class="relative z-20" :style="{ transform: `translate3d(${entity.x}px, ${wobbleY}px, 0) `, height: `${entity.y}px`, }")
    img(
      v-if="entity.type"
      :style="{ transform: `scale(103%, 103%) rotate(${randomRotation}deg) ` , width: `${entity.width}px`, height: `${entity.height}px` }"
      class="absolute z-[100]"
      :src="`${prependBaseUrl('/images/obstacles/obstacle-'+entity.type+'.webp')}`" alt="obstacle"
    )
</template>

<style scoped lang="sass"></style>

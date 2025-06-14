<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { prependBaseUrl } from '@/utils/function'

interface EnemyProps {
  entity: {
    id: number
    x: number
    y: number
    width: number
    height: number
    type?: number
  }
}

const props = defineProps({
  entity: {
    type: Object,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
})

// Constants for wobble tuning
const WOBBLE_AMPLITUDE = 8 // Max vertical displacement (in pixels)
const WOBBLE_FREQUENCY = 0.005 // How fast the wobble oscillates (adjust this for speed)

const wobbleY = computed(() => {
  // props.time * WOBBLE_FREQUENCY gives us a value that changes over time, scaled for frequency
  const verticalOffset = Math.sin(props.time * WOBBLE_FREQUENCY) * WOBBLE_AMPLITUDE * props.speed
  return props.entity.y + verticalOffset
})
const wobbleX = computed(() => {
  // props.time * WOBBLE_FREQUENCY gives us a value that changes over time, scaled for frequency
  const horizontalOffset = Math.sin(props.time * WOBBLE_FREQUENCY) * WOBBLE_AMPLITUDE * 0.5 * props.speed
  return props.entity.x + horizontalOffset
})
</script>

<template lang="pug">
  img.enemy(
    v-if="entity.type"
    :style="{ transform: `translate3d(${wobbleX}px, ${wobbleY}px, 0)`, width: `${entity.width}px`, height: `${entity.height}px` }"
    class="absolute z-50 rounded-full"
    :src="`${prependBaseUrl('/images/enemies/enemy-'+entity.type+'.webp')}`" alt="enemy"
  )
</template>

<style scoped lang="sass"></style>

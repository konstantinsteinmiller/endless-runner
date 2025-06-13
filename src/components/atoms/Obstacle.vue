<script setup lang="ts">
import { defineProps } from 'vue'

interface ObstacleProps {
  x: number
  y: number
}

defineProps<ObstacleProps>()
</script>

<template lang="pug">
  div(
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    class="absolute bg-yellow-300 rounded-md"
    :class="['w-20', 'h-20']"
  )
</template>

<style scoped lang="sass"></style>

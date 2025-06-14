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
    class="absolute w-16 h-16 z-[100] bg-yellow-300 rounded-md"
  )
</template>

<style scoped lang="sass"></style>

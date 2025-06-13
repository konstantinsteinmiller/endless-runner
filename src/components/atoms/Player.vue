<script setup lang="ts">
import { defineProps } from 'vue'

interface PlayerProps {
  x: number
  y: number
}

defineProps<PlayerProps>()
</script>

<template lang="pug">
  div(
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    class="player absolute bg-blue-500 rounded-lg"
    :class="['w-20', 'h-24']"
  )
</template>

<style scoped lang="sass"></style>

<script setup lang="ts">
import { defineProps } from 'vue'

interface PlayerProps {
  x: number
  y: number
}

defineProps<PlayerProps>()
</script>

<template lang="pug">
  img(
    src="/images/player/player_376x497.webp"
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    class="player w-8 h-10 z-[100] absolute  rounded-lg bg-transparent"
  )
</template>

<style scoped lang="sass"></style>

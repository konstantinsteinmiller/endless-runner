<script setup lang="ts">
import { defineProps } from 'vue'

interface EnemyProps {
  x: number
  y: number
}

defineProps<EnemyProps>()
</script>

<template lang="pug">
  div(
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    class="absolute w-12 h-12 z-[100] bg-red-500 rounded-full"
  )
</template>

<style scoped lang="sass"></style>

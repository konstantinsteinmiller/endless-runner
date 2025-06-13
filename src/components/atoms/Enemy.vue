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
    class="absolute bg-red-500 rounded-full"
    :class="['w-16', 'h-16']"
  )
</template>

<style scoped lang="sass"></style>

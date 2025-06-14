<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  obstaclesTotal: number
  enemiesTotal: number
  time: number
  speed: number
}>()

const score = computed(() => {
  return props.obstaclesTotal * 2 + props.enemiesTotal + Math.floor((props.time / 1000) * props.speed)
})
</script>

<template lang="pug">
  div.fixed.top-2.right-2.flex.items-center.justify-center(
    class="z-[100]"
  )
    div.bangers.text-2xl.text-white.font-bold
      span.score {{ $t('score') }}: {{ score }}
</template>

<style scoped lang="sass"></style>

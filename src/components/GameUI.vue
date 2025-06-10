<template>
  <GameOverScreen v-if="isGameOver" />
</template>

<script setup lang="ts">
import GameOverScreen from '@/components/GameOverScreen.vue'
import useMatch from '@/use/useMatch.ts'
import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'

// const route = useRoute()
const { isGameOver } = useMatch()

// const worldId: Ref<string> = ref(route.params.worldId)

onMounted(async () => {})
</script>

<style scoped lang="sass"></style>

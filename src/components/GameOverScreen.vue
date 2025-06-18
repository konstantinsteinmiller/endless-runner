<script setup lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import CenteredMenuButton from '@/components/molecules/CenteredMenuButton.vue'
import useInput from '@/use/useInput.ts'
import Score from '@/components/atoms/Score.vue'

const emit = defineEmits(['restart'])
const route = useRoute()
const { cleanup } = useInput()

const onRestartGame = () => {
  emit('restart')
}

const backToMainMenu = () => {
  emit('restart')
  cleanup()
  setTimeout(() => {
    router.push({ name: 'main-menu', query: route.query })
  }, 100)
}
</script>

<template>
  <div class="battle-over-screen fixed top-0 left-0 w-full h-full z-[101]">
    <div class="flex flex-col justify-center items-center h-full flex-wrap">
      <h1
        class="bangers text-red-400 [text-shadow:1px_1px_2px_#000000] lg:text-[8rem] text-[5rem] shrink-0 text-center"
      >
        GAME OVER
      </h1>
      <Score position="relative" />
      <CenteredMenuButton
        :on="backToMainMenu"
        text="backToMainMenu"
      />
      <CenteredMenuButton
        :on="onRestartGame"
        text="restart"
      />
    </div>
  </div>
</template>

<style scoped lang="sass"></style>

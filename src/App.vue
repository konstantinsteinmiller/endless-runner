<template lang="pug">
  div.flex.flex-col.h-screen.w-screen(id="main-app" class="sm:h-full")
    main.game.relative.overflow-hidden(:style="{ width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }")
      router-view
      OptionsModal(
        :show="isOptionsModalOpen"
        @close="() => (isOptionsModalOpen = false)"
      )
</template>

<script setup lang="ts">
import { GAME_HEIGHT, GAME_WIDTH } from '@/utils/constants.ts'
import OptionsModal from '@/components/molecules/OptionsModal.vue'
import useMatch from '@/use/useMatch.ts'
import '@/global'
import { useRoute } from 'vue-router'

const route = useRoute()
const { isOptionsModalOpen } = useMatch()

G.isDebug = route.query.debug === 'true' || localStorage.getItem('debug') === 'true'
</script>

<style scoped lang="sass">
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
</style>

<style lang="sass">
body
  margin: 0
  display: flex
  place-items: center
  min-width: 320px
  min-height: 100vh
  overflow: hidden

.game
  margin: 0 auto

.rib
  & *, &
    font-family: 'Ribeye', serif
</style>

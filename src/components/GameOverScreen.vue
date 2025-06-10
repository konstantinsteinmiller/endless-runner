<script setup lang="ts">
import XButton from '@/components/atoms/XButton.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = useRoute()

const backToMainMenu = () => {
  setTimeout(() => {
    router.push({ name: 'main-menu', query: route.query })
  }, 100)
}
</script>

<template>
  <div class="battle-over-screen fixed top-0 left-0 w-full h-full z-[101]">
    <div class="flex flex-col justify-center items-center h-full flex-wrap">
      <div class="flex w-full my-3">
        <div class="mx-auto">
          <div class="flex justify-center">
            <XButton
              class="with-bg leading-[1rem]"
              @click="backToMainMenu"
              @keydown.enter="backToMainMenu"
            >
              {{ t('backToMainMenu') }}
            </XButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass"></style>

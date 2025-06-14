<script setup lang="ts">
import XButton from '@/components/atoms/XButton.vue'
import { useI18n } from 'vue-i18n'
defineProps({
  text: { type: String, required: true },
  on: { type: Function, required: true },
})
const { t } = useI18n()
</script>

<template lang="pug">
  div.flex.w-full.my-3
    div.mx-auto
      div.flex.justify-center
        XButton.with-bg(
          class="leading-[1rem]"
          @click="on"
          @touchstart="on"
          @keydown.enter="on"
        ) {{ t(text) }}
</template>

<style scoped lang="sass"></style>

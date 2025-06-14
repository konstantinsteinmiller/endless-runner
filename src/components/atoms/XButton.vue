<template>
  <button
    :class="{
      'glass select-none': true,
    }"
    tabindex="0"
    @click="emits('click', $event)"
  >
    <slot name="default">
      <span>{{ label }}</span>
    </slot>

    <!--      <img-->
    <!--        class="absolute w-full h-full top-0 left-0 -translate-y-1/4 scale-125"-->
    <!--        src="/images/button/germ-button_300.webp"-->
    <!--        alt="button"-->
    <!--      />-->
    <div class="button-bg absolute top-0 left-0 rounded-3xl bg-transparent opacity-30 inset-0 -z-20" />
  </button>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['click'])
</script>

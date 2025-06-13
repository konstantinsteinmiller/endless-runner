<script setup lang="ts">
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
})
const width = 50
</script>

<template lang="pug">
  div.absolute.top-0(
    class="h-screen w-[50px]"
    :class=`{
      'bg-red-200 left-[0px]': index === 0,
      'bg-red-400 left-[${width}px]': index === 1
    }`
  )
</template>

<style scoped lang="sass"></style>

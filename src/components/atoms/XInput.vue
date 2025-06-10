<template>
  <input
    :value="model"
    :class="{
      glass: true,
    }"
    :placeholder="placeholder"
    @click="emit('click', $event)"
    @input="onInput"
    @focus="isSelectAll && selectAll($el)"
  />
</template>

<script setup lang="ts">
defineProps({
  isSelectAll: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const model = defineModel()
const onInput = (event: InputEvent) => {
  model.value = event.target.value
}
const emit = defineEmits(['click'])
const selectAll = (node: any) => {
  node.select()
}
</script>

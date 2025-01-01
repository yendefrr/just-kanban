<script setup>
import { defineProps } from "vue";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  outlined: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :class="[
      'px-4 py-2 rounded inline-flex items-center',
      props.outlined ? 'border-2 border-gray-400 bg-transparent' : 'bg-blue-500 text-white',
      props.icon ? 'space-x-2' : '',
      props.class,
    ]"
    @click="$emit('click')"
  >
    <i v-if="props.icon" :class="props.icon"></i>
    <span v-if="props.label">{{ props.label }}</span>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  transition: background-color 0.3s, border-color 0.3s;
  display: inline-flex;
  align-items: center;
}

button:hover {
  background-color: rgba(59, 130, 246, 0.8);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>

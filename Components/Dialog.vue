<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  header: {
    type: String,
    default: "",
  },
  style: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:visible"]);

const closeDialog = () => {
  emit("update:visible", false);
};

const dialogStyle = {
  ...props.style,
};
</script>

<template>
  <div v-if="visible" class="dialog-overlay" @click="closeDialog">
    <div class="dialog-content" :style="dialogStyle" @click.stop>
      <div class="dialog-header">
        <slot name="header">{{ header }}</slot>
        <button class="close-btn" @click="closeDialog">×</button>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  width: 25rem;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.dialog-body {
  margin-top: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

button:focus {
  outline: none;
}
</style>

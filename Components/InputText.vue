<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputClasses = "px-4 py-2 border rounded-md w-full";

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="input-wrapper">
    <label :for="id" class="input-label">{{ label }}</label>
    <input :id="id" :value="modelValue" @input="updateValue" :type="type" :class="inputClasses" :placeholder="placeholder" autocomplete="off" />
  </div>
</template>

<style scoped>
.input-wrapper {
  margin-bottom: 1rem;
}

.input-label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  border-color: #4c8bf5;
  outline: none;
}
</style>

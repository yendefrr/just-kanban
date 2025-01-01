<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

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
  rows: {
    type: Number,
    default: 3,
  },
  cols: {
    type: Number,
    default: 20,
  },
  placeholder: {
    type: String,
    default: "",
  },
  autoResize: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const textareaRef = ref(null);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const autoResize = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
};

watch(
  () => props.modelValue,
  () => {
    if (props.autoResize) {
      autoResize();
    }
  },
);

if (props.autoResize) {
  watch(textareaRef, () => autoResize());
}
</script>

<template>
  <div class="input-wrapper">
    <label :for="id" class="input-label">{{ label }}</label>
    <textarea
      ref="textareaRef"
      :id="id"
      :value="modelValue"
      @input="updateValue"
      :rows="rows"
      :cols="cols"
      :placeholder="placeholder"
      :class="inputClasses"
      :style="{ resize: 'none', overflowY: 'hidden' }"
    />
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

textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea:focus {
  border-color: #4c8bf5;
  outline: none;
}
</style>

<script setup>
import { ref } from "vue";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";

const props = defineProps({
  card: Object,
});

const visibleDialog = ref(false);

const dragStart = (event) => {
  event.dataTransfer.setData("text/plain", props.card.id);
};
</script>

<template>
  <div
    class="items-center justify-between flex bg-gray-100 rounded-[10px] shadow-md p-3 mb-2 cursor-pointer"
    draggable="true"
    @click="visibleDialog = true"
    @dragstart="dragStart($event)"
  >
    {{ props.card.title }}
  </div>

  <Dialog v-model:visible="visibleDialog" modal header="New column" :style="{ width: '25rem' }">
    <div class="flex flex-col gap-1 mb-3">
      <InputText placeholder="Title" class="flex-auto" v-model="props.card.title" />
      <Textarea id="description" v-model="props.card.description" autoResize rows="5" cols="30" />
    </div>
    <div class="flex">
      <Button
        class="w-full"
        type="button"
        label="Save"
        @click="visibleDialog = false"
        v-bind:disabled="props.card.title.length < 1"
      ></Button>
    </div>
  </Dialog>
</template>

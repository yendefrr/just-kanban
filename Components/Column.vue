<script setup>
import { ref } from "vue";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";

import KanbanCard from "./Card.vue";

const props = defineProps({
  modelValue: Boolean,
  status: String,
  cards: Array,
});
const emit = defineEmits(["addCard", "moveCard", "editStatus"]);

const isEditColumn = ref(false);
const visibleDialog = ref(false);
const dialogData = ref({
  title: "",
  description: "",
});
const editingStatus = ref(props.status);

const onDrag = ref(false);
const onDragOver = ref(false)

const addCard = () => {
  emit("addCard", dialogData.value, props.status);
  visibleDialog.value = false;
};

const endEdit = () => {
  isEditColumn.value = false;
  emit("editStatus", editingStatus.value, props.status)
}

const drop = (event) => {
  const cardId = event.dataTransfer.getData("text/plain");
  onDrag.value = false;

  emit("moveCard", parseInt(cardId, 10), props.status);
};

const dragStart = (event) => {
  event.dataTransfer.setData("text/plain", props.status);
  onDrag.value = true;
  console.log(onDrag.value);
};
</script>

<template>
  <div class="min-w-[20rem] h-[45rem] bg-white shadow-lg rounded-[10px] p-4 flex-1 mx-2"
    :class="{ 'border-dashed': modelValue, 'border-[3px]': modelValue, 'opacity-40': onDrag, 'opacity-60': onDragOver }"
    :draggable="modelValue" @drop="drop($event)" @dragstart="modelValue ? dragStart($event) : null" @dragenter="modelValue ? onDragOver = true : null" @dragleave="modelValue ? onDragOver = false : null">
    <div class="flex justify-between items-center mb-3 gap-3">
      <h2 v-if="!isEditColumn" class=" font-bold mb-2">{{ status }}</h2>
      <InputText v-if="isEditColumn" class="w-fit" v-model="editingStatus" />
      <div class="flex gap-2">
        <Button v-if="!isEditColumn" class="h-[40px]" icon="pi pi-pencil" @click="isEditColumn = true" severity="info" outlined />
        <Button v-if="isEditColumn" class="h-[40px]" icon="pi pi-check" @click="endEdit()" severity="success" outlined />
        <Button class="h-[40px]" icon="pi pi-plus" @click="visibleDialog = true" outlined />
      </div>
    </div>
    <KanbanCard v-for="card in cards" :key="card.id" :card="card"></KanbanCard>
  </div>

  <Dialog v-model:visible="visibleDialog" modal header="New card" :style="{ width: '25rem' }">
    <div class="flex flex-col gap-1 mb-3">
      <label for="username" class="font-semibold w-6rem">Title</label>
      <InputText id="username" class="flex-auto" v-model="dialogData.title" />
    </div>
    <div class="flex flex-col gap-1 mb-5">
      <label for="description" class="font-semibold w-6rem">Description</label>
      <Textarea id="description" v-model="dialogData.description" autoResize rows="5" cols="30" />
    </div>
    <div class="flex">
      <Button class="w-full" type="button" label="Save" @click="addCard"
        v-bind:disabled="dialogData.title.length < 1"></Button>
    </div>
  </Dialog>
</template>

<style scoped>
.opacity-40 {
  opacity: 0.4;
}
</style>
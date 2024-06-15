<script setup>
import { ref } from "vue";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";

import KanbanColumn from "./Column.vue";

const props = defineProps(["modelValue", "cards", "columns"]);
const emit = defineEmits(["addCard", "moveCard", "editStatus"]);

const cards = ref(props.cards);
const columnStatuses = ref(props.columns);

const visibleDialog = ref(false);
const dialogData = ref({
  title: "",
});

const addColumn = () => {
  columnStatuses.value.push(dialogData.value.title);

  dialogData.value.title = "";
  visibleDialog.value = false;
};

const addCard = (card, status) => {
  let finalCard = {
    id: cards.value.length + 1,
    ...card,
    status: status,
  };

  cards.value.push(finalCard);
  emit("addCard", finalCard);
};

const moveCard = (cardId, newStatus) => {
  const card = cards.value.find((card) => card.id === cardId);
  if (card) {
    card.status = newStatus;
  }
  emit("moveCard", card);
};
const drop = (event, receivedStatus) => {
  const column = event.dataTransfer.getData("text/plain");

  columnStatuses.value = moveElement(columnStatuses.value, columnStatuses.value.indexOf(column), columnStatuses.value.indexOf(receivedStatus));
};

const moveElement = (array, fromIndex, toIndex) => {
  const element = array.splice(fromIndex, 1)[0];

  array.splice(toIndex, 0, element);

  return array;
};

const editStatus = (newStatus, oldStatus) => {
  columnStatuses.value[columnStatuses.value.indexOf(oldStatus)] = newStatus;
  emit("editStatus", newStatus, oldStatus);
};
</script>

<template>
  <div class="flex w-full justify-start min-h-screen overflow-scroll">
    <div v-for="status in columnStatuses" class="flex" @dragover.prevent @drop="props.modelValue ? drop($event, status) : null">
      <KanbanColumn
        :modelValue="props.modelValue"
        :key="status"
        :status="status"
        :cards="cards.filter((card) => card.status === status)"
        @addCard="addCard"
        @moveCard="moveCard"
        @editStatus="editStatus"
      ></KanbanColumn>
    </div>
    <Button class="h-[40px] min-w-[40px]" icon="pi pi-plus" @click="visibleDialog = true" outlined />
  </div>

  <Dialog v-model:visible="visibleDialog" modal header="New column" :style="{ width: '25rem' }">
    <div class="flex flex-col gap-1 mb-3">
      <label for="username" class="font-semibold w-6rem">Title</label>
      <InputText id="username" class="flex-auto" v-model="dialogData.title" />
    </div>
    <div class="flex">
      <Button class="w-full" type="button" label="Save" @click="addColumn" v-bind:disabled="dialogData.title.length < 1"></Button>
    </div>
  </Dialog>
</template>

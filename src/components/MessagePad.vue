<template>
  <textarea
    ref="textArea"
    class="h-full w-full py-2 px-3 resize-none outline-0"
    placeholder="Typ hier je berichtje"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { event } from "vue-gtag";

const textArea = ref<HTMLTextAreaElement | null>(null);
const getInputString = () => {
  event('message_saved');
  if (!textArea.value) {
    return;
  }
  const text = textArea.value.value;
  if (!text) {
    return;
  }
  return text;
};
defineExpose({
  getInputString,
});
</script>

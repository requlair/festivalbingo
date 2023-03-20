<template>
    <textarea 
        ref="textArea"
        class="h-full w-full py-2 px-3 resize-none outline-0" 
        placeholder="Typ hier je berichtje"
    />
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import LZString from 'lz-string';

    const textArea = ref<HTMLTextAreaElement | null>(null)
    const getInputString = () => {
        if (!textArea.value) {
            return;
        }
        const text = textArea.value.value;
        if (!text) {
            return;
        }
        const inputString = LZString.compress(text);
        return inputString;
    }
    defineExpose({
        getInputString,
    })
</script>

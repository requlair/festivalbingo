<template>
    <BaseModal :font="getTheme.fontFamily" :show="open" @close="handleClose">
        <template v-slot:header>
            <div class="flex justify-between">
                <h2>Behaalde Resultaten</h2>
                <button class="ml-2" @click="handleClose">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
        </template>
        <template v-slot:body>
            <h3>Voortgang</h3>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="h-2.5 rounded-full" :style="{ background: getTheme.colors[0], width: `${progress.percentage}%` } "></div>
            </div>
            <p>{{ progress.checked }} / {{ progress.total }} afgevinkt</p>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useBingoCardsStore } from '../../stores/useBingoCardStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import BaseModal from '../modals/BaseModal.vue';
defineProps<{ open: boolean }>()


const emit = defineEmits(['close'])
const { getTheme } = storeToRefs(useSettingsStore());
const { getCards } = storeToRefs(useBingoCardsStore());

const progress = computed(() => {
    const numberChecked = getCards.value.filter(card => card.checked === true).length
    const total = getCards.value.length
    return {
        checked: numberChecked,
        total: total,
        percentage: numberChecked / total * 100
    }
})

const handleClose = () => {
    emit('close');
}
</script>

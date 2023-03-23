<template>
    <BaseModal :show="open" @close="handleClose">
        <template v-slot:header>
            <div class="w-80 flex justify-between">
                <h2 class="w-[300px]">Festival Bingo Instellingen</h2>
                <button @click="handleClose">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
        </template>
        <template v-slot:body>
            <p class="w-80 py-2 break-words">
                Verander hieronder het thema van de Festival Bingo App naar het thema van het festival waar je nu bent!
                Wil je de Bingo opnieuw spelen maar heb je nog de data van een vorig festival in je App? 
                Hieronder kun je de Bingo App resetten. Let op, al je input wordt dan verwijdert!
            </p>
            <div class="flex mt-4">
                <div class="flex flex-col mr-2">
                    <label>Kies je Thema</label>
                    <Dropdown :selectedItem="selectedOption" :onOptionClicked="handleInputSelect" :items="dropdownOptions"/>
                </div>
                <div class="flex flex-col">
                    <label>Reset Data</label>
                    <button class="border-2 px-2 py1 w-24 h-9 rounded-lg" @click="handleDelete">
                        Reset
                    </button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useBingoCardsStore } from '../../stores/useBingoCardStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { DropdownItem, Settings } from '../../types/types';
import Dropdown from '../dropdown/Dropdown.vue';
import BaseModal from '../modals/BaseModal.vue';
import BingoLogo from '../../assets/logos/bingo-logo.vue';
import PaaspopLogo from '../../assets/logos/paaspop-logo.vue';
import LowlandsLogo from '../../assets/logos/lowlands-logo.vue';

const { updateTheme } = useSettingsStore();
const { getSettings } = storeToRefs(useSettingsStore());
const { resetCards } = useBingoCardsStore();

const dropdownOptions: DropdownItem[] = [
    { logo: BingoLogo, label: 'Festival', value: 'festival' },
    { logo: PaaspopLogo, label: 'Paaspop', value: 'paaspop' },
    { logo: LowlandsLogo, label: 'Lowlands', value: 'lowlands' },
];
const selectedOption = computed(() => {
    return dropdownOptions.filter((option) => option.value === getSettings.value.theme)[0];
});
function handleInputSelect (value: string) {
    updateTheme(value);
}
const handleDelete = () => {
    resetCards();
}

defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])
const handleClose = () => {
    emit('close');
}
</script>
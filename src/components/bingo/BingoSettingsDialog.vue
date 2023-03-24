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
                Ook kun je kiezen op hoeveel kolommen je de Festival Bingo App weergegeven wilt hebben.
                Wil je de Bingo opnieuw spelen maar heb je nog de data van een vorig festival in je App? 
                Hieronder kun je de Bingo App resetten. <strong>Let op,</strong> al je input wordt dan verwijdert!
            </p>
            <div class="grid gap-4 grid-cols-2 mt-4">
                <div class="mr-2">
                    <h3>Kies je Thema</h3>
                    <Dropdown :selectedItem="selectedTheme" :onOptionClicked="handleThemeSelect" :items="themeOptions"/>
                </div>
                <div class="flex flex-col">
                    <h3>Reset App</h3>
                    <button class="border-2 px-2 py1 w-24 h-9 rounded-lg" @click="handleReset">
                        Reset
                    </button>
                </div>
                <div>
                    <h3>Kies je Layout</h3>
                    <Dropdown :selectedItem="selectedGrid" :onOptionClicked="handleGridSelect" :items="gridOptions"/>
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
import { DropdownItem } from '../../types/types';
import Dropdown from '../dropdown/Dropdown.vue';
import BaseModal from '../modals/BaseModal.vue';
import BingoLogo from '../../assets/logos/bingo-logo.vue';
import PaaspopLogo from '../../assets/logos/paaspop-logo.vue';
import LowlandsLogo from '../../assets/logos/lowlands-logo.vue';

const { updateTheme, updateGridColumns, resetSettings } = useSettingsStore();
const { getSettings } = storeToRefs(useSettingsStore());
const { resetCards } = useBingoCardsStore();

const themeOptions: DropdownItem[] = [
    { logo: BingoLogo, label: 'Festival', value: 'festival' },
    { logo: PaaspopLogo, label: 'Paaspop', value: 'paaspop' },
    { logo: LowlandsLogo, label: 'Lowlands', value: 'lowlands' },
];
const gridOptions: DropdownItem[] = [
    { icon: 'fas fa-2', label: 'Kolommen' , value: 'grid-cols-2' },
    { icon: 'fas fa-3', label: 'Kolommen' , value: 'grid-cols-3' },
    { icon: 'fas fa-4', label: 'Kolommen' , value: 'grid-cols-4' },
]
const selectedTheme = computed(() => {
    return themeOptions.filter((option) => option.value === getSettings.value.theme)[0];
});
const selectedGrid = computed(() => {
    return gridOptions.filter((option) => option.value === getSettings.value.gridColumns)[0];
})
function handleThemeSelect (value: string) {
    updateTheme(value);
}
const handleReset = () => {
    if(confirm('Weet je het zeker?')){
        resetCards();
        resetSettings();
    }
    return;
}
const handleGridSelect = (value: string) => {
    updateGridColumns(value);
}

defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])
const handleClose = () => {
    emit('close');
}
</script>
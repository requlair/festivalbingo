<template>
  <BaseModal
    :show="open"
    @close="handleClose"
  >
    <template #header>
      <div class="flex justify-between">
        <h2>Festival Bingo Instellingen</h2>
        <button @click="handleClose">
          <i class="fas fa-xmark" />
        </button>
      </div>
    </template>
    <template #body>
      <p class="y-2 break-words">
        Verander hieronder het thema van de Festival Bingo App naar het thema van het festival waar je nu bent!
        Ook kun je kiezen over hoeveel kolommen je de Festival Bingo App weergegeven wilt hebben.
        Wil je de Bingo opnieuw spelen maar heb je nog de data van een vorig festival in je App? 
        Hieronder kun je de Bingo App resetten. <strong>Let op,</strong> al je input wordt dan verwijdert!
      </p>
      <div class="flex grid grid-rows-2 grid-flow-col gap-4 mt-4 landscape:grid-rows-1">
        <div>
          <h4>Kies je Thema:</h4>
          <Dropdown
            :selected-item="selectedTheme"
            :on-option-clicked="handleThemeSelect"
            :items="themeOptions"
          />
        </div>
        <div>
          <h4>Kies je Layout:</h4>
          <Dropdown
            :selected-item="selectedGrid"
            :on-option-clicked="handleGridSelect"
            :items="gridOptions"
          />
        </div>
        <div class="flex flex-col">
          <h4>Reset de Bingo App:</h4>
          <button
            class="border-2 px-2 py1 w-24 h-9 rounded-lg"
            @click="handleReset"
          >
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
import { DropdownItem } from '../../types/types';
import Dropdown from '../dropdown/AppDropdown.vue';
import BaseModal from '../modals/BaseModal.vue';

import FestivalLogo from '/images/festival-logo.png';
import PaaspopLogo from '/images/paaspop-logo.png';
import LowlandsLogo from '/images/lowlands-logo.png';

const { updateTheme, updateGridColumns, resetSettings } = useSettingsStore();
const { getSettings } = storeToRefs(useSettingsStore());
const { resetCards } = useBingoCardsStore();

const themeOptions: DropdownItem[] = [
    { logo: FestivalLogo, label: 'Festival', value: 'festival' },
    { logo: PaaspopLogo, label: 'Paaspop', value: 'paaspop' },
    { logo: LowlandsLogo, label: 'Lowlands', value: 'lowlands' },
];
const gridOptions: DropdownItem[] = [
    { icon: 'fas fa-2', label: 'Kolommen' , value: 'grid-cols-2' },
    { icon: 'fas fa-3', label: 'Kolommen' , value: 'grid-cols-3' },
    { icon: 'fas fa-4', label: 'Kolommen' , value: 'grid-cols-4' },
    { icon: 'fas fa-6', label: 'Kolommen' , value: 'grid-cols-6' },
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
    if(confirm('Al je data en instellingen zullen worden verwijdert. Weet je zeker dat je door wilt gaan?')){
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
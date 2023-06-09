<template>
  <BaseModal
    :show="open"
    @close="handleClose"
  >
    <template #header>
      <h2>Festival Bingo Instellingen</h2>
    </template>
    <template #body>
      <p>
        Verander hieronder het thema van de Festival Bingo naar het thema van het festival waar je nu bent!
        Ook kun je kiezen over hoeveel kolommen je de Festival Bingo weergegeven wilt hebben.
        Wil je de Festival Bingo opnieuw spelen maar heb je nog de data van een vorig festival in de app? 
        Hieronder kun je de app resetten.
      </p>
    </template>
    <template #footer>
      <div class="grid grid-rows-2 grid-flow-col gap-4 landscape:grid-rows-1">
        <div>
          <h4>Kies je Thema:</h4>
          <DropdownMenu
            :selected-item="selectedTheme"
            :on-option-clicked="handleThemeSelect"
            :items="themeOptions"
          />
          <p
            v-for="copyright, index in currentCopyright.copyright"
            :key="index"
            class="text-xs"
          >
            &thinsp;<i class="far fa-copyright" /> <a
              :href="copyright.source"
              target="_blank"
            >{{ copyright.label }}</a>
          </p>
        </div>
        <div>
          <h4>Kies je Layout:</h4>
          <DropdownMenu
            :selected-item="selectedGrid"
            :on-option-clicked="handleGridSelect"
            :items="gridOptions"
          />
        </div>
        <div class="flex flex-col">
          <h4>Reset de app:</h4>
          <button
            class="border-2 px-2 py1 w-24 h-9 rounded-lg"
            @click="handleReset"
          >
            Reset app
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
import DropdownMenu from '../dropdowns/DropdownMenu.vue';
import BaseModal from './BaseModal.vue';
import { event } from 'vue-gtag';

const { updateTheme, updateGridColumns, resetSettings } = useSettingsStore();
const { getSettings } = storeToRefs(useSettingsStore());
const { resetCards } = useBingoCardsStore();

const themeOptions: DropdownItem[] = [
    { logo: 'festival', label: 'Festival', value: 'festival' },
    { logo: 'paaspop', label: 'Paaspop', value: 'paaspop' },
    { logo: 'lowlands', label: 'Lowlands', value: 'lowlands' },
    { logo: 'dtrh', label: 'DTRH', value: 'dtrh' },
    { logo: 'pinkpop', label: 'Pinkpop', value: 'pinkpop' },
];
const copyrightInfo = [
  { name: 'festival', copyright: [{ label: 'Lejon Bergman', source: 'https://www.linkedin.com/in/lejon-bergman' }]},
  { name: 'paaspop', copyright: [{ label: 'Paaspop Festival', source: 'https://www.paaspop.nl/'}]},
  { name: 'lowlands', copyright: [
    { label: 'Hansje van Halem', source: 'https://www.hansje.net/Lowlands-2022'},
    { label: 'Lowlands Festival', source: 'https://www.lowlands.nl'}
  ]},
  { name: 'dtrh', copyright: [{ label: 'Down The Rabbit Hole Festival', source: 'https://downtherabbithole.nl/'}]},
  { name: 'pinkpop', copyright: [{ label: 'Pinkpop Festival', source: 'https://pinkpop.nl/'}]}
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
const currentCopyright = computed(() => {
  return copyrightInfo.filter((option) => option.name === getSettings.value.theme)[0];
})
const selectedGrid = computed(() => {
    return gridOptions.filter((option) => option.value === getSettings.value.gridColumns)[0];
})
function handleThemeSelect (value: string) {
  event('theme_setting_select');
  updateTheme(value);
}
const handleReset = () => {
    event('app_reset_select');
    if(confirm('Al je data en instellingen zullen worden verwijdert. Weet je zeker dat je door wilt gaan?')){
        resetCards();
        resetSettings();
    }
    return;
}
const handleGridSelect = (value: string) => {
  event('grid_setting_select');
  updateGridColumns(value);
}

defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])
const handleClose = () => {
    emit('close');
}
</script>
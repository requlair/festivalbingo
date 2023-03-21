<template>
    <BaseModal :show="open" @close="handleClose">
        <template v-slot:header>
            <div class="w-80 flex justify-between">
                <h2 class="w-[300px]">Festival Bingo Instellingen</h2>
                <button @click="handleClose">&#10761;</button>
            </div>
        </template>
        <template v-slot:body>
            <div class="flex flex-col">
                <label>Thema</label>
                <Dropdown :selectedItem="selectedOption" :onOptionClicked="handleInputSelect" :items="dropdownOptions" />

                <label>Bingo Data</label>
                <button class="border-2 px-2 py1 w-24 h-9 rounded-lg"
                @click="handleDelete">Reset
                </button>
            </div>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useBingoCardsStore } from '../../stores/useBingoCardStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { DropdownItem, ThemeSettings } from '../../types/types';
import Dropdown from '../dropdown/Dropdown.vue';
import BaseModal from '../modals/BaseModal.vue';

const { updateSettings } = useSettingsStore();
const { getSettings } = storeToRefs(useSettingsStore());
const { resetCards } = useBingoCardsStore();

const themes = {
    festival: {
        name: 'festival',
        fontFamily: 'festival',
        headerImage: 'FB_Header',
        backgroundImage: 'FB_Background',
        borderColor: '#000000'
    } as ThemeSettings,
    paaspop: {
        name: 'paaspop',
        fontFamily: 'paaspop',
        headerImage: 'PP_Header',
        backgroundImage: 'PP_Background',
        borderColor: '#7e10ff'
    } as ThemeSettings,
    lowlands: {
        name: 'lowlands',
        fontFamily: 'lowlands',
        headerImage: 'LL_Header',
        backgroundImage: 'LL_Background',
        borderColor: '#000000'
    } as ThemeSettings,
} as const

const dropdownOptions: DropdownItem[] = [
    { icon: '&#9839;', label: 'Festival', value: 'festival' },
    { icon: '&#9839;', label: 'Paaspop', value: 'paaspop' },
    { icon: '&#9839;', label: 'Lowlands', value: 'lowlands' },
];
const selectedOption = computed(() => {
    return dropdownOptions.filter((option) => option.value === getSettings.value.name)[0];
});
function handleInputSelect (value: keyof typeof themes) {
    updateSettings(themes[value]);
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
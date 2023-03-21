<template>
    <div class="container mx-auto h-full p-4">
      <div class="flex justify-between">
        <input class="outline-0 w-32 border-2 bg-white px-2 py-1 w-30 h-9 rounded-lg"  
          type="text" 
          placeholder="&#128269; Zoeken..."
          v-model="searchValue"
        />
        <div class="flex justify-center items-center bg-white border-2 px-2 py-1 h-9 rounded-lg">
          <input 
            id="filter-checked" 
            type="checkbox" 
            v-model="onlyUnchecked"
            class="mr-1"/>
          <label for="filter-checked">Niet afgevinkt</label>
        </div>
        <button class="border-2 bg-white px-2 py-1 h-9 rounded-lg" @click="toggleModal('settings')">
          &#9881;
        </button>
      </div>
      <div class="min-h-[400px] auto-rows-max mt-4 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        <BingoOption v-for="card in filteredBingoCards" 
          :key="card.id" 
          :text="card.text" 
          :checked="card.checked"
          @click="handleOptionClick(card)"
        />
      </div>
      <BingoOptionDialog 
        :open="isOptionModalOpen" 
        :card="selectedCard!"
        @close="toggleModal('option')"
      ></BingoOptionDialog>
      <BingoSettingsDialog
        :open="isSettingsModalOpen"
        @close="toggleModal('settings')"
      ></BingoSettingsDialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import BingoOptionDialog from './BingoOptionDialog.vue';
  import BingoSettingsDialog from './BingoSettingsDialog.vue';
  import BingoOption from './BingoOption.vue'
  import { useBingoCardsStore } from '../../stores/useBingoCardStore';
  import { BingoCard } from '../../types/types';
  import { storeToRefs } from 'pinia';

  const { getCards } = storeToRefs(useBingoCardsStore());
  const selectedCard = ref<BingoCard | null>(null);
  const isOptionModalOpen = ref(false);
  const isSettingsModalOpen = ref(false);

  const searchValue = ref('');
  const onlyUnchecked = ref(false);

  const filteredBingoCards = computed(() => {
      return getCards.value.filter(card => {
        if (onlyUnchecked.value) {
          return card.text.toLowerCase().includes(searchValue.value.toLowerCase()) && card.checked === !onlyUnchecked.value;
        }
        return card.text.toLowerCase().includes(searchValue.value.toLowerCase())
      })
  });
  
  const handleOptionClick = (card: BingoCard) => {
    selectedCard.value = card;
    toggleModal('option');
  }
  const toggleModal = (modal: string) => {
    if (modal === 'option') {
      isOptionModalOpen.value = !isOptionModalOpen.value;
    }
    if (modal === 'settings') {
      isSettingsModalOpen.value = !isSettingsModalOpen.value;
    }
    return;
  }
  </script>
  
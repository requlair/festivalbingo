<template>
    <div class="container mx-auto h-full p-4">
      <div class="flex justify-between">
        <div class="flex">
          <input class="outline-0 border-2 bg-white px-2 py-1 w-32 h-9 rounded-lg"  
            type="text" 
            placeholder="&#128269; Zoeken..."
            v-model="searchValue"
          />
          <Dropdown :items="inputOptions" :selectedItem="selectedInput" :onOptionClicked="handleInputSelect"/>
        </div>
        <div class="flex">
          <button class="border-2 bg-white px-2 py-1 w-9 h-9 rounded-lg" @click="isSharingModalOpen = true">
            <i class="fas fa-share-nodes"></i>
          </button>
          <button class="border-2 bg-white px-2 py-1 w-9 h-9 rounded-lg" @click="isSettingsModalOpen = true">
            <i class="fas fa-gear"></i>
          </button>
        </div>
      </div>

      <div class="min-h-[400px] auto-rows-max mt-4 grid gap-4 grid-cols-2 md:grid-cols-4">
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
        @close="isOptionModalOpen = false"
      ></BingoOptionDialog>
      <BingoSharingDialog
        :open="isSharingModalOpen"
        @close="isSharingModalOpen = false"
      ></BingoSharingDialog>
      <BingoSettingsDialog
        :open="isSettingsModalOpen"
        @close="isSettingsModalOpen = false"
      ></BingoSettingsDialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import BingoOptionDialog from './BingoOptionDialog.vue';
  import BingoSharingDialog from './BingoSharingDialog.vue';
  import BingoSettingsDialog from './BingoSettingsDialog.vue';
  import BingoOption from './BingoOption.vue'
  import { useBingoCardsStore } from '../../stores/useBingoCardStore';
  import { BingoCard, DropdownItem } from '../../types/types';
  import { storeToRefs } from 'pinia';
  import Dropdown from '../dropdown/Dropdown.vue';

  const { getCards } = storeToRefs(useBingoCardsStore());
  const selectedCard = ref<BingoCard | null>(null);
  const isOptionModalOpen = ref(false);
  const isSharingModalOpen = ref(false);
  const isSettingsModalOpen = ref(false);

  const searchValue = ref('');
  const inputOptions: DropdownItem[] = [
    { icon: 'fas fa-filter-circle-xmark', label: 'Alle', value: 'all' },
    { icon: 'fas fa-filter', label: 'Afgevinkt', value: 'checked' },
    { icon: 'fas fa-filter', label: 'Open', value: 'unchecked' },
  ]
  const selectedInput = ref(inputOptions[0]);
  function handleInputSelect (value: string) {
    selectedInput.value = inputOptions.filter(option => option.value === value)[0];
  }
  const filteredBingoCards = computed(() => {
      return getCards.value.filter(card => {
        if (selectedInput.value.value !== 'all') {
          return card.text.toLowerCase().includes(searchValue.value.toLowerCase())
          && card.checked === (selectedInput.value.value === 'checked');
        }
        return card.text.toLowerCase().includes(searchValue.value.toLowerCase())
      })
  });
  
  const handleOptionClick = (card: BingoCard) => {
    selectedCard.value = card;
    isOptionModalOpen.value = true;
  }
  </script>
  
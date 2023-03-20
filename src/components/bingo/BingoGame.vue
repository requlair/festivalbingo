<template>
    <div class="container mx-auto h-full p-4">
      <div>
        <input class="outline-0 border-2 px-2 py-1 w-30 h-9 rounded-lg" 
          id="search-bingo" 
          type="text" 
          placeholder="Zoek Bingo..."
          v-model="searchValue"
        />
      </div>
      <div class="min-h-[400px] auto-rows-max mt-4 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        <BingoOption v-for="card in filteredBingoCards" 
          :key="card.id" 
          :text="card.text" 
          :checked="card.checked"
          @click="handleClick(card)"
        />
      </div>
      <BingoOptionDialog 
        :open="isModalOpen" 
        :card="selectedCard!"
        @close="toggleModal"
      ></BingoOptionDialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import BingoOptionDialog from './BingoOptionDialog.vue'
  import BingoOption from './BingoOption.vue'
  import { useBingoCardsStore } from '../../stores/useBingoCardStore';
  import { BingoCard } from '../../types/types';
  import { storeToRefs } from 'pinia';

  const { getCards } = storeToRefs(useBingoCardsStore());
  const selectedCard = ref<BingoCard | null>(null);
  let isModalOpen = ref(false);
  const searchValue = ref('');

  const filteredBingoCards = computed(() => {
      return getCards.value.filter(card => {
        return card.text.toLowerCase().includes(searchValue.value.toLowerCase())
      })
  });
  
  const handleClick = (card: BingoCard) => {
    selectedCard.value = card;
    toggleModal();
  }
  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  }
  </script>
  
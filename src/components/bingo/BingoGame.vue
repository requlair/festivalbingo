<template>
  <div class="container mx-auto h-full p-4">
    <div class="flex justify-between">
      <div class="flex">
        <input
          v-model="searchValue"
          class="outline-0 border-2 bg-white px-2 py-1 w-32 h-9 rounded-lg"
          type="text"
          placeholder="&#128269; Zoeken..."
        >
        <DropdownMenu
          :items="inputOptions"
          :selected-item="selectedInput"
          :on-option-clicked="handleInputSelect"
        />
      </div>
      <div class="flex">
        <button
          class="border-2 bg-white px-2 py-1 w-9 h-9 rounded-lg"
          @click="isProgressModalOpen = true"
        >
          <i class="fas fa-trophy" />
        </button>
        <button
          class="border-2 bg-white px-2 py-1 w-9 h-9 rounded-lg"
          @click="isSharingModalOpen = true"
        >
          <i class="fas fa-share-nodes" />
        </button>
        <button
          class="border-2 bg-white px-2 py-1 w-9 h-9 rounded-lg"
          @click="isInfoModalOpen = true"
        >
          <i class="far fa-circle-question" />
        </button>
        <button
          class="border-2 bg-white px-2 py-1 w-9 h-9 rounded-lg"
          @click="isSettingsModalOpen = true"
        >
          <i class="fas fa-gear" />
        </button>
      </div>
    </div>

    <div :class="['min-h-[400px] auto-rows-max mt-4 grid gap-4', getGrid]">
      <BingoOption
        v-for="card in filteredBingoCards"
        :key="card.id"
        :text="card.text"
        :checked="card.checked"
        @click="handleOptionClick(card)"
      />
    </div>

    <BingoOptionModal
      :open="isOptionModalOpen"
      :card="selectedCard!"
      @close="isOptionModalOpen = false"
    />
    <BingoProgressModal
      :open="isProgressModalOpen"
      @close="isProgressModalOpen = false"
    />
    <BingoSharingModal
      :open="isSharingModalOpen"
      @close="isSharingModalOpen = false"
    />
    <BingoInfoModal 
      :open="isInfoModalOpen"
      @close="isInfoModalOpen = false"
    />
    <BingoSettingsModal
      :open="isSettingsModalOpen"
      @close="isSettingsModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import DropdownMenu from "../dropdowns/DropdownMenu.vue";
import BingoOption from "./BingoOption.vue";
import BingoOptionModal from "../modals/BingoOptionModal.vue";
import BingoProgressModal from "../modals/BingoProgressModal.vue";
import BingoSharingModal from "../modals/BingoSharingModal.vue";
import BingoInfoModal from "../modals/BingoInfoModal.vue";
import BingoSettingsModal from "../modals/BingoSettingsModal.vue";

import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useBingoCardsStore } from "../../stores/useBingoCardStore";
import { useSettingsStore } from "../../stores/useSettingsStore";
import { BingoCard, DropdownItem } from "../../types/types";

const { getCards } = storeToRefs(useBingoCardsStore());
const { getGrid } = storeToRefs(useSettingsStore());

const isOptionModalOpen = ref(false);
const isProgressModalOpen = ref(false);
const isSharingModalOpen = ref(false);
const isInfoModalOpen = ref(false);
const isSettingsModalOpen = ref(false);

const inputOptions: DropdownItem[] = [
  { icon: "fas fa-filter-circle-xmark", label: "Alle", value: "all" },
  { icon: "fas fa-filter", label: "Afgevinkt", value: "checked" },
  { icon: "fas fa-filter", label: "Open", value: "unchecked" },
];
const selectedInput = ref({
  icon: inputOptions[0].icon,
  value: inputOptions[0].value,
});
function handleInputSelect(value: string) {
  selectedInput.value = inputOptions
    .filter((option) => option.value === value)
    .map((res) => {
      return { icon: res.icon, value: res.value };
    })[0];
}

const searchValue = ref("");
const filteredBingoCards = computed(() => {
  return getCards.value.filter((card) => {
    if (selectedInput.value.value !== "all") {
      return (
        card.text.toLowerCase().includes(searchValue.value.toLowerCase()) &&
        card.checked === (selectedInput.value.value === "checked")
      );
    }
    return card.text.toLowerCase().includes(searchValue.value.toLowerCase());
  });
});

const selectedCard = ref<BingoCard | null>(null);
const handleOptionClick = (card: BingoCard) => {
  selectedCard.value = card;
  isOptionModalOpen.value = true;
};
</script>

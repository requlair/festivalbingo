<template>
  <BaseModal :font="getTheme.fontFamily" :show="open" @close="handleClose">
      <template v-slot:header>
        <div class="flex justify-between">
          <h2>{{ card.text }}</h2>
          <button class="ml-2" @click="handleClose">
            <i class="fas fa-xmark"></i>
          </button>
        </div>
      </template>

      <template v-slot:body>
        <div class="h-60 w-80">
          <div v-if="!card.checked" class="w-full h-full border-2 border-dashed rounded-lg">
            <CameraPad ref="userInput" v-if="selectedInput.value === 'image'" @change="saveInput"/>
            <SignaturePad ref="userInput" v-if="selectedInput.value === 'signature'"/>
            <MessagePad ref="userInput" v-if="selectedInput.value === 'message'"/>
          </div>
          <div v-else>
            <div v-if="LZString.decompress(card.signature).startsWith('data:image')" class="flex justify-center items-center">
              <img :src="LZString.decompress(card.signature)"/>
            </div>
            <div v-else>
              <p class="py-2 px-3 break-words">{{ LZString.decompress(card.signature) }}</p>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div v-if="!card.checked" class="flex">
            <Dropdown :selectedItem="selectedInput" :items="inputOptions" :onOptionClicked="handleInputSelect"/>
            <button class="border-2 px-2 py1 w-24 h-9 rounded-lg" v-if="selectedInput.value !== 'image'" type="submit" @click="saveInput">
              Opslaan
            </button>
        </div>
        <div v-else>
            <button class="border-2 px-2 py1 w-24 h-9 rounded-lg" type="submit" @click="eraseInput">
              Wissen
            </button>
        </div>
      </template>
  </BaseModal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { BingoCard, DropdownItem } from '../../types/types';
import CameraPad from '../CameraPad.vue';
import BaseModal from '../modals/BaseModal.vue';
import SignaturePad from '../SignaturePad.vue';
import MessagePad from '../MessagePad.vue';
import { useBingoCardsStore } from '../../stores/useBingoCardStore';
import LZString from 'lz-string';
import Dropdown from '../dropdown/Dropdown.vue';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { storeToRefs } from 'pinia';

  const props = defineProps<{
    open: boolean,
    card: BingoCard,
  }>()
  const { updateCard } = useBingoCardsStore();
  const { getTheme } = storeToRefs(useSettingsStore());
  const userInput = ref<typeof SignaturePad | typeof MessagePad | typeof CameraPad | null>(null);
  const inputOptions: DropdownItem[] = [
    { icon: 'fas fa-camera', label: 'Camera', value: 'image'},
    { icon: 'fas fa-pencil', label: 'Krabbel', value: 'signature'},
    { icon: 'fas fa-message', label: 'Bericht', value: 'message'},
  ];
  const selectedInput = ref(inputOptions[0]);
  function handleInputSelect (value: string) {
    selectedInput.value = inputOptions.filter(option => option.value === value)[0];
  }

  const saveInput = async () => {
    const signature = await userInput.value!.getInputString();
    if(!signature){
      return;
    }
    const newCard = props.card;
    newCard.signature = signature;
    newCard.checked = true;
    updateCard(newCard);
  }
  const eraseInput = () => {
    const newCard = props.card;
    newCard.signature = '';
    newCard.checked = false;
    updateCard(newCard);
  }

  const emit = defineEmits(['close'])
  const handleClose = () => {
    emit('close');
  }
</script>
<style>
</style>
<template>
  <BaseModal :show="open" @close="handleClose">
      <template v-slot:header>
        <div class="w-80 flex justify-between">
          <h2 class="w-[300px]">{{ card.text }}</h2>
          <button @click="handleClose">&#10761;</button>
        </div>
      </template>

      <template v-slot:body>
        <div class="w-80 h-60">
          <div v-if="!card.checked" class="w-full h-full border-2 border-dashed rounded-lg">
            <CameraPad ref="userInput" v-if="selectedInput === 'Camera'" @change="saveInput"/>
            <SignaturePad ref="userInput" v-if="selectedInput === 'Krabbel'"/>
            <MessagePad ref="userInput" v-if="selectedInput === 'Bericht'"/>
          </div>
          <div v-else>
            <div v-if="LZString.decompress(card.signature).startsWith('data:image')" class="flex justify-center items-center">
              <img :src="LZString.decompress(card.signature)"/>
            </div>
            <div v-else>
              <p class="w-80 py-2 px-3 break-words">{{ LZString.decompress(card.signature) }}</p>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div v-if="!card.checked" class="flex">
            <div class="border-2 px-2 py-1 w-30 h-9 rounded-lg">
              <select v-model="selectedInput" class="outline-0">
                <option disabled value="">Opties:</option>
                <option v-for="option in inputOptions">{{ option }}</option>
              </select>
            </div>
            <button class="border-2 px-2 py1 w-24 h-9 rounded-lg" v-if="selectedInput !== 'Camera'" type="submit" @click="saveInput">
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
import { BingoCard } from '../../types/types';
import CameraPad from '../CameraPad.vue';
import BaseModal from '../modals/BaseModal.vue';
import SignaturePad from '../SignaturePad.vue';
import MessagePad from '../MessagePad.vue';
import { useBingoCardsStore } from '../../stores/useBingoCardStore';
import LZString from 'lz-string';
  const props = defineProps<{
    open: boolean,
    card: BingoCard,
  }>()
  const { updateCard } = useBingoCardsStore();
  const userInput = ref<typeof SignaturePad | typeof MessagePad | typeof CameraPad | null>(null);
  const inputOptions = [ 'Camera', 'Krabbel', 'Bericht' ]

  const selectedInput = ref(inputOptions[0]);

  const saveInput = async () => {
    const newCard = props.card;
    const signature = await userInput.value!.getInputString();
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
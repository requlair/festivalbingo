<template>
  <BaseModal
    :font="getTheme.name"
    :show="open"
    @close="handleClose"
  >
    <template #header>
      <h3>{{ card.text }}</h3>
    </template>

    <template #body>
      <div class="flex justify-center">
        <div class="h-60 w-80">
          <div
            v-if="!card.checked"
            class="w-full h-full border-2 border-dashed rounded-lg"
          >
            <CameraPad
              v-if="selectedInput.value === 'image'"
              ref="userInput"
              @change="saveInput"
            />
            <SignaturePad
              v-if="selectedInput.value === 'signature'"
              ref="userInput"
            />
            <MessagePad
              v-if="selectedInput.value === 'message'"
              ref="userInput"
            />
          </div>
          <div v-else>
            <div
              v-if="card.signature.startsWith('data:image')"
              class="flex justify-center"
            >
              <img :src="card.signature">
            </div>
            <div v-else>
              <p class="py-2 px-3 break-words">
                {{ card.signature }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div
        v-if="!card.checked"
        class="flex"
      >
        <Dropdown
          :selected-item="selectedInput"
          :items="inputOptions"
          :on-option-clicked="handleInputSelect"
        />
        <button
          v-if="selectedInput.value !== 'image'"
          class="border-2 px-2 py1 w-24 h-9 rounded-lg"
          type="submit"
          @click="saveInput"
        >
          Opslaan
        </button>
      </div>
      <div v-else>
        <button
          class="border-2 px-2 py1 w-24 h-9 rounded-lg"
          type="submit"
          @click="eraseInput"
        >
          Wissen
        </button>
      </div>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "../modals/BaseModal.vue";
import CameraPad from "../CameraPad.vue";
import SignaturePad from "../SignaturePad.vue";
import MessagePad from "../MessagePad.vue";
import Dropdown from "../dropdown/AppDropdown.vue";

import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useBingoCardsStore } from "../../stores/useBingoCardStore";
import { useSettingsStore } from "../../stores/useSettingsStore";
import { BingoCard, DropdownItem } from "../../types/types";

const props = defineProps<{
  open: boolean;
  card: BingoCard;
}>();

const { updateCard } = useBingoCardsStore();
const { getTheme } = storeToRefs(useSettingsStore());

const userInput = ref<
  typeof SignaturePad | typeof MessagePad | typeof CameraPad | null
>(null);

const inputOptions: DropdownItem[] = [
  { icon: "fas fa-camera", label: "Camera", value: "image" },
  { icon: "fas fa-pencil", label: "Krabbel", value: "signature" },
  { icon: "fas fa-message", label: "Bericht", value: "message" },
];
const selectedInput = ref(inputOptions[0]);
function handleInputSelect(value: string) {
  selectedInput.value = inputOptions.filter(
    (option) => option.value === value
  )[0];
}

const saveInput = async () => {
  if(!userInput.value) {
    return;
  }
  const signature = await userInput.value.getInputString();
  if (!signature) {
    return;
  }
  const newCard = props.card;
  newCard.signature = signature;
  newCard.checked = true;
  updateCard(newCard);
};
const eraseInput = () => {
  const newCard = props.card;
  newCard.signature = "";
  newCard.checked = false;
  updateCard(newCard);
};

const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};
</script>

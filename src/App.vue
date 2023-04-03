<template>
  <div class="fixed opacity-20 w-screen h-screen flex justify-center items-center">
    <img
      :src="`/images/${getTheme.logo}`"
      class="lg:mt-36 w-auto h-auto max-w-[90vw] max-h-[50vh]"
    >
  </div>
  <div 
    class="relative" 
    :style="{ fontFamily: getTheme.name }"
  >
    <header class="px-2 mt-4 h-24 md:h-32 lg:h-52 container mx-auto flex justify-center">
      <img
        class="max-h-24 md:max-h-32 lg:max-h-52"
        alt="header-image"
        :src="`/images/${getTheme.header}`"
      >
    </header>
    <BingoGame />
  </div>
  <footer class="relative container px-2 mx-auto h-24 md:h-32 lg:h-52 flex items-center">
    <div class="text-sm">
      <i class="far fa-copyright" />&thinsp;<a
        href="https://linkedin.com/in/lejon-bergman"
        target="_blank"
      ><span class="ml-1">Lejon Bergman</span></a>
      <a
        class="ml-1 cursor-pointer"
        @click="isDisclaimerModalOpen = true"
      >
        Disclaimer
      </a>
      <a
        class="ml-1 cursor-pointer"
        @click="isPrivacyModalOpen = true"
      >
        Privacy
      </a>
    </div>
  </footer>
  <DisclaimerModal
    :open="isDisclaimerModalOpen"
    @close="isDisclaimerModalOpen = false"
  />
  <PrivacyModal
    :open="isPrivacyModalOpen"
    @close="isPrivacyModalOpen = false"
  />
</template>

<script setup lang="ts">
import BingoGame from "./components/bingo/BingoGame.vue";
import DisclaimerModal from "./components/modals/DisclaimerModal.vue";

import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "./stores/useSettingsStore";
import PrivacyModal from "./components/modals/PrivacyModal.vue";

const { getTheme } = storeToRefs(useSettingsStore());
const isDisclaimerModalOpen = ref(false);
const isPrivacyModalOpen = ref(false);
</script>

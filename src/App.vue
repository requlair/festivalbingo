<template>
  <div class="fixed opacity-20 w-screen h-screen flex justify-center items-center">
    <img
      :src="getTheme.background"
      class="lg:mt-36 w-auto h-auto max-w-[90vw] max-h-[50vh]"
    >
  </div>
  <div 
    class="relative" 
    :style="{ fontFamily: getTheme.fontFamily }"
  >
    <header class="px-2 mt-4 h-24 md:h-32 lg:h-52 container mx-auto flex justify-center">
      <img
        class="max-h-24 md:max-h-32 lg:max-h-52"
        alt="header-image"
        :src="getTheme.header"
      >
    </header>
    <BingoGame />
    <footer class="container px-2 mx-auto h-24 md:h-32 lg:h-52 flex items-center">
      <div class="text-sm">
        <i class="far fa-copyright" />&thinsp;<a
          href="https://linkedin.com/in/lejon-bergman"
          target="_blank"
        >Lejon Bergman</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import BingoGame from "./components/bingo/BingoGame.vue";

import { storeToRefs } from "pinia";
import { useSettingsStore } from "./stores/useSettingsStore";

const { getTheme } = storeToRefs(useSettingsStore());
</script>

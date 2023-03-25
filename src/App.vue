<template>
  <div class="fixed opacity-20 w-screen h-screen flex justify-center items-center">
    <component :is="getTheme.background" class="w-[80vw] h-[80%]"></component>
  </div>
  <div class="relative" :style="{ fontFamily: getTheme.fontFamily }">
    <header class="p-2 h-24 md:h-32 lg:h-52 container mx-auto flex justify-center">
        <img class="max-h-24 md:max-h-32 lg:max-h-52" alt="header-image" :src="getTheme.header"/>
    </header>
    <BingoGame/>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BingoGame from './components/bingo/BingoGame.vue';
import { useSettingsStore } from './stores/useSettingsStore';

const { getTheme } = storeToRefs(useSettingsStore());
</script>

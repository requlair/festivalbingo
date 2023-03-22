<template>
      <div :style="{ backgroundImage: `url(${backgroundImg})`}" class="fixed opacity-20 w-screen h-screen bg-[length:350px_350px] bg-no-repeat bg-center"></div>
      <div class="relative">
        <header class="p-2 flex justify-center">
          <div class="max-w-2xl">
            <img alt="header-image" :src="headerImg"/>
          </div>
        </header>
        <BingoGame/>
      </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';
import BingoGame from './components/bingo/BingoGame.vue';
import { useSettingsStore } from './stores/useSettingsStore';

const { getSettings } = storeToRefs(useSettingsStore());

const headerImg = ref('default');
const backgroundImg = ref('default');

watchEffect(() => {
  document.querySelectorAll('body')[0].style.fontFamily = getSettings.value.fontFamily;
  import(/* @vite-ignore */ `./assets/images/${getSettings.value.headerImage}.png`).then((img) => headerImg.value = img.default);
  import(/* @vite-ignore */ `./assets/images/${getSettings.value.backgroundImage}.svg`).then((img) => backgroundImg.value = img.default);
})
</script>

<style>
</style>
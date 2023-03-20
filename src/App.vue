<template>
  <div>
      <header class="h-40 p-2 flex justify-center items-center">
        <img class="max-h-40" alt="header-image" :src="headerImg"/>
      </header>
      <BingoGame :style="{ backgroundImage: `url(${backgroundImg})` }" class="bg-fixed bg-center bg-[length:400px_400px] bg-no-repeat"/>
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

watchEffect(async () => {
  document.querySelectorAll('body')[0].style.fontFamily = getSettings.value.fontFamily;
  await import(/* @vite-ignore */ getSettings.value.headerImage).then((img) => headerImg.value = img.default);
  await import(/* @vite-ignore */ getSettings.value.backgroundImage).then((img) => backgroundImg.value = img.default);
})
</script>
<template>
  <div :style="{ backgroundImage: `url(${backgroundImg})` }" class="bg-fixed bg-[length:350px_350px] overflow-auto h-screen bg-center bg-no-repeat">
      <header class="h-40 p-2 flex justify-center items-center">
        <img class="max-h-40" alt="header-image" :src="headerImg"/>
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
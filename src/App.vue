<template>
      <!-- <div :style="{ backgroundImage: `url(${backgroundImg})`}" class="fixed opacity-20 w-screen h-screen bg-[length:350px_350px] bg-no-repeat bg-center"></div> -->
      <component :is="backgroundImg" class="fixed opacity-20 w-screen h-screen"></component>
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
import BingoLogo from './assets/logos/bingo-logo.vue';
import PaaspopLogo from './assets/logos/paaspop-logo.vue';
import LowlandsLogo from './assets/logos/lowlands-logo.vue';

const { getSettings } = storeToRefs(useSettingsStore());

const headerImg = ref('default');
const backgroundImg = ref(BingoLogo);

watchEffect(() => {
  document.querySelectorAll('body')[0].style.fontFamily = getSettings.value.fontFamily;
  import(/* @vite-ignore */ `./assets/images/${getSettings.value.headerImage}.png`).then((img) => headerImg.value = img.default);
  if (getSettings.value.backgroundImage === 'FB_Background') backgroundImg.value = BingoLogo;
  if (getSettings.value.backgroundImage === 'PP_Background') backgroundImg.value = PaaspopLogo;
  if (getSettings.value.backgroundImage === 'LL_Background') backgroundImg.value = LowlandsLogo;
})
</script>

<style>
</style>
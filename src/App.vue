<template>
      <!-- <div :style="{ backgroundImage: `url(${backgroundImg})`}" class="fixed opacity-20 w-screen h-screen bg-[length:350px_350px] bg-no-repeat bg-center"></div> -->
      <component :is="getTheme.background" class="fixed opacity-20 w-screen h-screen"></component>
      <div class="relative">
        <header class="p-2 flex justify-center">
          <div class="max-w-2xl">
            <img alt="header-image" :src="getTheme.header"/>
          </div>
        </header>
        <BingoGame/>
      </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import BingoGame from './components/bingo/BingoGame.vue';
import { useSettingsStore } from './stores/useSettingsStore';

const { getTheme } = storeToRefs(useSettingsStore());

watchEffect(() => {
  document.querySelectorAll('body')[0].style.fontFamily = getTheme.value.fontFamily;
})
</script>

<style>
</style>
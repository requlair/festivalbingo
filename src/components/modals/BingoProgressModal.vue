<template>
  <BaseModal
    :show="open"
    @close="handleClose"
  >
    <template #header>
      <h2>Behaalde Resultaten</h2>
    </template>
    <template #body>
      <p>
        Bekijk hier hoeveel Bingo categorieën je al hebt afgevinkt. Lig je goed op schema?
        Wie van jouw vrienden heeft de volste bingokaart? Ben jij de absolute Festival Bingo koning(in)?
      </p>
      <div class="mt-2">
        <h3>Voortgang:</h3>
        <div class="my-2 w-full bg-gray-200 rounded-full h-2.5">
          <div
            class="h-2.5 rounded-full"
            :style="{
              background: '#38AD33',
              width: `${progress.percentage}%`,
            }"
          />
        </div>
        <p class="text-xs">
          <span class="text-base bold">{{ progress.checked }} / {{ progress.total }}</span> categorieën afgevinkt
        </p>
      </div>
    </template>
    <template #footer>
      <h3>Prestaties:</h3>
      <div class="mt-2">
        <p
          v-if="!progress.checked"
          class="text-xs"
        >
          Nog niks? Ga eens aan het werk joh!
        </p>
        <div class="flex grid grid-cols-1 landscape:grid-cols-3 gap-4 text-xs">
          <div
            v-for="award in progress.awards"
            :key="award.checked"
          >
            <i
              :class="award.icon"
              class="mr-2"
              :style="{ color: award.color }"
            />{{ award.text }}
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "./BaseModal.vue";

import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBingoCardsStore } from "../../stores/useBingoCardStore";

defineProps<{ open: boolean }>();
const { getCards } = storeToRefs(useBingoCardsStore());

const achievements = [
  { checked: 1, icon: 'fa fa-award', color: '#ff0000', text: 'Je eerste, cute...'},
  { checked: 5, icon: 'fa fa-medal', color: '#cd7f32', text: 'Het begin is er...'},
  { checked: 15, icon: 'fa fa-medal', color: '#c0c0c0', text: 'Je bent op dreef...'},
  { checked: 27, icon: 'fa fa-medal', color: '#d4af37', text: 'Op de helft! Goed bezig!'},
  { checked: 34, icon: 'fa fa-trophy', color: '#cd7f32', text: 'Grote speler!'},
  { checked: 44, icon: 'fa fa-trophy', color: '#c0c0c0', text: 'Niet normaal, BAAS!'},
  { checked: 54, icon: 'fa fa-trophy', color: '#d4af37', text: 'Volle kaart, EINDBAAS!'},
];

const progress = computed(() => {
  const numberChecked = getCards.value.filter(
    (card) => card.checked === true
  ).length;
  const total = getCards.value.length;
  const awards = achievements.filter((achievement) => achievement.checked <= numberChecked)
  return {
    checked: numberChecked,
    total: total,
    percentage: (numberChecked / total) * 100,
    awards: awards
  };
});

const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};
</script>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

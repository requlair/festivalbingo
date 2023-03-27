<template>
  <BaseModal
    :show="open"
    @close="handleClose"
  >
    <template #header>
      <div class="flex justify-between">
        <h2>Over de Festival Bingo App</h2>
        <button
          @click="handleClose"
        >
          <i class="fas fa-xmark" />
        </button>
      </div>
    </template>
    <template #body>
      <p class="text-sm">
        De Festival Bingo App is een app om het wel bekende bingo spel te spelen op een festival. In plaats van nummers afvinken,
        moet je bij Festival Bingo op zoek naar personen die aan de categorie voldoen. Laat die persoon de categorie in de app afvinken
        door het achterlaten van een selfie, krabbel of berichtje. In totaal zijn er 54 categorieën om af te vinken.
      </p>
      <h4 class="my-2">
        Menu's
      </h4>
      <ul class="text-xs">
        <li><i class="fa fa-trophy" />&nbsp;Resultaten menu, hier zie je hoe ver je al bent.</li>
        <li><i class="fa fa-share-nodes" />&nbsp;Delen menu, hier kun je de Fesitval Bingo App gemakkelijk met anderen delen.</li>
        <li><i class="far fa-circle-question" />&nbsp;Info menu, hier ben je nu.</li>
        <li><i class="fa fa-gear" />&nbsp;Instellingen menu, hier kun je de app aanpassen naar de look and feel die jij wilt.</li>
      </ul>
    </template>
  </BaseModal>
</template>
  
  <script setup lang="ts">
  import BaseModal from "../modals/BaseModal.vue";
  
  defineProps<{ open: boolean }>();
  
  const emit = defineEmits(["close"]);
  const handleClose = () => {
    emit("close");
  };
  </script>
  
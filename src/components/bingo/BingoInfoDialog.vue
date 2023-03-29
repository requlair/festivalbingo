<template>
  <BaseModal
    :show="open"
    @close="handleClose"
  >
    <template #header>
      <h2>Over de Festival Bingo App</h2>
    </template>
    <template #body>
      <p>
        Festival Bingo is een spel geïnspireerd op het welbekende bingo. In plaats van nummers afvinken,
        moet je bij Festival Bingo op een festival zoeken naar personen die aan de bingo categorieën voldoen. Laat die persoon de categorie in de app afvinken
        door het achterlaten van een selfie, krabbel of berichtje. In totaal zijn er 54 categorieën om af te vinken.
      </p>
      <p class="italic mt-1">
        Festival Bingo slaat alle ingevoerde selfies, krabbels, berichtjesen instellingen alleen op jouw device op. Alle data blijft dus alleen 
        van jouw en je privacy is gewaardborgd.
      </p>
    </template>
    <template #footer>
      <h3>
        Let's get started!
      </h3>
      <p class="my-1">
        Je kunt natuurlijk meteen beginnen met het spelen van Festival Bingo, maar om het nóg leuker te maken kun je de look and feel van de 
        app aanpassen in het <i class="fa fa-gear" /> instellingen menu, kun je je progressie bekijken in het <i class="fa fa-trophy" />
        prestaties menu en kun de app delen via het <i class="fa fa-share-nodes" /> delen menu,
      </p>
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
  
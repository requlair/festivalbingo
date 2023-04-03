<template>
  <BaseModal
    :show="open"
    @close="handleClose"
  >
    <template #header>
      <h2>Privacy</h2>
    </template>
    <template #body>
      <h4>Data Opslag</h4>
      <p class="text-xs">
        Festival Bingo slaat alle ingevoerde selfies, krabbels, berichtjesen instellingen alleen op het device van de gebruiker op. Alle data blijft eigendom van de gebruiker.
      </p>
      <h4 class="mt-1">
        Cookies
      </h4>
      <p class="text-xs">
        Festival Bingo gebruikt Google Analytics-cookies om in te kunnen zien hoe vaak app gebruikt wordt. Festival Bingo heeft bij het privacy vriendelijk instellen van de Google Analytics-cookies de 
        <a
          class="underline"
          href="https://autoriteitpersoonsgegevens.nl/sites/default/files/atoms/files/handleiding_privacyvriendelijk_instellen_google_analytics_april_22.pdf"
        >'Handleiding privacyvriendelijk instellen van Google Analytics'</a>
        van de Autriteit Persoonsgegevens gevolgd. Festival Bingo heeft hiervoor een bewerkersovereenkomst met Google gesloten. Gebruikersgegevens worden anoniem verwerkt, zo wordt het laatste octet van het IP adres van de gebruiker gemaskeerd. 
        Er wordt in geen geval gegevens gedeeld met Google of derden.
        De verzamelde gegevens worden niet gebruikt voor advertentiedoeleinden, zoals retargeting via social media of andere Google-diensten.
        Voor meer informatie over Google Analytics cookies, zie de
        <a
          class="underline"
          href="https://analytics.google.com/"
        >officiële Google Analytics website</a>.
      </p>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from './BaseModal.vue';

defineProps<{ open: boolean }>();
const emit = defineEmits(["close"]);
const handleClose = () => {
    emit("close");
};
</script>
<template>
  <BaseModal
    :show="open"
    @close="handleClose"
  >
    <template #header>
      <h2>Disclaimer</h2>
    </template>
    <template #body>
      <h4>Gebruiksvoorwaarden</h4>
      <p class="text-xs">
        Deze website is niet bestemd voor commerciële doeleinden. De gebruiker is niet gemachtigd om informatie die wordt verkregen
        via deze website op welke manier en onder welke vorm dan ook commercieel naar buiten te brengen zonder schriftelijke toestemming van Festival Bingo.
      </p>
      <h4>Aansprakelijkheid</h4>
      <p class="text-xs">
        De website van Festival Bingo is zo zorgvuldig mogelijk samengesteld. Mochten er desondanks onjuistheden in deze website staan, 
        dan kan Festival Bingo hiervoor niet aansprakelijk gesteld worden. Aan eventuele onjuistheden of onvolledigheden kunnen geen rechten worden ontleend.
        Festival Bingo kan evenmin aansprakelijk gesteld worden indien zich, door het gebruik van (informatie van) deze site of de erin opgenomen links,
        bij de raadpleger schade zou voordoen van welke aard ook.
      </p>
      <h4>Intellectueel eigendom</h4>
      <p class="text-xs">
        De op deze website getoonde informatie, waaronder fonts, afbeeldingen en grafisch materiaal, merken, logo’s en (handels)namen,
        zijn eigendom van de eigenaar van de site, en worden beschermd door auteursrecht, merkenrecht en/of enig ander intellectueel eigendomsrecht.
        Deze informatie blijft eigendom van de eigenaar of derden. De inhoud van deze website mag alleen worden gebruikt voor niet-commerciële doeleinden.
        Het is voor de gebruiker van de website niet toegestaan de inhoud van de website op welke wijze dan ook te verveelvoudigen,
        bijvoorbeeld door de inhoud door te sturen of te distribueren dan wel (tegen vergoeding) beschikbaar te stellen aan derden 
        zonder voorafgaande schriftelijke toestemming van Festival Bingo.
      </p>
    </template>
  </BaseModal>
</template>
    
<script setup lang="ts">
import BaseModal from "./modals/BaseModal.vue";

defineProps<{ open: boolean }>();

const emit = defineEmits(["close"]);
const handleClose = () => {
    emit("close");
};
</script>
    
<template>
  <BaseModal
    :show="open"
    @close="handleClose"
  >
    <template #header>
      <h2>Deel deze app!</h2>
    </template>
    <template #body>
      <div class="grid landscape:grid-cols-2">
        <div class="flex flex-col">
          <p class="py-2 break-words">
            Ben je ook zo lekker aan het bingoën maar willen je vrienden & vriendinnen
            mee doen? Dat kan! Je kunt ze de QR code laten scannen of de app delen
            via social media of de link.
          </p>
          <div class="flex">
            <ShareNetwork
              v-for="network, index in socials.networks"
              :key="index"
              class="border-2 w-9 h-9 flex justify-center items-center border-2 rounded-lg mr-1"
              :network="network.name"
              :url="socials.link"
              :title="socials.title"
              :description="socials.description"
              :hashtags="socials.hashTags"
            >
              <i :class="network.logo" />
            </ShareNetwork>
            <button
              class="px-2 h-9 flex justify-center items-center border-2 rounded-lg mr-1"
              @click="copyLink"
            >
              Kopieer de link
            </button>
          </div>
        </div>
        <div class="flex justify-center portrait:mt-4">
          <qrcode-vue
            value="https://requlair.github.io/festivalbingo"
            level="H"
            :size="150"
          />
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "../modals/BaseModal.vue";
import QrcodeVue from "qrcode.vue";

import { ref } from "vue";

defineProps<{ open: boolean }>();

const link = ref("https://requlair.github.io/festivalbingo");
const socials = ref({
  networks: [
    { name: "whatsapp", logo: "fab fa-whatsapp" },
    { name: "facebook", logo: "fab fa-facebook" },
    { name: "twitter", logo: "fab fa-twitter" },
  ],
  link: link.value,
  title: "Bingo mee met de Festival Bingo App",
  description:
    "Ga op de festivalweide op zoek naar de meeste extravagante figuren en vink ze af op je bingokaart!",
  hashTags: "FestivalBingo",
});
const copyLink = async () => {
  await navigator.clipboard.writeText(
    `Bingo mee met de Festival Bingo App: ${link.value}`
  );
};

const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};
</script>

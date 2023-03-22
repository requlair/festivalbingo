<template>
    <BaseModal :show="open" @close="handleClose">
        <template v-slot:header>
            <div class="w-80 flex justify-between">
                <h2 class="w-[300px]">Deel deze app!</h2>
                <button @click="handleClose">&#10761;</button>
            </div>
        </template>
        <template v-slot:body>
            <p class="w-80 py-2 break-words">
                Ben je ook zo lekker aan het bingoën maar willen je vrienden/vriendinnen mee doen? Dat kan!
                Je kunt ze de QR code laten scannen of de app delen via social media of de link.
            </p>
            <div class="flex justify-center">
                <ShareNetwork v-for="network in socials.networks"
                class="border-2 w-9 h-9 flex justify-center items-center border-2 rounded-lg mr-1"
                :network="network.name"
                :url="socials.link"
                :title="socials.title"
                :description="socials.description"
                :hashtags="socials.hashTags"
                >
                    <img class="icon" :src="network.logo"/>
                </ShareNetwork>
                <button 
                    class="px-2 h-9 flex justify-center items-center border-2 rounded-lg mr-1"
                    @click="copyLink"
                >Kopieer de link</button>
            </div>
            <div class="flex justify-center mt-4">
                <qrcode-vue value="https://requlair.github.io/festivalbingo" level="H" />
            </div>

        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '../modals/BaseModal.vue';
import QrcodeVue from 'qrcode.vue'
import { ref } from 'vue';
import Facebook from '../../assets/images/facebook-logo.svg';
import Whatsapp from '../../assets/images/whatsapp-logo.svg';
import Twitter from '../../assets/images/twitter-logo.svg';

defineProps<{ open: boolean }>()

const socials = ref({
    networks: [{ name: 'whatsapp', logo: Whatsapp }, 
               { name: 'facebook', logo: Facebook },
               { name: 'twitter', logo: Twitter }
              ],
    link: 'https://requlair.github.io/festivalbingo',
    title: 'Bingo mee met de Festival Bingo App',
    description: "Ga op de festivalweide op zoek naar de meeste extravagante figuren en vink ze af op je bingokaart!",
    hashTags: 'FestivalBingo'
})
const link = ref('https://requlair.github.io/festivalbingo');

const copyLink = async () => {
    await navigator.clipboard.writeText(`Bingo mee met de Festival Bingo App: ${link.value}`)
}

const emit = defineEmits(['close'])
const handleClose = () => {
    emit('close');
}
</script>

<style scoped>
.icon {
    width: 24px;
    height: 24px;
}
</style>
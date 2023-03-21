import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import VueSocialSharing from 'vue-social-sharing';

createApp(App)
.use(createPinia())
.use(VueSocialSharing)
.mount('#app');

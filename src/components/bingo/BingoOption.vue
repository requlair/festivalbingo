<template>
    <div>
        <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="49" :stroke="getSettings.borderColor" stroke-width="2" fill="none"/>
            <foreignObject height="70" width="70" x="15" y="15">
                <div class="w-full h-full flex justify-center items-center">
                    <p class="text-center font-bold text-[50%]">{{ text }}</p>
                </div>
            </foreignObject>
            <path v-if="checked" fill='green' transform='translate(10,15)' d='M 0 34.207031 L 14.585938 34.011719 C 20.453125 37.445312 25.417969 41.730469 29.507812 46.761719 L 29.582031 46.859375 C 40.371094 28.882812 53.082031 13.457031 67.734375 0.160156 L 67.914062 0 L 79.027344 0 C 60.441406 20.644531 44.167969 43.957031 30.960938 69.152344 L 30.078125 71 C 23.152344 56.078125 13.503906 43.515625 0 34.207031 Z M 0 34.207031'/>;
        </svg>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '../../stores/useSettingsStore';

defineProps({
    text: { type: String, required: true },
    checked: { type: Boolean, required: true }
})
const { getSettings } = storeToRefs(useSettingsStore());
</script>

import { defineStore } from 'pinia';
import { RemovableRef, useStorage } from '@vueuse/core';
import { stringify, parse } from 'zipson';
import { Settings } from '../types/types';

import FestivalHeader from '../assets/images/FB_Header.png';
import PaaspopHeader from '../assets/images/PP_Header.png';
import LowlandsHeader from '../assets/images/LL_Header.png';

import FestivalBackground from '../assets/logos/bingo-logo.vue';
import PaaspopBackground from '../assets/logos/paaspop-logo.vue';
import LowlandsBackground from '../assets/logos/lowlands-logo.vue';

export const useSettingsStore = defineStore('settings', {
    state: (): State => ({
        settings: useStorage('settings', defaultSettings, undefined, {
            serializer: {
                read: (value: string) => value ? parse(value) : null,
                write: (value: Settings) => stringify(value),
            },
        }),
    }),
    getters: {
        getSettings(): Settings {
            return this.settings;
        },
        getTheme(): typeof themes[keyof typeof themes] {
            const index = this.settings.theme as keyof typeof themes
            return themes[index];
        },
        getGrid(): string {
            return this.settings.gridColumns;
        }
    },
    actions: {
        updateSettings(newSettings: Settings) {
            this.settings = newSettings;
        },
        updateTheme(newTheme: string) {
            this.settings.theme = newTheme;
        },
        updateGridColumns(newGridColumns: string) {
            this.settings.gridColumns = newGridColumns;
        },
        resetSettings () {
            this.settings = defaultSettings;
        }
    }
});

const defaultSettings: Settings = {
    theme: 'festival',
    gridColumns: 'grid-cols-2',
};

const themes = {
    'festival': {
        header: FestivalHeader,
        background: FestivalBackground,
        fontFamily: 'Festival',
        colors: ['rgb(240,56,51)','rgb(36,110,181)','rgb(109,190,72)','rgb(249,206,68)','rgb(140,104,173)']
    },
    'paaspop': {
        header: PaaspopHeader,
        background: PaaspopBackground,
        fontFamily: 'Paaspop',
        colors: ['#7e10ff']
    },
    'lowlands': {
        header: LowlandsHeader,
        background: LowlandsBackground,
        fontFamily: 'Lowlands',
        colors: ['rgb(201,105,152)']
    }
};

interface State {
    settings: RemovableRef<Settings>
}


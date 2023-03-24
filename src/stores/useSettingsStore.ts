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
        fontFamily: 'festival',
        color: '#000000'
    },
    'paaspop': {
        header: PaaspopHeader,
        background: PaaspopBackground,
        fontFamily: 'paaspop',
        color: '#7e10ff'
    },
    'lowlands': {
        header: LowlandsHeader,
        background: LowlandsBackground,
        fontFamily: 'lowlands',
        color: '#e30012'
    }
};

interface State {
    settings: RemovableRef<Settings>
}


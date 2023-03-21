import { defineStore } from 'pinia';
import { RemovableRef, useStorage } from '@vueuse/core';
import { stringify, parse } from 'zipson';
import { ThemeSettings } from '../types/types';

const defaultSettings: ThemeSettings = {
    name: 'festival',
    fontFamily: 'festival',
    headerImage: 'FB_Header',
    backgroundImage: 'FB_Background',
    borderColor: '#000000'
}

export const useSettingsStore = defineStore('settings', {
    state: (): State => ({
        themeSettings: useStorage('theme-settings', defaultSettings, undefined, {
            serializer: {
                read: (value: string) => value ? parse(value) : null,
                write: (value: ThemeSettings) => stringify(value),
            },
        }),
    }),
    getters: {
        getSettings(): ThemeSettings {
            return this.themeSettings;
        },
    },
    actions: {
        updateSettings(newSettings: ThemeSettings) {
            this.themeSettings = newSettings;
        },
    }
});

interface State {
    themeSettings: RemovableRef<ThemeSettings>
}

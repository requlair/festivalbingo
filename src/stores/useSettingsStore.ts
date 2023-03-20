import { defineStore } from 'pinia';
import { RemovableRef, useStorage } from '@vueuse/core';
import { stringify, parse } from 'zipson';

const defaultSettings: Settings = {
    fontFamily: 'default',
    headerImage: 'default',
    backgroundImage: 'default'

}

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
    },
    actions: {
        updateSettings(newSettings: Settings) {
            this.settings = newSettings;
        },
    }
});

interface State {
    settings: RemovableRef<Settings>
}

interface Settings {
    fontFamily: string,
    headerImage: string,
    backgroundImage: string,
}

import { defineStore } from "pinia";
import { RemovableRef, useStorage } from "@vueuse/core";
import { stringify, parse } from "zipson";
import { Settings, Theme } from "../types/types";

export const useSettingsStore = defineStore("settings", {
  state: (): State => ({
    settings: useStorage("settings", defaultSettings, undefined, {
      serializer: {
        read: (value: string) => (value ? parse(value) : null),
        write: (value: Settings) => stringify(value),
      },
    }),
  }),
  getters: {
    getSettings(): Settings {
      return this.settings;
    },
    getTheme(): Theme {
      return {
        name: this.settings.theme,
        header: `${this.settings.theme}-header.png`,
        logo: `${this.settings.theme}-logo.png`,
        color: themeColors[this.settings.theme as keyof typeof themeColors]
      }
    },
    getGrid(): string {
      return this.settings.gridColumns;
    },
    getCookiesDisabled(): boolean {
      return this.settings.disableCookies;
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
    updateCookiesDisabled(newValue: boolean) {
      this.settings.disableCookies = newValue;
    },
    resetSettings() {
      this.settings = {
        theme: defaultSettings.theme,
        gridColumns: defaultSettings.gridColumns,
        disableCookies: this.settings.disableCookies
      };
    },
  },
});

const defaultSettings: Settings = {
  theme: "festival",
  gridColumns: "grid-cols-2",
  disableCookies: false,
};

const themeColors = {
  festival: "rgb(47, 116, 184)",
  paaspop: "#7e10ff",
  lowlands: "rgb(201,105,152)",
  dtrh: '#FF92A5',
  pinkpop: '#130092',
}

interface State {
  settings: RemovableRef<Settings>;
}

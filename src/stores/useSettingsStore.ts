import { defineStore } from "pinia";
import { RemovableRef, useStorage } from "@vueuse/core";
import { stringify, parse } from "zipson";
import { Settings } from "../types/types";

import FestivalHeader from "/images/festival-header.png";
import PaaspopHeader from "/images/paaspop-header.png";
import LowlandsHeader from "/images/lowlands-header.png";
import DTRHHeader from "/images/dtrh-header.png";
import PinkpopHeader from "/images/pinkpop-header.png";

import FestivalLogo from "/images/festival-logo.png";
import PaaspopLogo from "/images/paaspop-logo.png";
import LowlandsLogo from "/images/lowlands-logo.png";
import DTRHLogo from "/images/dtrh-logo.png";
import PinkpopLogo from "/images/pinkpop-logo.png";

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
    getTheme(): typeof themes[keyof typeof themes] {
      const index = this.settings.theme as keyof typeof themes;
      return themes[index];
    },
    getGrid(): string {
      return this.settings.gridColumns;
    },
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
    resetSettings() {
      this.settings = defaultSettings;
    },
  },
});

const defaultSettings: Settings = {
  theme: "festival",
  gridColumns: "grid-cols-2",
};

const themes = {
  festival: {
    header: FestivalHeader,
    background: FestivalLogo,
    fontFamily: "Festival",
    colors: ["rgb(47, 116, 184)"],
  },
  paaspop: {
    header: PaaspopHeader,
    background: PaaspopLogo,
    fontFamily: "Paaspop",
    colors: ["#7e10ff"],
  },
  lowlands: {
    header: LowlandsHeader,
    background: LowlandsLogo,
    fontFamily: "Lowlands",
    colors: ["rgb(201,105,152)"],
  },
  dtrh: {
    header: DTRHHeader,
    background: DTRHLogo,
    fontFamily: 'DTRH',
    colors: ['#FF92A5'],
  },
  pinkpop: {
    header: PinkpopHeader,
    background: PinkpopLogo,
    fontFamily: 'Pinkpop',
    colors: ['#130092']
  }
};

interface State {
  settings: RemovableRef<Settings>;
}

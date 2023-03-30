import { defineStore } from "pinia";
import { RemovableRef, useStorage } from "@vueuse/core";
import { stringify, parse } from "zipson";
import LZString from 'lz-string';
import bingoCards from "../assets/data/bingo-data.json";
import { BingoCard } from "../types/types";

export const useBingoCardsStore = defineStore("bingoCards", {
  state: (): State => ({
    cards: useStorage("bingo-cards", () => { LZString.compress(stringify(bingoCards))}, undefined, {
      serializer: {
        read: (value: string) => (value ? parse(LZString.decompress(value)) : null),
        write: (value: BingoCard[]) => LZString.compress(stringify(value)),
      },
    }),
  }),
  getters: {
    getCards(): BingoCard[] {
      return this.cards;
    },
  },
  actions: {
    updateCard(newCard: BingoCard) {
      const index = this.cards.findIndex((card) => card.id === newCard.id);
      if (index === -1) {
        return;
      }
      this.cards[index] = newCard;
    },
    resetCards() {
      this.cards = bingoCards;
    },
  },
});

interface State {
  cards: RemovableRef<BingoCard[]>;
}

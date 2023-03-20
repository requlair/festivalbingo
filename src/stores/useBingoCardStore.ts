import { defineStore } from 'pinia';
import { RemovableRef, useStorage } from '@vueuse/core';
import { stringify, parse } from 'zipson';
import bingoCards from '../assets/data/bingo-data.json';
import { BingoCard } from '../types/types';

export const useBingoCardsStore = defineStore('bingoCards', {
    state: (): State => ({
        cards: useStorage('bingo-cards', () => bingoCards, undefined, {
            serializer: {
                read: (value: string) => value ? parse(value) : null,
                write: (value: BingoCard[]) => stringify(value),
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
            const index = this.cards.findIndex(card => card.id === newCard.id);
            if (index === -1) {
                return;
            }
            this.cards[index] = newCard;
        },
    }
});

interface State {
    cards: RemovableRef<BingoCard[]>
}

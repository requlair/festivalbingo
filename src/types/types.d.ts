import { Component } from "vue";

export type BingoCard = {
    id: number,
    text: string,
    checked: boolean,
    signature: string,
}

export type DropdownItem = {
    label: string,
    value: string,
    icon?: string,
    logo?: Component,
}

export type Settings = {
    theme: string;
}
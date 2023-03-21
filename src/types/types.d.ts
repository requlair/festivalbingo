export type BingoCard = {
    id: number,
    text: string,
    checked: boolean,
    signature: string,
}

export type DropdownItem = {
    label: string,
    value: string,
    icon: string,
}

export type ThemeSettings = {
    name: string;
    fontFamily: string,
    headerImage: string,
    backgroundImage: string,
    borderColor: string,
}
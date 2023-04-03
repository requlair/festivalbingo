export type BingoCard = {
  id: number;
  text: string;
  checked: boolean;
  signature: string;
};

export type DropdownItem = {
  label?: string;
  value: string;
  icon?: string;
  logo?: string;
};

export type Settings = {
  theme: string;
  gridColumns: string;
};

export type Theme = {
  name: string,
  header: string,
  logo: string,
  color: string,
}

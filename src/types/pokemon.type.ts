export interface IPokemon {
  id: number;
  name: string;
  types: string[];
  past_types?: string[];
  descriptions: string[];
}

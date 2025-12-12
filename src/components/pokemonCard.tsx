import { IPokemon } from '../types/pokemon.type.ts';

export function PokemonCard({ descriptions }: IPokemon) {
  return <div>{descriptions[0]}</div>;
}

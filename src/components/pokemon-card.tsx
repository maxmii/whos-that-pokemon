import { IPokemon } from '../types/pokemon.type.ts';

export function PokemonCard({ name }: IPokemon) {
  return <div>{name}</div>;
}

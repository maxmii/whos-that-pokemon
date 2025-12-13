import Pokedex from 'pokeapi-js-wrapper';
import { IPokemon } from '../types/pokemon.type.ts';

export function mapPokemonData(
  pokemonData: Pokedex.PokemonSpecies,
  pokemonTypes: Pokedex.PokemonType[]
): IPokemon {
  return {
    name: pokemonData.name,
    id: pokemonData.id,
    types: pokemonTypes.map((typeInfo) => typeInfo.type.name),
    descriptions: pokemonData.flavor_text_entries
      .filter(
        (entry: Pokedex.PokemonSpeciesFlavorTextEntry) =>
          entry.language.name === 'en'
      )
      .map((entry: Pokedex.PokemonSpeciesFlavorTextEntry) =>
        redactPokemonInfo(pokemonData.name, entry.flavor_text)
      ),
  };
}

function redactPokemonInfo(pokemonName: string, info: string) {
  const regex = new RegExp(pokemonName, 'gi');
  return info.replace(regex, '[redacted]');
}

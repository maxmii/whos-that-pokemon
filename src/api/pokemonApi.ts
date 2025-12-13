import * as Pokedex from 'pokeapi-js-wrapper';

let pokedex: Pokedex.Pokedex | undefined;

function getPokedex(): Pokedex.Pokedex {
  pokedex ??= new Pokedex.Pokedex();
  return pokedex;
}

export async function fetchPokemonSpeciesById(
  id: number
): Promise<Pokedex.PokemonSpecies> {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error('id must be a positive number');
  }
  return getPokedex().getPokemonSpeciesByName(id);
}

export async function fetchPokemonTypesById(
  id: number
): Promise<Pokedex.PokemonType[]> {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error('id must be a positive number');
  }
  const pokemon = await getPokedex().getPokemonByName(id);

  return pokemon.types;
}

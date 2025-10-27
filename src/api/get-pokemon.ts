import Pokedex from 'pokeapi-js-wrapper';

let pokedex: Pokedex.Pokedex | undefined;


function getPokedex(): Pokedex.Pokedex {
  pokedex ??= new Pokedex.Pokedex();
  return pokedex;
}

export async function getPokemonById(id: number): Promise<Pokedex.Pokemon> {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error('id must be a positive number');
  }
  return getPokedex().getPokemonByName(id);
}

export async function getPokemonByName(name: string): Promise<Pokedex.Pokemon> {
  if (name.trim().length === 0) {
    throw new Error('name must not be empty');
  }

  return getPokedex().getPokemonByName(name);
}


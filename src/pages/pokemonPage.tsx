import type { ReactElement } from 'react';
import { getPokemonHook } from '../hooks/getPokemonHook';
import getRandomPokemonId from '../utils/random-pokemon';

function PokemonPage(): ReactElement {
  const pokemonId = getRandomPokemonId();
  const { pokemon, loading, error } = getPokemonHook(pokemonId);

  return (
    <div>
      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && !pokemon && (
        <div>
          <p>No pokemon found</p>
        </div>
      )}

      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
        </div>
      )}
    </div>
  );
}

export default PokemonPage;

import type { ReactElement } from 'react';
import { useState } from 'react';
import { usePokemonHook } from '../hooks/getPokemonHook';
import getRandomPokemonId from '../utils/random-pokemon';

function PokemonPage(): ReactElement {
  const [pokemonId] = useState(() => getRandomPokemonId());
  const { pokemon, loading, error } = usePokemonHook(pokemonId);

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

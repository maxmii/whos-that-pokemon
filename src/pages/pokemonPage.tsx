import type { ReactElement } from 'react';
import { useState } from 'react';
import { usePokemonHook } from '../hooks/getPokemonHook';
import getRandomPokemonId from '../utils/random-pokemon';
import getRandomDescription from '../utils/random-description.ts';

function PokemonPage(): ReactElement {
  const [pokemonId] = useState(() => getRandomPokemonId());
  const { pokemon, loading, error } = usePokemonHook(pokemonId);

  const randomDescription = getRandomDescription(pokemon?.descriptions);

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

      {!loading && !error && !pokemon && !randomDescription && (
        <div>
          <p>No pokemon found</p>
        </div>
      )}

      {pokemon && (
        <div>
          <p>{randomDescription}</p>
        </div>
      )}
    </div>
  );
}

export default PokemonPage;

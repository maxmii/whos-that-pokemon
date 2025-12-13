import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { usePokemonHook } from '../hooks/getPokemonHook';
import getRandomPokemonId from '../utils/randomPokemon.ts';
import getRandomDescription from '../utils/randomDescription.ts';
import { toTitleCase } from '../utils/toTitlecase.ts';
import { ToggleButton, LoadingState, ErrorState } from '../components';

function PokemonPage(): ReactElement {
  const [pokemonId] = useState(() => getRandomPokemonId());
  const [showName, setShowName] = useState(false);
  const { pokemon, loading, error } = usePokemonHook(pokemonId);

  const randomDescription = useMemo(() => {
    return getRandomDescription(pokemon?.descriptions);
  }, [pokemon?.descriptions]);

  const buttonLabel = showName ? 'Hide Pokemon' : 'Show Pokemon';

  return (
    <div>
      {loading && <LoadingState />}

      {error && <ErrorState error={error} />}

      {!loading && !error && !pokemon && !randomDescription && (
        <div>
          <p>No pokemon found</p>
        </div>
      )}

      {pokemon && (
        <div>
          {showName && <h3>{toTitleCase(pokemon?.name)}</h3>}
          <p>{randomDescription}</p>
          <ToggleButton
            label={buttonLabel}
            onClickFunction={() => setShowName(!showName)}
          />
        </div>
      )}
    </div>
  );
}

export default PokemonPage;

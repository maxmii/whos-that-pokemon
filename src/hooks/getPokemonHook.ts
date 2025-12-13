import { IPokemon } from '../types/pokemon.type.ts';
import { useEffect, useState } from 'react';
import {
  fetchPokemonSpeciesById,
  fetchPokemonTypesById,
} from '../api/pokemonApi.ts';
import { mapPokemonData } from '../mappers/pokemonMapper.ts';

export const usePokemonHook = (pokemonId: number) => {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const types = await fetchPokemonTypesById(pokemonId);
        const pokemonSpecies = await fetchPokemonSpeciesById(pokemonId);
        const pokemon = mapPokemonData(pokemonSpecies, types);

        if (isMounted) {
          setPokemon(pokemon);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to fetch Pokemon sorry :('
          );
          setPokemon(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadPokemon();

    return () => {
      isMounted = false;
    };
  }, [pokemonId]);

  return { pokemon, loading, error };
};

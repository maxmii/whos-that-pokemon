import { describe, it, expect } from 'vitest';
import { mapPokemonData } from './pokemonMapper';
import type Pokedex from 'pokeapi-js-wrapper';

describe('mapPokemonData', () => {
  it('should map pokemon data correctly', () => {
    const mockPokemonData: Pokedex.PokemonSpecies = {
      name: 'pikachu',
      id: 25,
      flavor_text_entries: [
        {
          flavor_text: 'pikachu is an electric mouse.',
          language: { name: 'en', url: '' },
          version: { name: 'red', url: '' },
        },
        {
          flavor_text: 'Pikachu est une souris électrique.',
          language: { name: 'fr', url: '' },
          version: { name: 'red', url: '' },
        },
      ],
    } as Pokedex.PokemonSpecies;

    const mockTypes: Pokedex.PokemonType[] = [
      { type: { name: 'electric', url: '' } } as Pokedex.PokemonType,
    ];

    const result = mapPokemonData(mockPokemonData, mockTypes);

    expect(result.name).toBe('pikachu');
    expect(result.id).toBe(25);
    expect(result.types).toEqual(['electric']);
    expect(result.descriptions).toHaveLength(1);
    expect(result.descriptions[0]).toBe('[redacted] is an electric mouse.');
  });

  it('should filter only English descriptions', () => {
    const mockPokemonData: Pokedex.PokemonSpecies = {
      name: 'bulbasaur',
      id: 1,
      flavor_text_entries: [
        {
          flavor_text: 'English text',
          language: { name: 'en', url: '' },
          version: { name: 'red', url: '' },
        },
        {
          flavor_text: 'Japanese text',
          language: { name: 'ja', url: '' },
          version: { name: 'red', url: '' },
        },
        {
          flavor_text: 'Another English',
          language: { name: 'en', url: '' },
          version: { name: 'blue', url: '' },
        },
      ],
    } as Pokedex.PokemonSpecies;

    const mockTypes: Pokedex.PokemonType[] = [
      { type: { name: 'grass', url: '' } } as Pokedex.PokemonType,
      { type: { name: 'poison', url: '' } } as Pokedex.PokemonType,
    ];

    const result = mapPokemonData(mockPokemonData, mockTypes);

    expect(result.descriptions).toHaveLength(2);
    expect(result.types).toEqual(['grass', 'poison']);
  });

  it('should redact pokemon name from description', () => {
    const mockPokemonData: Pokedex.PokemonSpecies = {
      name: 'charmander',
      id: 4,
      flavor_text_entries: [
        {
          flavor_text: 'Charmander has a flame on its tail.',
          language: { name: 'en', url: '' },
          version: { name: 'red', url: '' },
        },
      ],
    } as Pokedex.PokemonSpecies;

    const mockTypes: Pokedex.PokemonType[] = [
      { type: { name: 'fire', url: '' } } as Pokedex.PokemonType,
    ];

    const result = mapPokemonData(mockPokemonData, mockTypes);

    expect(result.descriptions[0]).toBe('[redacted] has a flame on its tail.');
    expect(result.descriptions[0]).not.toContain('charmander');
  });

  it('should handle empty descriptions', () => {
    const mockPokemonData: Pokedex.PokemonSpecies = {
      name: 'missingno',
      id: 0,
      flavor_text_entries: [],
    } as unknown as Pokedex.PokemonSpecies;

    const mockTypes: Pokedex.PokemonType[] = [];

    const result = mapPokemonData(mockPokemonData, mockTypes);

    expect(result.descriptions).toEqual([]);
    expect(result.types).toEqual([]);
  });

  it('should handle multiple types correctly', () => {
    const mockPokemonData: Pokedex.PokemonSpecies = {
      name: 'charizard',
      id: 6,
      flavor_text_entries: [
        {
          flavor_text: 'A flying fire type.',
          language: { name: 'en', url: '' },
          version: { name: 'red', url: '' },
        },
      ],
    } as Pokedex.PokemonSpecies;

    const mockTypes: Pokedex.PokemonType[] = [
      { type: { name: 'fire', url: '' } } as Pokedex.PokemonType,
      { type: { name: 'flying', url: '' } } as Pokedex.PokemonType,
    ];

    const result = mapPokemonData(mockPokemonData, mockTypes);

    expect(result.types).toHaveLength(2);
    expect(result.types).toContain('fire');
    expect(result.types).toContain('flying');
  });

  it('should not redact if pokemon name is not in description', () => {
    const mockPokemonData: Pokedex.PokemonSpecies = {
      name: 'squirtle',
      id: 7,
      flavor_text_entries: [
        {
          flavor_text: 'A small turtle pokemon.',
          language: { name: 'en', url: '' },
          version: { name: 'red', url: '' },
        },
      ],
    } as Pokedex.PokemonSpecies;

    const mockTypes: Pokedex.PokemonType[] = [
      { type: { name: 'water', url: '' } } as Pokedex.PokemonType,
    ];

    const result = mapPokemonData(mockPokemonData, mockTypes);

    expect(result.descriptions[0]).toBe('A small turtle pokemon.');
    expect(result.descriptions[0]).not.toContain('[redacted]');
  });
});

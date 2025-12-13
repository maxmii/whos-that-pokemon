function getRandomPokemonId(): number {
  const minId = 1; // Minimum Pokémon ID
  const maxId = 1025; // Maximum Pokémon ID as of current Pokédex
  return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
}

export default getRandomPokemonId;

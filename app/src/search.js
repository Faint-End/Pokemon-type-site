export const search = (cache, query) => {
  return {
    results: cache.results.filter((pokemon) => {
      return pokemon.name.includes(query);
    }),
  };
};

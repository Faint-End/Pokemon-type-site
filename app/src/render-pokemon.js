export const renderPokemon = (pokeList, pokemonObj) => {
  const li = document.createElement('li');
  const pokeSprite = document.createElement('img');

  li.classList = 'pokemon';
  pokeSprite.classList = pokemonObj.name;

  pokeSprite.src = pokemonObj.sprite;
  pokeSprite.alt = `An image of ${pokemonObj.name}`;

  // const h2 = document.createElement('h2');
  // h2.textContent = `${pokemonObj.name.toUpperCase()}!!`;

  li.append(pokeSprite);
  pokeList.append(li);
};

export const renderHistPokemon = (pokeList, pokemonObj) => {
  const li = document.createElement('li');
  const pokeSprite = document.createElement('img');

  li.classList = 'pokemon';
  pokeSprite.classList = pokemonObj.name;

  pokeSprite.src = pokemonObj.sprite;
  pokeSprite.alt = `An image of ${pokemonObj.name}`;

  const span = document.createElement('span');
  span.textContent = `${pokemonObj.name.toUpperCase()}`;
  span.className = 'pokemon-name';

  li.append(pokeSprite, span);
  pokeList.prepend(li);
};

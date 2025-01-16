export const renderSearched = (pokeList, pokemonObj) => {
  const li = document.createElement('li');
  const pokeSprite = document.createElement('img');
  pokeSprite.src = pokemonObj.sprite;
  pokeSprite.alt = `An image of ${pokemonObj.name}`;

  const h2 = document.createElement('h2');
  h2.textContent = `${pokemonObj.name.toUpperCase()}!!`;

  li.append(pokeSprite, h2);
  pokeList.append(li);
};

export const renderRandom = () => {};

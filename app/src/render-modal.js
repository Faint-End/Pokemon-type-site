import { fetchPokemon, fetchPokemonType } from "./fetch-helpers";

export const renderPokemonInfo = (modal, pokemonInfoObj) => {
  modal.innerHTML = "";

  const pokeName = document.createElement("h2");
  const pokePic = document.createElement("img");
  const typeText = document.createElement("h3");
  const typeStuff = document.createElement("div");

  pokeName.textContent = pokemonInfoObj.name;

  pokePic.src = pokemonInfoObj.sprite;
  pokePic.alt = `An image of ${pokemonInfoObj.name}`;

  const str = "";
  typeText.textContent = `${pokemonInfoObj.name}'s ${str}:`;
  pokemonInfoObj.types.length === 1 ? (str = "type is") : (str = "types are");
  typeStuff.append(typeText);

  pokemonInfoObj.types.forEach((type) => {
    const typeIcon = document.createElement("img");
    typeIcon.src = type.icon;
    typeIcon.alt = `The icon for ${type.name} type`;
    typeStuff.append(typeIcon);
  });
};

import { fetchPokemonWType } from "./fetch-helpers";
import typeChartIcons from "./type-chart.json";

export const renderPokemonInfo = (modal, pokemonInfoObj) => {
  modal.innerHTML = "";

  console.log(pokemonInfoObj);

  const pokeName = document.createElement("h2");
  const pokePic = document.createElement("img");
  const typeText = document.createElement("h3");
  const typeStuff = document.createElement("div");
  const typeChartDiv = document.createElement("div");
  const strengthsDiv = document.createElement("div");
  const weaknessesDiv = document.createElement("div");
  const strengthText = document.createElement("h2");
  const weaknessText = document.createElement("h2");
  const closeButton = document.createElement("buttton");

  pokeName.textContent = pokemonInfoObj.name;

  pokePic.src = pokemonInfoObj.sprite;
  pokePic.alt = `An image of ${pokemonInfoObj.name}`;

  let str = "";
  pokemonInfoObj.types.length === 1 ? (str = "type is") : (str = "types are");
  typeText.textContent = `${pokemonInfoObj.name}'s ${str}:`;
  typeStuff.append(typeText);

  strengthText.textContent = "Strengths:";
  weaknessText.textContent = "Weaknesses:";
  strengthsDiv.append(strengthText);
  weaknessesDiv.append(weaknessText);

  pokemonInfoObj.types.forEach((type) => {
    const typeIcon = document.createElement("img");
    typeIcon.src = type.icon;
    typeIcon.alt = `The icon for ${type.name} type`;
    typeStuff.append(typeIcon);

    type.strengths.forEach((strength) => {
      const strengthIcon = document.createElement("img");
      strengthIcon.src = typeChartIcons[strength];
      strengthIcon.alt = `The icon for ${strength} type`;
      strengthsDiv.append(strengthIcon);
    });

    type.weaknesses.forEach((weakness) => {
      const weaknessIcon = document.createElement("img");
      weaknessIcon.src = typeChartIcons[weakness];
      weaknessIcon.alt = `The icon for ${weakness} type`;
      weaknessesDiv.append(weaknessIcon);
    });
  });

  typeChartDiv.append(strengthsDiv, weaknessesDiv);

  closeButton.textContent = "X";
  closeButton.id = "close-button";

  modal.append(pokeName, pokePic, typeStuff, typeChartDiv, closeButton);
};

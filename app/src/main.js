import "./style.css";
import { fetchAllPokemon, fetchModalPoke, fetchPokemon } from "./fetch-helpers";
import { renderPokemon, renderHistPokemon } from "./render-pokemon";
import { renderPokemonInfo } from "./render-modal";

const sectionLi = document.getElementById("lists");
const pokeList = document.getElementById("poke-list");
pokeList.style = "list-style-type: none;";
const histList = document.getElementById("history");
histList.style = "list-style-type: none;";
const pokeSearch = document.getElementById("poke-search");

const nextButton = document.getElementById("next-pg");
const previousButton = document.getElementById("previous-pg");

let offset = 0;
const limit = 30;

const main = async () => {
  const pokeModal = document.getElementById("poke-modal");

  pokeSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);

    fetchPokemon(formData.pokemonName).then((pokemon) => {
      renderHistPokemon(histList, pokemon);
      const historyItems = Array.from(histList.children);

      // Remove oldest item if the list has 6 items
      if (historyItems.length >= 7) {
        histList.removeChild(historyItems[6]);
      }
    });

    e.target.reset();
  });

  sectionLi.addEventListener("click", (e) => {
    if (!e.target.matches("img")) return;

    //pokeModal.showModal();

    fetchModalPoke(e.target.className).then((pokemon) => {
      renderPokemonInfo(pokeModal, pokemon);
    });
  });

  const { results, next, previous } = await fetchAllPokemon(offset, limit);
  pokeList.innerHTML = "";

  results.forEach((pokemon) => {
    renderPokemon(pokeList, pokemon);
  });

  nextButton.disabled = !next;
  previousButton.disabled = !previous;
};

nextButton.addEventListener("click", () => {
  offset += limit;
  main();
});

previousButton.addEventListener("click", () => {
  offset -= limit;
  main();
});

document.addEventListener("DOMContentLoaded", main);

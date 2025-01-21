import "./style.css";
import { fetchPokemon, fetchPokemonWType } from "./fetch-helpers";
import { renderSearched } from "./render-pokemon";
import { renderPokemonInfo } from "./render-modal";

const pokeList = document.getElementById("poke-list");
pokeList.style = "list-style-type: none;";

const main = () => {
  const pokeSearch = document.getElementById("poke-search");
  const pokeModal = document.getElementById("poke-modal");
  const pokeModalContainer = document.getElementById("modal-container");
  const closeButton = document.getElementById("close-button");

  pokeSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);

    fetchPokemon(formData.pokemonName).then((pokemon) => {
      renderSearched(pokeList, pokemon);
    });

    e.target.reset();
  });

  pokeList.addEventListener("click", (e) => {
    if (!e.target.matches("img")) return;

    pokeModal.showModal();

    fetchPokemonWType(e.target.className).then((pokemon) => {
      renderPokemonInfo(pokeModal, pokemon);
    });
  });

  closeButton.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;
    pokeModal.close();
  });
};

main();

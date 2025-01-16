import "./style.css";
import { fetchPokemon } from "./fetch-helpers";

const main = () => {
  const pokeSearch = document.getElementById("pokeSearch");
  pokeSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);

    fetchPokemon(formData.pokemonName);

    e.target.reset();
  });
};

main();

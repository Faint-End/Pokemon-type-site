import "./style.css";
import { fetchPokemon, fetchPokemonList } from "./fetch-helpers";

const main = () => {
  fetchPokemon();
};

//main();

//v2
const main2 = () => {
  fetchPokemonList();
};

main2();

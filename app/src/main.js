import './style.css';
import { fetchPokemon, fetchPokemonList } from './fetch-helpers';

const main = () => {
  const pokeSearch = document.getElementById('pokeSearch');
  pokeSearch.addEventListener('submit', fetchPokemon);
};

main();

//v2
const main2 = () => {
  fetchPokemonList();
};

main2();

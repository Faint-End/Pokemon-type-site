import './style.css';
import {
  fetchAllPokemon,
  fetchPokemon,
  fetchPokemonType,
} from './fetch-helpers';
import { renderPokemon } from './render-pokemon';

const pokeList = document.getElementById('poke-list');
pokeList.style = 'list-style-type: none;';
const histList = document.getElementById('history');
histList.style = 'list-style-type: none;';
const pokeSearch = document.getElementById('pokeSearch');

const nextButton = document.getElementById('next-pg');
const previousButton = document.getElementById('previous-pg');

let offset = 0;
const limit = 20;

const main = async () => {
  pokeSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);

    fetchPokemon(formData.pokemonName).then((pokemon) => {
      renderPokemon(histList, pokemon);
    });

    e.target.reset();
  });

  const { results, next, previous } = await fetchAllPokemon(offset, limit);
  pokeList.innerHTML = '';

  results.forEach((pokemon) => {
    renderPokemon(pokeList, pokemon);
  });

  nextButton.disabled = !next;
  previousButton.disabled = !previous;
};

nextButton.addEventListener('click', () => {
  offset += limit;
  main();
});

previousButton.addEventListener('click', () => {
  offset -= limit;
  main();
});

document.addEventListener('DOMContentLoaded', main);

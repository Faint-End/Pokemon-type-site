import './style.css';
import {
  fetchAllPokemon,
  fetchModalPoke,
  fetchPokemon,
  getData,
} from './fetch-helpers';
import { renderPokemon, renderHistPokemon } from './render-pokemon';
import { renderPokemonInfo } from './render-modal';
import { search } from './search';
import { getPokemon } from './getPokemon';

const sectionLi = document.getElementById('lists');
const pokeList = document.getElementById('poke-list');
pokeList.style = 'list-style-type: none;';
const histList = document.getElementById('history');
histList.style = 'list-style-type: none;';
const pokeSearch = document.getElementById('poke-search');

const nextButton = document.getElementById('next-pg');
const previousButton = document.getElementById('previous-pg');

let offset = 0;
const limit = 30;

const main = async () => {
  const pokeModal = document.getElementById('poke-modal');

  pokeSearch.addEventListener('submit', (e) => {
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

  sectionLi.addEventListener('click', (e) => {
    if (!e.target.matches('img')) return;

    //pokeModal.showModal();

    fetchModalPoke(e.target.className).then((pokemon) => {
      renderPokemonInfo(pokeModal, pokemon);
    });
  });

  const { results, next, previous } = await fetchAllPokemon(offset, limit);
  pokeList.innerHTML = '';

  results.forEach((pokemon) => {
    renderPokemon(pokeList, pokemon);
  });

  nextButton.disabled = !next;
  previousButton.disabled = !previous;

  searchInput.addEventListener('input', async (event) => {
    const query = event.target.value.trim().toLowerCase();

    // Clear the current search results
    pokeList.innerHTML = '';

    if (query.length === 0) {
      return; // Exit if the input is empty
    }

    try {
      // Fetch Pokémon matching the query
      const pokemon = await fetchPokemon(query);

      if (pokemon) {
        // Render the search result
        renderPokemon(pokeList, pokemon);

        // Update the search history
        updateSearchHistory(pokemon);
      }
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  });
  // // Implementation of search feature
  // const searchInput = document.querySelector('#pokemon-name');
  // const allPokemonCache = await getData(
  //   'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=-1'
  // );

  // let searchMode = true;
  // let pokemonInformation;

  // searchInput.addEventListener('input', async (event) => {
  //   pokeList.innerHTML = '';
  //   searchMode = false;
  //   let value = event.target.value.trim().toLowerCase();

  //   if (value.length === 0) {
  //     searchMode = true;
  //     renderPokemon(pokeList, listObj.pokemonList);
  //   }

  //   if (value && value.length >= 2) {
  //     // Searches for the pokemon name in the pokemon name cache
  //     let searchResults = search(allPokemonCache, value);
  //     pokemonInformation = await getPokemon(searchResults);
  //     renderPokemonList(pokemonUl, pokemonInformation.pokemonList);
  //   }
  // });
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

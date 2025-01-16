import './style.css';
import { fetchPokemon, fetchPokemonType } from './fetch-helpers';
import { renderSearched } from './render-pokemon';

const pokeList = document.getElementById('poke-list');
pokeList.style = 'list-style-type: none;';

const main = () => {
  const pokeSearch = document.getElementById('pokeSearch');
  pokeSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);

    fetchPokemon(formData.pokemonName).then((pokemon) => {
      renderSearched(pokeList, pokemon);
    });

    e.target.reset();
  });
};

main();

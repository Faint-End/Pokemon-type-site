export const fetchPokemon = async (pokemonName) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }
    const pokemonData = await response.json();

    const obj = {};
    obj.name = pokemonData.name;

    obj.sprite =
      pokemonData['sprites']['other']['official-artwork']['front_default'];

    obj.types = [];
    pokemonData.types.forEach((pokeType) => {
      obj.types.push(pokeType.type.name);
    });

    console.log(obj);
    return obj;
  } catch (error) {
    console.log('Error caught! ' + error.message);
    return null;
  }
};

export const fetchPokemonType = async (typeName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);

    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }
    const typeData = await response.json();

    const obj = {};
    obj.name = typeData["name"];

    obj.strengths = [];
    obj.weaknesses = [];

    typeData["damage_relations"]["double_damage_from"].forEach((x2weak) => {
      obj.weaknesses.push(x2weak.name);
    });
    typeData["damage_relations"]["double_damage_to"].forEach((x2strong) => {
      obj.strengths.push(x2strong.name);
    });

    obj.icon =
      typeData["sprites"]["generation-ix"]["scarlet-violet"]["name_icon"];

    console.log(obj);
    return obj;
  } catch (error) {
    console.log('Error caught! ' + error.message);
    return null;
  }
};

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
      typeData["sprites"]["generation-viii"]["sword-shield"]["name_icon"];

    console.log(obj);
    return obj;
  } catch (error) {
    console.log("Error caught! " + error.message);
    return null;
  }
};

export const fetchPokemonWType = async (pokemonName) => {
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
      pokemonData["sprites"]["other"]["official-artwork"]["front_default"];

    obj.types = [];
    for (const pokeType of pokemonData.types) {
      const typeObj = await fetchPokemonType(pokeType.type.name);
      obj.types.push(typeObj);
    }

    // pokemonData.types.forEach((pokeType) => {
    //   const typeObj = await fetchPokemonType(pokeType.type.name);
    //   obj.types.push(typeObj);
    // });

    console.log(obj);
    return obj;
  } catch (error) {
    console.log("Error caught! " + error.message);
    return null;
  }
};

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
    obj.name = typeData['name'];

    obj.strengths = [];
    obj.weaknesses = [];

    typeData['damage_relations']['double_damage_from'].forEach((x2weak) => {
      obj.weaknesses.push(x2weak.name);
    });
    typeData['damage_relations']['double_damage_to'].forEach((x2strong) => {
      obj.strengths.push(x2strong.name);
    });

    obj.icon =
      typeData['sprites']['generation-ix']['scarlet-violet']['name_icon'];

    console.log(obj);
    return obj;
  } catch (error) {
    console.log("Error caught! " + error.message);
    return null;
  }
};

// export const fetchAllPokemon = async () => {
//   try {
//     let allPokemon = [];
//     let url = `https://pokeapi.co/api/v2/pokemon/`;

//     while (url) {
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
//       }
//     }
//     const pokemonData = await response.json();
//     allPokemon = allPokemon.concat(pokemonData.results);

//     console.log('fetched all pokemon: ', allPokemon);
//     return allPokemon;
//   } catch (error) {
//     console.log('Error caught! ' + error.message);
//     return null;
//   }
// };

export const fetchAllPokemon = async (offset = 0, limit = 20) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );

    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const detailedPoke = await Promise.all(
      data.results.map(async (poke) => {
        const response = await fetch(poke.url);
        const data = await response.json();
        return {
          name: data.name,
          sprite: data.sprites.other['official-artwork'].front_default,
        };
      })
    );
    console.log('here are the deets', detailedPoke);
    return { results: detailedPoke, next: data.next, previous: data.previous };
  } catch (error) {
    console.error('Error fetching the damn Pokemon: ', error);
  }
};

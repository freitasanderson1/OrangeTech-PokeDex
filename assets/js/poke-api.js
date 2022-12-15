const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id

    pokemon.name = pokeDetail.name

    pokeName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    pokemon.name = pokeName;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    substituir = pokemon.types.toString();
    substituir = substituir.replace(","," ");

   
    pokemon.tipos = substituir;
    let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.number}.gif`
    
    pokemon.photo = url;

    if (pokemon.number < 10){
        pokemon.number = `00${pokemon.number}`
    }
    else if (pokemon.number < 100){
        pokemon.number = `0${pokemon.number}`
    }

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
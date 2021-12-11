const pokemonContainer = document.getElementById("pokemon-container");
const pokemonCount = 100;

const colors = 
{
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#F4E7DA",
    rock: "#D5D5D4",
    fairy: "#FCEAFF",
    poison: "#98D7A5",
    bug: "#F8D5A3",
    dragon: "#97B3E6",
    psychic: "#EAEDA1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5"
}

const types = Object.keys(colors);

const fetchPokemon = async () => 
{
    for(let i = 1; i <= pokemonCount; i++)
    {
        await getPokemon(i);
    }
}

const getPokemon = async (id) =>
{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    createPokemon(data);
}

const createPokemon = (pokemon) =>
{
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");

    const number = pokemon.id.toString().padStart(3, '0');
    const name = pokemon.name;

    const pokemonTypes = pokemon.types.map(type => type.type.name);
    const type = types.find(type => pokemonTypes.indexOf(type) > -1); 

    pokemonElement.style.backgroundColor = colors[type];

    const pokemonInnerHTML = `
        <div class="img-container">
            <div class="img-size">
                <img src="sprites/official-artwork/${pokemon.id}.png" alt="">
            </div>
        </div>

        <div class="pokemon-info">
            <span class="pokemon-number">#${number}</span>
            <h3 class="pokemon-name">${name}</h3>
            <small class="pokemon-type"> <span>${type}</span> </small>
        </div>`;

    pokemonElement.innerHTML = pokemonInnerHTML;

    pokemonContainer.appendChild(pokemonElement); 
}

fetchPokemon();
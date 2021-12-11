const pokemonContainer = document.createElement('div');
pokemonContainer.classList.add("pokemon-container");
const container = document.getElementById("container");

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

const fetchPokemons = async () => 
{
    removeAllChild(pokemonContainer);

    const pokemonCount = 100;
    let pokemons = [];
    for(let i = 1; i <= pokemonCount; i++)
    {
        await getPokemon(i).then(function(data) 
        {
            pokemons.push(data);
        });
    }
    
    pokemons.forEach(pokemon => 
    {
        pokemonContainer.appendChild(createPokemon(pokemon));
    });

    container.appendChild(pokemonContainer);
}

const getPokemon = async (id) =>
{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
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

    return pokemonElement;
}

const addOnlyOnePokemon = async (id, pokemonContainer) => 
{
    removeAllChild(pokemonContainer);
    await getPokemon(id).then(function(data) 
    {
        pokemonContainer.appendChild(createPokemon(data));
    });
    container.appendChild(pokemonContainer);
}

const removeAllChild = (parent) =>
{
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
         console.log("apagado");
    }
}

// Search bar
let form = document.getElementById("form");
let searchBar = document.getElementById("searchBar");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = searchBar.value
    addOnlyOnePokemon(name.toLowerCase(), pokemonContainer);
});
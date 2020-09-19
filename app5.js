const pokemonContainer = document.querySelector(".pokemon-container");
const buttons = document.querySelectorAll(".button-container button");
const heading = document.querySelector("#heading");

const generations = [
  ["Kanto", 1, 151],
  ["Johto", 152, 251],
  ["Hoenn", 252, 386],
  ["Sinnoh", 387, 483],
  ["Unova", 494, 649],
];

let currentGen = 0;

const colors = {
  grass: "#d2f2c2",
  poison: "#f7cdf7",
  fire: "#ffd1b5",
  flying: "#eae3ff",
  water: "#c2f3ff",
  bug: "#e0e8a2",
  normal: "#e6e6c3",
  electric: "#fff1ba",
  ground: "#e0ccb1",
  fighting: "#fcada9",
  psychic: "#ffc9da",
  rock: "#f0e09c",
  fairy: "#ffdee5",
  steel: "#e6eaf0",
  ice: "#e8feff",
  ghost: "#dbbaff",
  dragon: "#c4bdff",
};

const searchBoxContainer = document.createElement("div");
searchBoxContainer.setAttribute("class", "search-box-container");
searchBoxContainer.innerHTML = `
<input type="text" class="search-box" placeholder="Search"></input>
<i class="fas fa-search"></i>
`;

// ===============================================================================================
// This uses only a single fetch but the results will be shown only when all pokemons are fetched
// ===============================================================================================

async function getPokemons(pokemonStartID, pokemonEndID) {
  pokemonContainer.innerHTML = `<span class="loader"></span>`;

  // Restricting Clicking on Buttons
  buttons.forEach((el) => {
    console.log("IN");
    el.classList.add("restrict-click");
  });

  const promises = [];
  for (let id = pokemonStartID; id <= pokemonEndID; id++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const json = await response.json();
    promises.push(json);
  }
  pokemonContainer.innerHTML = "";
  document.body.insertBefore(searchBoxContainer, pokemonContainer);

  promises.forEach((el, ind) => {
    const pokemonName = el.name;
    const pokemonTypes = [];
    el.types.forEach((item) => {
      pokemonTypes.push(item.type.name);
    });
    const imageURL = el.sprites.other["official-artwork"].front_default;
    pokemonContainer.innerHTML += `
		<div class="pokemon-card">
			<img src=${imageURL}></img>
			<div class="circle"></div>
			<h5 class="poke-id"> #${el.id} </h5>
			<h5 class="poke-name"> ${pokemonName.replace(/\w/, (ch) =>
        ch.toUpperCase()
      )} </h5>
			<h5> ${pokemonTypes
        .join(" / ")
        .replace(/\b\w/g, (ch) => ch.toUpperCase())} </h5>
		</div>
		`;
    const pokemonCards = document.querySelectorAll(".pokemon-card");
    const pokemonCard = pokemonCards[pokemonCards.length - 1];
    if (pokemonTypes[1]) {
      pokemonCard.style.background =
        "linear-gradient(150deg," +
        colors[el.types[0].type.name] +
        " 50%," +
        colors[el.types[1].type.name] +
        " 50%)";
    } else {
      pokemonCard.style.background = colors[pokemonTypes[0]];
    }
  });

  // Enabling Clicking on Buttons
  setTimeout(() => {
    buttons.forEach((el) => {
      console.log("OUT");
      el.classList.remove("restrict-click");
    });
  }, 500);

  instantiateListener();
}

function instantiateListener() {
  const pokemons = document.querySelectorAll(".pokemon-card .poke-name");
  const searchBox = document.querySelector(".search-box");

  searchBox.addEventListener("keyup", (e) => {
    const inp = searchBox.value.toLowerCase();

    pokemons.forEach((pokemon) => {
      const name = pokemon.textContent.toLowerCase();
      if (name.indexOf(inp) !== -1) {
        pokemon.parentElement.style.display = "flex";
      } else {
        pokemon.parentElement.style.display = "none";
      }
    });
  });
}

buttons.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (
      e.target.id === "right-btn" &&
      !e.target.classList.contains("restrict-click")
    ) {
      currentGen = (currentGen + 1) % generations.length;
      heading.innerText = generations[currentGen][0] + " Pokédex";
      getPokemons(generations[currentGen][1], generations[currentGen][2]);
    } else if (
      e.target.id === "left-btn" &&
      !e.target.classList.contains("restrict-click")
    ) {
      currentGen = (currentGen - 1 + generations.length) % generations.length;
      heading.innerText = generations[currentGen][0] + " Pokédex";
      getPokemons(generations[currentGen][1], generations[currentGen][2]);
    }
  });
});

getPokemons(generations[0][1], generations[0][2]);

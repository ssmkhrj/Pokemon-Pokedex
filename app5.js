const pokemonContainer = document.querySelector(".pokemon-container");
const buttons = document.querySelectorAll(".button-container button");
const pagination = document.querySelectorAll(".pagination");
const heading = document.querySelector("#heading");

const generations = [
  ["Kanto", 1, 151],
  ["Johto", 152, 251],
  ["Hoenn", 252, 386],
  ["Sinnoh", 387, 483],
  ["Unova", 494, 649],
];

let currentGen = 0;
let firstTime = true;

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
  dark: "#a9abb0",
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
  // Adding the loader
  pokemonContainer.innerHTML = `<span class="loader"></span>`;

  // Restricting Clicking on Buttons
  buttons.forEach((el) => {
    el.classList.add("restrict-click");
  });

  // Fetching all pokemons
  const responses = [];
  for (let id = pokemonStartID; id <= pokemonEndID; id++) {
    const response = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    responses.push(response);
  }
  const proms = await Promise.all(responses);
  const promises = await Promise.all(proms.map((el) => el.json()));

  // Removing the loader
  pokemonContainer.innerHTML = "";

  if (firstTime) {
    document.body.insertBefore(searchBoxContainer, pokemonContainer);
    firstTime = false;
  }

  promises.forEach((el, ind) => {
    const pokemonName = el.name;
    const pokemonTypes = [];
    el.types.forEach((item) => {
      pokemonTypes.push(item.type.name);
    });
    const imageURL = el.sprites.other["official-artwork"].front_default;
    pokemonContainer.innerHTML += `
    <div class="pc-container">
      <div class="pokemon-card">
        <div class="card_front">
          <img src=${imageURL}></img>
          <div class="circle"></div>
          <h5 class="poke-id"> #${el.id} </h5>
          <h5 class="poke-name"> ${pokemonName.replace(/\w/, (ch) =>
            ch.toUpperCase()
          )} </h5>
          <h5> ${pokemonTypes
            .join(" / ")
            .replace(/\b\w/g, (ch) => ch.toUpperCase())} 
          </h5>
        </div>
        <div class="card_back">
          <div class="poke-stats-name">HP: ${el.stats[0].base_stat}</div>
          <div class="poke-stats-bar"
          style="background: linear-gradient(to right, ${
            colors[pokemonTypes[0]]
          } ${el.stats[0].base_stat}%, ${colors[pokemonTypes[0]]}71 
          ${el.stats[0].base_stat}%"
          >
          </div>
          <div class="poke-stats-name">Attack: ${el.stats[1].base_stat}</div>
          <div class="poke-stats-bar"
          style="background: linear-gradient(to right, ${
            colors[pokemonTypes[0]]
          } ${el.stats[1].base_stat}%, ${colors[pokemonTypes[0]]}71 
          ${el.stats[1].base_stat}%"
          >
          </div>
          <div class="poke-stats-name">Defense: ${el.stats[2].base_stat}</div>
          <div class="poke-stats-bar"
          style="background: linear-gradient(to right, ${
            colors[pokemonTypes[0]]
          } ${el.stats[2].base_stat}%, ${colors[pokemonTypes[0]]}71 
          ${el.stats[2].base_stat}%"
          >
          </div>
          <div class="poke-stats-name">Special-Attack: ${
            el.stats[3].base_stat
          }</div>
          <div class="poke-stats-bar"
          style="background: linear-gradient(to right, ${
            colors[pokemonTypes[0]]
          } ${el.stats[3].base_stat}%, ${colors[pokemonTypes[0]]}71 
          ${el.stats[3].base_stat}%"
          >
          </div>
          <div class="poke-stats-name">Special-Defense: ${
            el.stats[4].base_stat
          }</div>
          <div class="poke-stats-bar"
          style="background: linear-gradient(to right, ${
            colors[pokemonTypes[0]]
          } ${el.stats[4].base_stat}%, ${colors[pokemonTypes[0]]}71 
          ${el.stats[4].base_stat}%"
          >
          </div>
          <div class="poke-stats-name">Speed: ${el.stats[5].base_stat}</div>
          <div class="poke-stats-bar"
          style="background: linear-gradient(to right, ${
            colors[pokemonTypes[0]]
          } ${el.stats[5].base_stat}%, ${colors[pokemonTypes[0]]}71 
          ${el.stats[5].base_stat}%"
          >
          </div>
        </div>
      </div>
    </div>
		`;
    const pokemonCards = document.querySelectorAll(".card_front");
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
        pokemon.parentElement.parentElement.parentElement.style.display =
          "flex";
      } else {
        pokemon.parentElement.parentElement.parentElement.style.display =
          "none";
      }
    });
  });
}

buttons.forEach((el) => {
  el.addEventListener("click", (e) => {
    const searchBox = document.querySelector(".search-box");
    if (searchBox) {
      searchBox.value = "";
    }
    if (
      e.target.id === "right-btn" &&
      !e.target.classList.contains("restrict-click")
    ) {
      pagination[currentGen].classList.remove("current-page");
      currentGen = (currentGen + 1) % generations.length;
      pagination[currentGen].classList.add("current-page");
      heading.innerText = generations[currentGen][0] + " Pokédex";
      getPokemons(generations[currentGen][1], generations[currentGen][2]);
    } else if (
      e.target.id === "left-btn" &&
      !e.target.classList.contains("restrict-click")
    ) {
      pagination[currentGen].classList.remove("current-page");
      currentGen = (currentGen - 1 + generations.length) % generations.length;
      pagination[currentGen].classList.add("current-page");
      heading.innerText = generations[currentGen][0] + " Pokédex";
      getPokemons(generations[currentGen][1], generations[currentGen][2]);
    }
  });
});

pagination.forEach((el) => {
  el.addEventListener("click", (e) => {
    const searchBox = document.querySelector(".search-box");
    if (searchBox) {
      searchBox.value = "";
    }
    if (!buttons[0].classList.contains("restrict-click")) {
      pagination[currentGen].classList.remove("current-page");
      currentGen = el.textContent - 1;
      pagination[currentGen].classList.add("current-page");
      heading.innerText = generations[currentGen][0] + " Pokédex";
      getPokemons(generations[currentGen][1], generations[currentGen][2]);
    }
  });
});

getPokemons(generations[0][1], generations[0][2]);

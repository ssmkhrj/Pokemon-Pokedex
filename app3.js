const pokemonContainer = document.querySelector(".pokemon-container");

const colors = {
	"grass": "#A7DB8D7D", 
	"poison": "#C183C17D", 
	"fire": "#F5AC787D", 
	"flying": "#C6B7F57D", 
	"water": "#C6B7F57D", 
	"bug": "#C6D16E7D", 
	"normal": "#C6C6A77D", 
	"electric": "#FAE0787D", 
	"ground": "#EBD69D7D", 
	"fighting": "#D678737D", 
	"psychic": "#FA92B27D", 
	"rock": "#D1C17D7D", 
	"fairy": "#F4BDC97D", 
	"steel": "#D1D1E07D", 
	"ice": "#BCE6E67D", 
	"ghost": "#A292BC7D", 
	"dragon": "#A27DFA7D" 
}

// ========================================================================================
// This will load one by one, but earlier approaches laoded all at once and then displayed.
// This uses only a single fetch. The loading screen has no meaning now.
// ========================================================================================

const pokemonStartID = 1;
const pokemonEndID = 150;
async function getPokemons(){
	for (let id=pokemonStartID; id<=pokemonEndID; id++){
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

		const json = await response.json();

		createPokemonCard(json, id);
	}
}

function createPokemonCard(json, id){
	const pokemonName = json.name;
	const pokemonTypes = [];
	json.types.forEach(item => {
		pokemonTypes.push(item.type.name)
	});
	pokemonContainer.innerHTML += `
	<div class="pokemon-card">
		<img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"></img>
		<div class="circle"></div>
		<h5 class="poke-id"> #${id} </h5>
		<h5 class="poke-name"> ${pokemonName.replace(/\w/, ch => ch.toUpperCase())} </h5>
		<h5> ${pokemonTypes.join(" / ").replace(/\b\w/g, ch => ch.toUpperCase())} </h5>
	</div>
	`
	const pokemonCards = document.querySelectorAll(".pokemon-card");
	const pokemonCard = pokemonCards[pokemonCards.length - 1];
	if (pokemonTypes[1]){
		pokemonCard.style.background = "linear-gradient(150deg," + colors[json.types[0].type.name] + " 50%," + colors[json.types[1].type.name] + " 50%)";
	}else{
		pokemonCard.style.background = colors[pokemonTypes[0]];
	}
}

pokemonContainer.innerHTML = "";
getPokemons();
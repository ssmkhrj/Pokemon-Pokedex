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

const pokemonStartID = 1;
const pokemonEndID = 150;

const promises = [];

async function getPokemons(){
	for (let id=pokemonStartID; id<=pokemonEndID; id++) {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const json = await response.json();
		promises.push(json);
	}
	pokemonContainer.innerHTML = "";

	promises.forEach((el, ind) => {
		const pokemonName = el.name;
		const pokemonTypes = [];
		el.types.forEach(item => {
			pokemonTypes.push(item.type.name)
		});
		pokemonContainer.innerHTML += `
		<div class="pokemon-card">
			<img src="https://pokeres.bastionbot.org/images/pokemon/${ind+1}.png"></img>
			<div class="circle"></div>
			<h5 class="poke-id"> #${ind+1} </h5>
			<h5 class="poke-name"> ${pokemonName.replace(/\w/, ch => ch.toUpperCase())} </h5>
			<h5> ${pokemonTypes.join(" / ").replace(/\b\w/g, ch => ch.toUpperCase())} </h5>
		</div>
		`
		const pokemonCards = document.querySelectorAll(".pokemon-card");
		const pokemonCard = pokemonCards[pokemonCards.length - 1];
		if (pokemonTypes[1]){
			pokemonCard.style.background = "linear-gradient(150deg," + colors[el.types[0].type.name] + " 50%," + colors[el.types[1].type.name] + " 50%)";
		}else{
			pokemonCard.style.background = colors[pokemonTypes[0]];
		}
	});
}

getPokemons();
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

// ==========================================================================
// This code uses async and await
// Also it uses both the urls "https://pokeapi.co/api/v2/pokemon?limit=150"
// and this "https://pokeapi.co/api/v2/pokemon/1"
// ==========================================================================

async function getPokemons(){
	const response1 = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");

	const json1 = await response1.json();

	const allPromises = [];
	json1.results.forEach(el => { allPromises.push(fetch(el.url)) });

	const response2 = await Promise.all(allPromises);

	const allJsons = [];
	response2.forEach(el => { allJsons.push(el.json()) });

	const json2 = await Promise.all(allJsons);
	
	pokemonContainer.innerHTML = ""; 
	json2.forEach((json, index) => {
		const pokemonName = json.name;
		const pokemonTypes = [];
		json.types.forEach(item => {
			pokemonTypes.push(item.type.name)
		});
		pokemonContainer.innerHTML += `
		<div class="pokemon-card">
			<img src="https://pokeres.bastionbot.org/images/pokemon/${index+1}.png"></img>
			<div class="circle"></div>
			<h5 class="poke-id"> #${index+1} </h5>
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
	});
}

getPokemons().catch(console.error);
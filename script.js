//Variables
let pokemonName = "";
let image = document.getElementById("image");

let min = 1;
let max = 151;

let guess = document.getElementById("guess");

let form = document.getElementById("guessForm");

let skip = document.getElementById("skip");
let next = document.getElementById("next");

///functions
async function randomPokemon() {
  let num = Math.random() * (max - min) + min;
  let random = Math.floor(num);

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}/`);
  const pokemon = await response.json();

  image.src = pokemon.sprites.front_default;

  pokemonName = pokemon.name;
  console.log(pokemonName);

  image.style.filter = "blur(8px)";

  handleSkip();
  handleNext();
}

function checkGuess() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let ans = guess.value.toLowerCase() === pokemonName.toLowerCase();

    if (ans) {
      image.style.filter = "blur(0px)";
      handleSkip();
      handleNext();
    } else {
      alert("Incorrect try again. Or be pathetic and skip.");
    }
    guess.value = "";
  });
}

function handleSkip() {
  if (image.style.filter === "blur(8px)") {
    skip.addEventListener("click", randomPokemon);
  } else {
    skip.removeEventListener("click", randomPokemon);
  }
  guess.value = "";
}

function handleNext() {
  if (image.style.filter === "blur(8px)") {
    next.removeEventListener("click", randomPokemon);
  } else {
    next.addEventListener("click", randomPokemon);
  }
  guess.value = "";
}

randomPokemon();
handleSkip();
checkGuess();
handleNext();

//Variables
//welcome/rules
let rules = document.getElementById("rules");
let start = document.getElementById("start");
let game = document.getElementById("game");
let playagain = document.getElementById("play-again");
let win = document.getElementById("win");
let tryagain = document.getElementById("try-again");

let pokemonName = "";
let image = document.getElementById("image");

let min = 1;
let max = 151;

let guess = document.getElementById("guess");

let form = document.getElementById("guessForm");

let skip = document.getElementById("skip");
let next = document.getElementById("next");

// scores skips and lives variables

let skip_count = document.getElementById("skip-count");
let life = document.getElementById("life-count");
let score = document.getElementById("score-count");

skip_count.innerHTML = 3;
life.innerHTML = 5;
score.innerHTML = 0;

///////////////////////////////////Functions//////////////////////////
//start game

start.addEventListener("click", startGame);
function startGame() {
  console.log("click");
  rules.classList.add("hidden");
  rules.classList.remove("flex");

  game.classList.add("flex");
  game.classList.remove("hidden");
}

//win game

playagain.addEventListener("click", playAgain);

function playAgain() {
  game.classList.add("flex");
  game.classList.remove("hidden");

  win.classList.add("hidden");

  skip_count.innerHTML = 3;
  life.innerHTML = 5;
  score.innerHTML = 0;
  randomPokemon();
}

//lose game
tryagain.addEventListener("click", tryAgain);

function tryAgain() {
  game.classList.add("flex");
  game.classList.remove("hidden");

  loss.classList.add("hidden");

  skip_count.innerHTML = 3;
  life.innerHTML = 5;
  score.innerHTML = 0;
  randomPokemon();
}

//game functions
async function randomPokemon() {
  let num = Math.random() * (max - min) + min;
  let random = Math.floor(num);

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}/`);
  const pokemon = await response.json();

  image.src = pokemon.sprites.front_default;

  pokemonName = pokemon.name;

  console.log(pokemonName);

  image.style.filter = "blur(8px)";

  handleNext();
}

function checkGuess() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (guess.value.trim() === "") {
      alert("Please enter a guess");
    } else {
      let ans = guess.value.toLowerCase() === pokemonName.toLowerCase();

      if (ans) {
        image.style.filter = "blur(0px)";
        score.innerHTML = Number(score.innerHTML) + 1;
        handleSkip();
        handleNext();
        handleEnd();
      } else {
        life.innerHTML = Number(life.innerHTML) - 1;
        handleEnd();
        alert("Incorrect try again.");
      }
    }
    guess.value = "";
  });
}

skip.addEventListener("click", handleSkip);
function handleSkip() {
  if (image.style.filter === "blur(8px)" && skip_count.innerHTML > 0) {
    skip_count.innerHTML = Number(skip_count.innerHTML) - 1;
    handleEnd();
    randomPokemon();

    if (Number(skip_count.innerHTML) === 0) {
      skip.removeEventListener("click", randomPokemon);
    }
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

function handleEnd() {
  if (Number(life.innerHTML) === 0) {
    loss.classList.remove("hidden");
    loss.classList.add("flex");

    game.classList.add("hidden");
    game.classList.remove("flex");
  }

  if (Number(score.innerHTML) === 1) {
    win.classList.add("flex");
    win.classList.remove("hidden");

    game.classList.add("hidden");
    game.classList.remove("flex");
  }
}

randomPokemon();
checkGuess();
handleNext();

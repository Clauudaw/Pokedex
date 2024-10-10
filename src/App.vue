<template>
  <section class="app">
    <aside class="search-bar">
      <h1 class="search-bar__title" aria-label="Titúlo de la barra de búsqueda">
        Guía de Búsqueda de Pokémon
      </h1>
      <button
        class="search-bar__toggle"
        @click="toggleSearchBar"
        aria-label="Botón para mostrar la barra de búsqueda de Pokémon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path
            d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
          />
        </svg>
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/ios-glyphs/30/pokemon--v1.png"
          alt="pokemon--v1"
        />
      </button>

      <section v-show="showSearchBar" class="search-results">
        <input
          v-model="searchTerm"
          placeholder="Buscar Pokémon..."
          aria-label="Campo para ingresar el nombre del Pokémon a buscar"
        />
        <button @click="handleSearch" aria-label="Botón para iniciar la búsqueda">
          Buscar
        </button>
      </section>
    </aside>

    <section v-show="loading" class="loading-state" role="status" aria-live="polite">
      Cargando...
    </section>

    <section v-if="pokemonFound" class="pokemon__section">
      <h2>{{ pokemonName }}</h2>
      <p>Tipo: {{ pokemonType }}</p>
      <img :src="pokemonImage" class="pokemon__section--img" alt="{{ pokemonName }}">
      <p>Movimientos: {{ pokemonMoves.join(", ") }}</p> <!-- Mostrar movimientos como lista -->
      <p>Experiencia Base: {{ pokemonBaseExperience }}</p>
      <p>Formas: {{ pokemonForms.join(", ") }}</p> <!-- Mostrar formas -->
      <p>Versiones del juego: {{ pokemonGameVersions.join(", ") }}</p> <!-- Mostrar versiones del juego -->
      <p>Items relacionados: {{ pokemonItems.length > 0 ? pokemonItems.join(", ") : "Ninguno" }}</p> <!-- Mostrar ítems relacionados (placeholder por ahora) -->
      <p>Pokedex Entries: {{ pokemonPokedexEntries.join(". ") }}</p> <!-- Mostrar entradas de la Pokédex -->
      <p>Cadena de evolución: {{ pokemonEvolutionChain }}</p> <!-- Mostrar la cadena de evolución -->
      <p><strong>Descripción:</strong> {{ pokemonDescription }}</p>
    </section>

    <section v-if="!pokemonFound">
      No se encontró ningún Pokémon con ese nombre.
    </section>
  </section>
</template>

<script setup>
import { ref } from "vue";

// Definir las variables reactivas
const showSearchBar = ref(false);
const searchTerm = ref("");
const loading = ref(false);
const pokemonFound = ref(false);

const pokemonImage = ref("");
const pokemonName = ref("");
const pokemonType = ref("");
const pokemonDescription = ref("");
const pokemonBaseExperience = ref("");
const pokemonForms = ref([]);
const pokemonGameVersions = ref([]);
const pokemonMoves = ref([]);
const pokemonItems = ref([]);
const pokemonPokedexEntries = ref([]);
const pokemonEvolutionChain = ref("");

function toggleSearchBar() {
  showSearchBar.value = !showSearchBar.value;
}

async function handleSearch() {
  if (!showSearchBar.value) {
    console.log("No se puede buscar mientras la barra de búsqueda está oculta");
    return;
  }

  loading.value = true;
  setTimeout(async () => {
    loading.value = false;
    await fetchPokemonData(searchTerm.value.toLowerCase());
    searchTerm.value = "";
  }, 1000);
}

// Función para obtener los datos del Pokémon
async function fetchPokemonData(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    
    if (!response.ok) {
      throw new Error('Pokémon no encontrado');
    }

    const pokemonData = await response.json();
    pokemonFound.value = true;

    pokemonImage.value = pokemonData.sprites.front_default;
    pokemonName.value = capitalizeFirstLetter(pokemonData.name);
    pokemonType.value = pokemonData.types[0].type.name;
    pokemonDescription.value = pokemonData.forms[0].name;
    pokemonBaseExperience.value = pokemonData.base_experience;
    pokemonForms.value = pokemonData.forms.map(form => form.name);
    pokemonGameVersions.value = pokemonData.game_indices.map(game => game.version.name);
    pokemonMoves.value = pokemonData.moves.map(move => move.move.name).slice(0, 5);
    pokemonItems.value = pokemonData.held_items.map(item => item.item.name);


    // Solicitud para especies y evolución
    await fetchPokemonSpecies(name);
  } catch (error) {
    console.error('Error al obtener datos del Pokémon:', error);
    pokemonFound.value = false;
  }
}

// Función para obtener la especie del Pokémon, incluyendo la cadena de evolución y entradas de la Pokédex
async function fetchPokemonSpecies(name) {
  const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  const speciesData = await speciesResponse.json();

  // Entradas de la Pokédex en español
  pokemonPokedexEntries.value = speciesData.flavor_text_entries
    .filter(entry => entry.language.name === "es")
    .map(entry => entry.flavor_text);

  // Obtener la cadena de evolución
  const evolutionChainUrl = speciesData.evolution_chain.url;
  const evolutionResponse = await fetch(evolutionChainUrl);
  const evolutionData = await evolutionResponse.json();

  // Extraer y formatear la cadena de evolución
  pokemonEvolutionChain.value = extractEvolutionChain(evolutionData.chain);
}

// Función para extraer la cadena de evolución
function extractEvolutionChain(chain) {
  let evolution = capitalizeFirstLetter(chain.species.name);
  while (chain.evolves_to.length > 0) {
    chain = chain.evolves_to[0];
    evolution += ` → ${capitalizeFirstLetter(chain.species.name)}`;
  }
  return evolution;
}

// Función para capitalizar la primera letra de un string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<style scoped>
button {
  margin-bottom: 10px;
}

h1 {
  font-size: 2em;
}

template {
  margin: 0;
  width: 100%;
  padding: 0;
}

p {
  color: black;
}

.app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(182, 182, 182);
}

.search-bar__toggle {
  margin: 1em;
}

.search-bar {
  background-color: rgba(226, 96, 9, 0.575);
  flex-direction: column;
  padding: 3em;
}

.search-results {
  margin: 2em;
}

.pokemon__section--img {
  width: 300px;
}
</style>

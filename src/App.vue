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
      <section
        v-show="loading"
        class="loading-state"
        role="status"
        aria-live="polite"
      >
        Cargando...
      </section>

      <div v-if="pokemonFound">
      <h2>{{ pokemonName }}</h2>
      <img :src="pokemonImage" alt="{{ pokemonName }}">
      <p>Tipo: {{ pokemonType }}</p>
      <p>Descripción: {{ pokemonDescription }}</p>
    </div>

    <div v-else>
      No se encontró ningún Pokémon con ese nombre.
    </div>
    </section>
    
</template>
<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

const showSearchBar = ref(false);
const searchTerm = ref("");
const loading = ref(false);

function toggleSearchBar() {
  showSearchBar.value = !showSearchBar.value;
}

function handleSearch() {
  if (!showSearchBar.value) {
    console.log("No se puede buscar mientras la barra de búsqueda está oculta");
    return;
  }

  loading.value = true;
  setTimeout(() => {
    loading.value = false;

    fetchPokemonData(searchTerm.value.toLowerCase());
    searchTerm.value = "";
  }, 1000); // Simula una búsqueda de 1 segundo
}

async function fetchPokemonData(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = await response.json();

    if (!pokemonData) {
      throw new Error('Pokémon no encontrado');
    }

    pokemonFound.value = true;
    pokemonImage.value = pokemonData.sprites.front_default;
    pokemonName.value = capitalizeFirstLetter(pokemonData.name);
    pokemonType.value = pokemonData.types[0].type.name;
    pokemonDescription.value = pokemonData.forms[0].name;
  } catch (error) {
    console.error('Error al obtener datos del Pokémon:', error);
    pokemonFound.value = false;
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const pokemonImage = ref("");
const pokemonName = ref("");
const pokemonType = ref("");
const pokemonDescription = ref("");

// Maneja la actualización de los datos del Pokémon encontrado
function updatePokemonData() {
  pokemonImage.value = pokemonImage.value;
  pokemonName.value = pokemonName.value;
  pokemonType.value = pokemonType.value;
  pokemonDescription.value = pokemonDescription.value;
}

// Variables para manejar el estado del Pokémon encontrado
const pokemonFound = ref(false);
 
</script>

<style scoped>
button {
  margin-bottom: 10px;
}



h1{
  font-size: 2em;
}

template{
  margin: 0;
  width: 100%;
  padding: 0;
}

.app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh; 
  background-color: rgb(182, 182, 182);
}

.search-bar__toggle{
  margin: 1em;
}

.search-bar {
  background-color: rgba(226, 96, 9, 0.575);
  flex-direction: column;
  padding: 3em;
}

.search-results{
  margin: 2em;
}
</style>

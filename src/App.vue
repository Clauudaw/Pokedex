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
    </aside>

    <section v-show="showSearchBar" class="search-results">
      <input
        v-model="searchTerm"
        placeholder="Buscar Pokémon..."
        aria-label="Campo para ingresar el nombre del Pokémon a buscar"
      />
      <button @click="handleSearch" aria-label="Botón para iniciar la búsqueda">
        Buscar
      </button>

      <section
        v-if="pokemonFound"
        class="pokemon-info"
        role="region"
        aria-labelledby="pokemon-info-title"
      >
        <h3 id="pokemon-info-title">Información del Pokémon</h3>
        <img :src="pokemonImage" alt="Imagen del Pokémon" />
        <p><strong>Nombre:</strong> {{ pokemon.name }}</p>
        <p><strong>Tipo:</strong> {{ pokemon.type }}</p>
        <p><strong>Descripción:</strong> {{ pokemon.description }}</p>
      </section>

      <section
        v-show="loading"
        class="loading-state"
        role="status"
        aria-live="polite"
      >
        Cargando...
      </section>
    </section>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

const showSearchBar = ref(false);
const searchTerm = ref("");
const loading = ref(false);
const pokemonFound = ref(false);

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

    if (searchTerm.value.toLowerCase() === "pikachu".toLowerCase()) {
      pokemonFound.value = true;
      pokemonImage.value = "pikachu.jpg";
      pokemonName.value = "Pikachu";
      pokemonType.value = "Electric";
      pokemonDescription.value = "Un pequeño Pokémon eléctrico.";
    } else {
      pokemonFound.value = false;
    }

    searchTerm.value = "";
  }, 1000); // Simula una búsqueda de 1 segundo
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
</script>

<style scoped>
button {
  margin-bottom: 10px;
}

aside{

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


.search-bar {
  background-color: rgba(226, 96, 9, 0.575);
  flex-direction: column;
  padding: 3em;
}
</style>

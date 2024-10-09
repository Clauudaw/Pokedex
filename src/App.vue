<template>
  <section id="app">
    <button @click="toggleSearchBar">Search Pokemon</button>

    <section v-show="showSearchBar">
      <input v-model="searchTerm" placeholder="Buscar Pokémon..." />
      <button @click="handleSearch">Buscar</button>
    </section>

    <section v-if="pokemonFound">
      <img :src="pokemonImage" alt="Pokémon imagen" />
      <p><strong>Name:</strong> {{ pokemon.name }}</p>
      <p><strong>Type:</strong> {{ pokemon.type }}</p>
      <p><strong>Description:</strong> {{ pokemon.description }}</p>
    </section>

    <section v-show="loading">Cargando...</section>
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
</style>

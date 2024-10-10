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
          src="https://img.icons8.com/ios-glyphs/30/pokemon--v1.png"
          alt="pokemon--v1"
        />
      </button>

      <section v-show="showSearchBar" class="search-results">
        <input
          v-model="searchTerm"
          placeholder="Buscar Pokémon..."
          aria-label="Campo para ingresar el nombre del Pokémon a buscar"
          @keyup.enter="handleSearch"
        />
        <button
          @click="handleSearch"
          aria-label="Botón para iniciar la búsqueda"
        >
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

    <section v-if="pokemonFound" class="pokemon__section">
      <h2>{{ pokemonName }}</h2>
      <p class="p__type">{{ pokemonType }}</p>
      <img
        :src="pokemonImage"
        class="pokemon__section--img"
        alt="{{ pokemonName }}"
      />
      <p>Movimientos: {{ pokemonMoves.join(", ") }}</p>
      <p>Experiencia Base: {{ pokemonBaseExperience }}</p>
      <p>Formas: {{ pokemonForms.join(", ") }}</p>
      <p>Versiones del juego: {{ pokemonGameVersions.join(", ") }}</p>
      <p>
        Items relacionados:
        {{ pokemonItems.length > 0 ? pokemonItems.join(", ") : "Ninguno" }}
      </p>
      <p>Pokedex Entries: {{ pokemonPokedexEntries.join('\n') }}</p>
      <p>Cadena de evolución: {{ pokemonEvolutionChain }}</p>
      <p><strong>Descripción:</strong> {{ pokemonDescription }}</p>
    </section>

    <section v-if="!pokemonFound">
      No se encontró ningún Pokémon con ese nombre.
    </section>
  </section>
</template>

<script>
import { usePokemon } from "./composables/usePokemon";

export default {
  setup() {
    const {
      showSearchBar,
      searchTerm,
      loading,
      pokemonFound,
      pokemonImage,
      pokemonName,
      pokemonType,
      pokemonDescription,
      pokemonBaseExperience,
      pokemonForms,
      pokemonGameVersions,
      pokemonMoves,
      pokemonItems,
      pokemonPokedexEntries,
      pokemonEvolutionChain,
      toggleSearchBar,
      handleSearch,
    } = usePokemon();

    return {
      showSearchBar,
      searchTerm,
      loading,
      pokemonFound,
      pokemonImage,
      pokemonName,
      pokemonType,
      pokemonDescription,
      pokemonBaseExperience,
      pokemonForms,
      pokemonGameVersions,
      pokemonMoves,
      pokemonItems,
      pokemonPokedexEntries,
      pokemonEvolutionChain,
      toggleSearchBar,
      handleSearch,
    };
  },
};
</script>

<style scoped>
@import "./assets/main.css";
@import "./assets/main.css";

.app {
  display: flex;
}

</style>

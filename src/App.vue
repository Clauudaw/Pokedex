<template>
  <section class="app">
    <aside class="search-bar">
      <h1 class="search-bar__title" aria-label="Titúlo de la página Pokedex">
        Guía de Búsqueda de Pokémon
      </h1>
      <button
        class="search-bar__toggle"
        @click="toggleSearchBar"
        aria-label="Botón para mostrar la barra de búsqueda de Pokémons"
      >
        <svg
          aria-label="Icono de lupa en el botón para mostrar la barra de búsqueda de Pokémons "
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
        <img  aria-label="Icono de pokemon en el botón para mostrar la barra de búsqueda de Pokémons "
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
      <section class="pokemon__section--container" aria-label="tarjeta donde se muestra el pokemon buscado">
        <section class="pokemon__section--card">
          <section class="pokemon__section--background" aria-label="Fondo de la Imagen del pokemon buscado">
            <img aria-label="Imagen del pokemon buscado"
              :src="pokemonImage"
              class="pokemon__section--img"
              alt="{{ pokemonName }}"
            />
          </section>
          <section class="pokemon__section--content" aria-label="Contenedor de la información del pokemon">
            <h2 class="pokemon__section--name" aria-label="Nombre del pokemon buscado">{{ pokemonName }}</h2>
            <span class="pokemon__section--type" aria-label="Tipo del pokemon buscado">{{ pokemonType }}</span>
            <section class="pokemon__section--stats" aria-label="Estadísticas del pokemon buscado">
              <p aria-label="Experiencia base del pokemon buscado">Experiencia Base: {{ pokemonBaseExperience }}</p>
              <p aria-label="Movimientos del pokemon buscado">Movimientos: {{ pokemonMoves.join(", ") }}</p>
              <p aria-label="Formas del pokemon buscado">Formas: {{ pokemonForms.join(", ") }}</p>
              <p aria-label="Elementos relacionados con el pokemon buscado">
                Items relacionados:
                {{
                  pokemonItems.length > 0 ? pokemonItems.join(", ") : "Ninguno"
                }}
              </p>
              <p aria-label="Cadena de evolución del pokemon buscado">Cadena de evolución: {{ pokemonEvolutionChain }}</p>
            </section>
            <h1 aria-label="Logo de la carta pokemon" class="pokemon__section--logo">Pokemons Cards</h1>
          </section>
        </section>
      </section>

      <section class="pokemon__section--description" aria-label="Información secundaria del pokemon buscado">
        <p aria-label="Descripción del pokemon buscado"><strong>Descripción:</strong> {{ pokemonDescription }}</p>
        <p aria-label="Versiones del juego en las que aparece el pokemon buscado">Versiones del juego: {{ pokemonGameVersions.join(", ") }}</p>
        <p aria-label="Entradas de la Pokedex del pokemon buscado">Pokedex Entries: {{ pokemonPokedexEntries.join("\n") }}</p>
      </section>
    </section>

    <section aria-label="Seccion que informa de que no se ha encontrado el pokemon buscado" v-if="!pokemonFound">
      No se encontró ningún Pokémon con ese nombre.
    </section>

     <footer aria-label="Pie de página de la página Pokedex" class="footer">
      <p aria-label="Información de copyrights">&copy; 2024 Guía de Pokémon. Todos los derechos reservados.</p>
      <section class="footer__social" aria-label="Apartado para las redes sociales de la página">
        <a href="https://twitter.com" target="_blank" aria-label="Enlace de acceso a la cuenta de Twitter">
          <img
            src="https://img.icons8.com/ios-filled/30/twitter-squared.png"
            alt="Twitter"
            aria-label="Enlace de acceso a la cuenta de Twitter"
          />
        </a>
        <a href="https://facebook.com" target="_blank" aria-label="Enlace de acceso a la cuenta de Facebook">
          <img
            src="https://img.icons8.com/ios-filled/30/facebook-new.png"
            alt="Facebook"
            aria-label="Enlace de acceso a la cuenta de Facebook"
          />
        </a>
        <a href="https://instagram.com" target="_blank" aria-label="Enlace de acceso a la cuenta de Instagram">
          <img
            src="https://img.icons8.com/ios-filled/30/instagram-new.png"
            alt="Instagram"
            aria-label="Enlace de acceso a la cuenta de Instagram"
          />
        </a>
      </section>
      <p aria-label="Información de quién ha hecho la página">Desarrollado por Claudia Rey</p>
    </footer>
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
      pokemonHP,
      pokemonAttack,
      pokemonDefense,
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
@import "./assets/main.scss";
@import "./assets/base.scss";

</style>

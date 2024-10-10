// src/usePokemon.js
import { ref } from "vue";

export function usePokemon() {
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
  const pokemonOfType = ref([]);

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

      await fetchPokemonSpecies(name);
    } catch (error) {
      console.error('Error al obtener datos del Pokémon:', error);
      pokemonFound.value = false;
    }
  }

  async function fetchPokemonSpecies(name) {
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const speciesData = await speciesResponse.json();

    pokemonPokedexEntries.value = speciesData.flavor_text_entries
      .filter(entry => entry.language.name === "es")
      .map(entry => entry.flavor_text);

    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionResponse = await fetch(evolutionChainUrl);
    const evolutionData = await evolutionResponse.json();

    pokemonEvolutionChain.value = extractEvolutionChain(evolutionData.chain);
  }

  function extractEvolutionChain(chain) {
    let evolution = capitalizeFirstLetter(chain.species.name);
    while (chain.evolves_to.length > 0) {
      chain = chain.evolves_to[0];
      evolution += ` → ${capitalizeFirstLetter(chain.species.name)}`;
    }
    return evolution;
  }

  

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
    handleSearch
  };
}

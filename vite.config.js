import { fileURLToPath, URL } from 'node:url'
import { ref } from "vue";
import { defineConfig } from 'vite'

import { usePokemon } from "./composables/usePokemon";
import searchBar from "./components/SearchBar.vue";

import vue from '@vitejs/plugin-vue'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  
})

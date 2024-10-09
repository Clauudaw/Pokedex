
<template>
  <section class="weather-app">
    <header class="header">
      <section class="header__section--buttons">
        <button
          class="header__button--search"
          aria-label="Botón para acceder al botón de localizaciones "
        >
          Search for places
        </button>
        <button class="header__button--icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path
              d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-120q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm0-80Z"
            />
          </svg>
        </button>
     
      </section>
      <section class="header__section">
        <picture>
          <img src="" alt="" />
        </picture>
      </section>
      <section class="header__section--temperatura">
        <span>15</span>
        <span>ºC</span>
      </section>
      <section class="header__section">
        <p>Clouds</p>
      </section>
      <section class="header__section">
        <span class="location-info"></span>
      </section>
    </header>



      <h2>Today's Highlights</h2>
    <section class="day">
        <h3>Sun, 22 Aug</h3>
        <p>18°C</p>
        <p>17°C</p>
      </section>
      <section class="day">
        <h3>Tue, 24 Aug</h3>
        <p>17°C</p>
        <p>17°C</p>
      </section>
      <section class="day">
        <h3>Wed, 25 Aug</h3>
        <p>18°C</p>
        <p>18°C</p>
      </section>
      <section class="day">
        <h3>Thu, 26 Aug</h3>
        <p>19°C</p>
        <p>19°C</p>
      </section>
    </section>
    <section class="wind-status">
      <h2>Wind status</h2>
      <p>3.85mph</p>
    </section>

</template>

<script setup >

import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";



import { ref } from 'vue';

function formatDate(date = new Date()) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const dayOfWeek = days[date.getDay()]
  const dayOfMonth = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`
}

function getLocation() {
  return 'Monaco' //por ahora asi
}

document.addEventListener('DOMContentLoaded', function () {
  const locationInfo = document.querySelector('.location-info')

  locationInfo.innerHTML = `
        <p>Today · ${formatDate()}</p>
        <p> <svg xmlns="http://www.w3.org/2000/svg" height="1.5 em" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg> ${getLocation()}</p>
    `
})


</script>




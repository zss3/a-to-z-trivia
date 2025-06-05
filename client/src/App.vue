<script setup lang="ts">
import { RouterView } from 'vue-router'
import GeneralNavBar from './components/general/NavBar.vue'
</script>

<template>
  <header>
    <span id="site-title"><RouterLink to="/">A to Z Trivia</RouterLink></span>
    <GeneralNavBar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  margin: 0;
}

header {
  padding: 0 2%;
  border-bottom: 1px solid var(--p-menubar-border-color);
}

#site-title {
  font-size: 2rem;
  font-weight: 700;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  place-items: center;
  padding: 0 2%;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    justify-content: space-between;
  }
}
#site-title a {
  display: inline-block;
  transition: transform 0.4s ease-in-out;
}
#site-title a:hover {
  background-color: transparent;
  transform: scale(1.03);
}
</style>

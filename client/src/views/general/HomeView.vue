<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="home-page">
    <div class="hero">
      <div class="hero-content">
        <h1>Host Bar Trivia Effortlessly</h1>
        <p class="subtitle">
          Simplify your trivia nights with our platform — host games and engage players with our
          expertly crafted trivia games.
        </p>
        <div class="hero-actions">
          <Button label="Sign Up" class="p-button-lg" @click="router.push('/SignUp')" />
          <Button
            label="Preview Questions"
            class="p-button-outlined p-button-lg"
            @click="router.push('QuestionsPreview')"
          />
        </div>
      </div>
    </div>

    <!-- Features section -->
    <div class="features">
      <Card class="feature-card">
        <template #title>Save Time, Host More</template>
        <template #content>
          <p>Focus on running the night — we handle the questions and structure.</p>
        </template>
      </Card>
      <Card class="feature-card">
        <template #title>Engage Players</template>
        <template #content>
          <p>Keep the crowd entertained and coming back with interactive trivia games.</p>
        </template>
      </Card>
      <Card class="feature-card">
        <template #title>Host Anywhere</template>
        <template #content>
          <p>Run trivia nights in any venue with just a laptop and our platform.</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
}

/* Hero Section */
.hero {
  padding: 6rem 2rem;
  text-align: center;
}
.hero-content {
  max-width: 800px;
  margin: 0 auto;
}
.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}
.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Features Section */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}
@media (max-width: 840px) {
  .features {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  text-align: center;
}
</style>

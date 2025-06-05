<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useRouter } from 'vue-router'
const router = useRouter()

// Example data for recent games (replace with real data later)
const recentGames = [
  { id: 1, title: 'General Knowledge', date: '2025-06-01' },
  { id: 2, title: 'Movie Trivia', date: '2025-05-28' },
  { id: 3, title: 'General Knowledge', date: '2025-05-25' },
]
</script>

<template>
  <h1>Admin Dashboard</h1>
  <div class="dashboard-container">
    <section class="quick-actions">
      <h2>Quick Actions</h2>
      <div class="card-row">
        <Card class="dashboard-card">
          <template #title>New Trivia Game</template>
          <template #content>
            <p>Create a new trivia game for users.</p>
            <Button
              label="Create Game"
              icon="pi pi-plus"
              @click="router.push({ name: 'AdminCreateGame' })"
            />
          </template>
        </Card>
        <Card class="dashboard-card">
          <template #title>Manage Hosts</template>
          <template #content>
            <p>View and manage host venues.</p>
            <Button label="Go to Hosts" icon="pi pi-users" />
          </template>
        </Card>
        <Card class="dashboard-card">
          <template #title>Act as Host</template>
          <template #content>
            <p>View a host dashboard.</p>
            <Button label="View as Host" icon="pi pi-cog" />
          </template>
        </Card>
      </div>
    </section>

    <Divider />

    <section class="recent-games">
      <h2>Recent Game Uploads</h2>
      <router-link to="/all-games"><small>View All</small></router-link>
      <div class="card-row">
        <Card class="dashboard-card" v-for="game in recentGames" :key="game.id">
          <template #title>{{ game.title }}</template>
          <template #content>
            <p>Date Uploaded: {{ game.date }}</p>
            <Button label="View Details" icon="pi pi-search" text />
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<style scoped>
h2 {
  display: inline-block;
  margin-right: 0.5rem;
}
.dashboard-container {
  padding: 2rem 0;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card-row > * {
  flex: 1 1 250px;
  min-width: 250px;
}

.dashboard-card {
  width: 20rem;
}

button {
  margin-top: 0.5rem;
}
</style>

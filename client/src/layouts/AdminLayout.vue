<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
</script>

<template>
  <!-- Show button only if NOT on the admin dashboard -->
  <div class="admin-nav" v-if="route.name !== 'AdminDashboard'">
    <Button
      label="Back to Admin Dashboard"
      icon="pi pi-arrow-left"
      @click="router.push({ name: 'AdminDashboard' })"
      text
    />
  </div>
  <router-view />
</template>

<style scoped>
.admin-nav {
  position: absolute;
  padding: 0 2%;
  width: 100%;
}
Button {
  padding-left: 0;
  margin-top: 0.5rem;
}
</style>

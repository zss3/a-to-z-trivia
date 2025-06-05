<script setup lang="ts">
import Menubar from 'primevue/menubar'

const items = [
  { label: 'About', icon: 'pi pi-info-circle', route: '/about' },
  { label: 'Log In', icon: 'pi pi-sign-in', route: '/login' },
]
</script>

<template>
  <nav>
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon"></span>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon"></span>
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down"></span>
        </a>
      </template>
    </Menubar>
  </nav>
</template>

<style scoped></style>

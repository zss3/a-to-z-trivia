<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import HostFormModal from '@/components/admin/HostFormModal.vue'

type Host = {
  id: number
  venueName: string
  location: string
  isActive: boolean
  email: string
  contactName: string
}

const showModal = ref(false)
const selectedHost = ref<Host | null>(null)
// const dayAbbr: Record<string, string> = {
//   Monday: 'M',
//   Tuesday: 'T',
//   Wednesday: 'W',
//   Thursday: 'Th',
//   Friday: 'F',
//   Saturday: 'Sa',
//   Sunday: 'Su',
// }

const hosts = ref([
  { id: 1, venueName: 'Host A', location: 'Venue 1', isActive: true },
  { id: 2, venueName: 'Host B', location: 'Venue 2', isActive: false },
])

function onAddHost() {
  selectedHost.value = null
  showModal.value = true
}

function onEditHost(host: Host) {
  console.log(host)
  selectedHost.value = host
  showModal.value = true
}

function handleSave(updatedHost: Host) {
  if (selectedHost.value) {
    // update existing host in list
    selectedHost.value = updatedHost
    selectedHost.value = null
  } else {
    // add new host to list
    hosts.value.unshift(updatedHost)
  }
}
</script>

<template>
  <div class="manage-hosts-page">
    <h1 class="page-title">Manage Hosts</h1>
    <Button id="add-host" label="Add Host" icon="pi pi-plus" @click="onAddHost" />
    <div class="hosts-list">
      <DataTable
        :value="hosts"
        selectionMode="single"
        stripedRows
        paginator
        :alwaysShowPaginator="false"
        :rows="20"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @rowClick="onEditHost"
      >
        <Column field="venueName" header="Venue Name" sortable>
          <template #body="slotProps">
            <Button text :label="slotProps.data.venueName" @click="onEditHost(slotProps.data)" />
          </template>
        </Column>
        <Column field="location" header="Location" sortable />
        <Column field="isActive" header="Active" sortable>
          <template #body="{ data }">
            <div id="active-cell">
              <span v-if="data.isActive" class="pi pi-check" style="color: green" />
              <span v-else class="pi pi-times" style="color: red" />
            </div>
          </template>
        </Column>
        <!-- Might not show this column
        <Column field="triviaDays" header="Trivia Days">
          <template #body="{ data }">
            <span>{{ data.triviaDays.map((day: string) => dayAbbr[day] || day).join(', ') }}</span>
          </template>
        </Column> -->
      </DataTable>
    </div>
  </div>
  <HostFormModal v-model="showModal" :hostData="selectedHost" @saved="handleSave" />
</template>

<style scoped>
.manage-hosts-page {
  padding: 2rem 0;
}

.hosts-list {
  width: 100%;
  margin: 0 auto;
}
#active-cell {
  display: flex;
  justify-content: center;
}
</style>

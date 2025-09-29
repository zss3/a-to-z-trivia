<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'

const file = ref<File | null>(null)
const name = ref('General Knowledge')
const dates = ref<Date[] | null>(null)

function onFileSelect(event: { files: File[] }) {
  file.value = event.files[0] || null
}

function onSubmit() {
  // Add submit logic here
  alert(`Game: ${name.value}\nDates: ${dates.value}\nFile: ${file.value?.name || 'None'}`)
}
</script>

<template>
  <div class="create-game-page">
    <h1 class="page-title">Create New Trivia Game</h1>
    <form class="create-game-form" @submit.prevent="onSubmit">
      <div class="form-field">
        <label for="file-upload">Upload File</label>
        <FileUpload
          id="file-upload"
          name="file"
          accept=".pdf"
          :fileLimit="1"
          mode="basic"
          chooseLabel="Choose File"
          @select="onFileSelect"
          class="file-upload"
        >
          <template #empty>
            <span>Drag and drop file here to upload.</span>
          </template>
        </FileUpload>
        <span v-if="file" class="file-name">{{ file?.name }}</span>
      </div>

      <div class="form-field">
        <label for="game-name">Game Name</label>
        <InputText id="game-name" required="true" v-model="name" />
      </div>

      <div class="form-field">
        <label for="game-dates">Game Date(s)</label>
        <Calendar
          id="game-dates"
          v-model="dates"
          selectionMode="multiple"
          showIcon
          placeholder="Select one or more dates"
          class="calendar"
        />
      </div>

      <Button type="submit" label="Create Game" icon="pi pi-check" class="submit-btn" />
    </form>
  </div>
</template>

<style scoped>
.create-game-page {
  min-height: 100%;
  padding: 2rem 5vw 2rem 5vw;
  display: flex;
  flex-direction: column;
}

.create-game-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 700px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
}

.file-upload {
  width: 100%;
}

:deep(.p-fileupload-basic) {
  justify-content: flex-start;
}

.file-name {
  font-size: 0.95rem;
  color: #555;
  margin-top: 0.25rem;
}

.calendar {
  width: 100%;
}

.submit-btn {
  margin-top: 1rem;
  width: 100%;
}
</style>

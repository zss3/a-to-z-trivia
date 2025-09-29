<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import DatePicker from 'primevue/datepicker'

type Host = {
  id: number
  venueName: string
  location: string
  email: string
  contactName: string
}

type Subscription = {
  startDate: Date
  endDate: Date
  daysOfWeek: string[]
  venueId: number
  id: string
}

const subscriptions = ref<Subscription[]>([])
const activePanel = ref<string | null>(null)

onMounted(async () => {
  subscriptions.value = await fetchSubscriptions()
  sortSubscriptions()
})

const props = defineProps<{
  modelValue: boolean
  hostData?: Host | null
}>()
const emit = defineEmits(['update:modelValue', 'saved'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const isNewHost = computed(() => !props.hostData)

const editableHost = ref<Host>({
  id: 0,
  venueName: '',
  location: '',
  email: '',
  contactName: '',
})

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

watch(
  () => props.hostData,
  (newVal) => {
    editableHost.value = newVal
      ? { ...newVal }
      : { id: 0, venueName: '', location: '', email: '', contactName: '' }
  },
  { immediate: true },
)

async function fetchSubscriptions() {
  //This will be a DB call to get subscriptions from subscriptions table by venueID.
  //For now, we will return a mock array of subscriptions.
  return [
    {
      startDate: new Date('2025-02-15T12:00:00'),
      endDate: new Date('2025-12-01T12:00:00'),
      daysOfWeek: ['Monday', 'Wednesday'],
      venueId: 1,
      id: 'sub1',
    },
    {
      startDate: new Date('2024-01-01T12:00:00'),
      endDate: new Date('2024-12-31T12:00:00'),
      daysOfWeek: ['Tuesday', 'Thursday'],
      venueId: 1,
      id: 'sub2',
    },
  ]
}

function sortSubscriptions() {
  subscriptions.value.sort((a, b) => {
    // Sort by endDate descending
    const endDiff = b.endDate.getTime() - a.endDate.getTime()
    if (endDiff !== 0) return endDiff
    // If endDate is the same, sort by startDate descending
    return b.startDate.getTime() - a.startDate.getTime()
  })
}

function addSubscription() {
  subscriptions.value.unshift({
    startDate: new Date(),
    endDate: new Date(),
    daysOfWeek: [],
    venueId: editableHost.value.id,
    id: `new${subscriptions.value.length + 1}`,
  })
}

//Delete subscription only if it's a new, unsaved subscription
//Otherwise, change end date to end an existing subscription early
function deleteSubscription(index: number) {
  const sub = subscriptions.value[index]
  if (isSubscriptionNew(sub)) {
    subscriptions.value.splice(index, 1)
  }
}

function isSubscriptionNew(sub: Subscription) {
  return sub.id.startsWith('new')
}
function close() {
  visible.value = false
}

function handleSubmit() {
  emit('saved', editableHost.value)
  close()
}
</script>

<template>
  <Dialog
    id="host-modal"
    v-model:visible="visible"
    :header="isNewHost ? 'Add Host' : 'Edit Host'"
    modal
    :style="{ width: '60vw', minWidth: '400px' }"
  >
    <form id="host-modal-form" @submit.prevent="handleSubmit">
      <div class="field">
        <label>Venue Name</label>
        <InputText v-model="editableHost.venueName" required />
      </div>
      <div class="field">
        <label>Location</label>
        <InputText v-model="editableHost.location" required />
      </div>
      <div class="field">
        <label>Email</label>
        <InputText type="email" v-model="editableHost.email" required />
      </div>
      <div class="field">
        <label>Contact Name</label>
        <InputText v-model="editableHost.contactName" required />
      </div>
      <div class="field">
        <div class="subscription-header">
          <label>Subscriptions</label>
          <Button
            type="button"
            size="small"
            rounded
            raised
            severity="secondary"
            @click="addSubscription"
            >Add Subscription</Button
          >
        </div>
        <Accordion v-model="activePanel">
          <AccordionPanel
            v-for="(subscription, index) in subscriptions"
            :key="subscription.id"
            :value="subscription.id"
          >
            <AccordionHeader>
              <span>
                {{ subscription.startDate.toLocaleDateString() }} -
                {{ subscription.endDate.toLocaleDateString() }}
                <span v-if="isSubscriptionNew(subscription)">
                  <small>*New*</small>
                  <Button
                    icon="pi pi-trash"
                    text
                    severity="danger"
                    @click="deleteSubscription(index)"
                  />
                </span>
              </span>
            </AccordionHeader>
            <AccordionContent>
              <div class="field">
                <label>Trivia Days</label>
                <div class="checkbox-row">
                  <div v-for="day of days" :key="day" class="checkbox-item">
                    <Checkbox
                      v-model="subscription.daysOfWeek"
                      :inputId="`${subscription.id}-${day}`"
                      name="category"
                      :value="day"
                    />
                    <label :for="`${subscription.id}-${day}`">{{ day }}</label>
                  </div>
                </div>
              </div>
              <div class="field date-inputs">
                <span>
                  <label>Start Date</label>
                  <DatePicker v-model="subscription.startDate" class="date-input" />
                </span>
                <span>
                  <label>End Date</label>
                  <DatePicker v-model="subscription.endDate" class="date-input" />
                </span>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </form>
    <template #footer>
      <div class="buttons">
        <Button label="Cancel" @click="close" severity="secondary" />
        <Button label="Save" type="submit" form="host-modal-form" />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 0.25rem;
}

.field:first-of-type {
  margin-top: 0;
}

.field:last-of-type {
  margin-bottom: 0;
}

.checkbox-group {
  justify-content: space-around;
}

.checkbox-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  justify-content: space-around;
}

.checkbox-item {
  display: flex;
  align-items: center;
}

.checkbox-item label {
  margin-left: 0.5rem;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.date-inputs {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  label {
    margin-right: 0.5rem;
  }
}

.subscription-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  // TODO: Connect to Supabase Auth here
  setTimeout(() => {
    loading.value = false
    router.push({ name: 'AdminDashboard' }) // redirect to admin home
  }, 1000)
}

const handleSocialLogin = (provider: string) => {
  // TODO: Connect to Supabase OAuth here
  alert(`Login with ${provider} coming soon!`)
}
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <div class="p-fluid">
      <div class="p-field">
        <InputText
          id="email"
          v-model="email"
          type="email"
          placeholder="Email"
          autocomplete="username"
        />
      </div>
      <div class="p-field">
        <Password
          id="password"
          v-model="password"
          :feedback="false"
          placeholder="Password"
          toggleMask
          autocomplete="current-password"
        />
      </div>
      <Button label="Log In" :loading="loading" class="p-mt-2" @click="handleLogin" />
      <div class="extra-links">
        <router-link to="/forgot-password">Forgot Password</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </div>
    <div class="social-login">
      <p>or sign in with</p>
      <Button
        icon="pi pi-google"
        label="Google"
        class="p-button-outlined p-mr-2"
        @click="handleSocialLogin('google')"
      />
      <Button
        icon="pi pi-facebook"
        label="Facebook"
        class="p-button-outlined"
        @click="handleSocialLogin('facebook')"
      />
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 0;
}

.p-field {
  margin: 1rem 0;
}

.p-field :deep(.p-inputtext),
.p-field :deep(.p-password) {
  width: 100%;
  box-sizing: border-box;
}

.p-field :deep(.p-password-toggle-mask-icon) {
  cursor: pointer;
  :hover {
    color: var(--p-primary-color);
  }
}

.login-container {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.social-login {
  margin-top: 2rem;
  text-align: center;
  button {
    margin: 0 0.5rem;
  }
}

.extra-links {
  display: flex;
  flex-direction: column;
}

a:hover {
  background-color: transparent;
  text-decoration: underline;
}
</style>

<template>
  <div id="login-page">
    <img src="../../assets/icon-left-font-monochrome-white.svg" alt="Logo groupomania">

    <form action="">
      <BaseInput
        v-model="data.email"
        :name="emailName"
        type="email"
        :error="focus.includes('email') ? errorEmail : ''"
        @focusout="focusOut('email')"
        @focusin="focus = focus.filter((item) => item !== 'email')"
      />

      <BaseInput
        v-model="data.password"
        :name="passwordName"
        type="password"
        :error="focus.includes('password') ? errorPassword : ''"
        @focusout="focusOut('password')"
        @focusin="focus = focus.filter((item) => item !== 'password')"
      />

      <!--      <button :disabled="!disabled" @click="login($event)">
        Se connecter
      </button> -->

      <BaseButton :disabled-value="!disabled" text-value="Se connecter" @click="login($event)" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import { useAuthStore } from '../../store'

const data = reactive({
  email: '',
  password: '',
})

// Set name input
const emailName = 'Adresse email'
const passwordName = 'Mot de passe'

// Set error messages
const errorEmail = 'Veuillez entrer une adresse email valide.'
const errorPassword = 'Votre mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule et un chiffre.'

// Set regex
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const focus = ref([''])
const disabled = ref(true)

// Set computed
const isFormValid = computed(() => {
  // Check if email and password are valid
  return regexEmail.test(data.email) && regexPassword.test(data.password)
})

// Set watch
watch(isFormValid, (value) => {
  disabled.value = !value
})

// Set methods
const login = (event: any) => {
  event.preventDefault()

  const authStore = useAuthStore()
  const { email, password } = data

  /* if (disabled.value)
    return */

  return authStore.login(email, password)
    .then(() => {
      console.log('login success')
    })
}

const focusOut = (type: string) => {
  // Check type
  if (type === 'email' && data.email && data.email.length > 0 && !regexEmail.test(data.email))
    focus.value.push(type)
  else if (type === 'password' && data.password && data.password.length > 0 && !regexPassword.test(data.password))
    focus.value.push(type)
}
</script>

<style lang="scss">
#login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  img {
    width: 485px;
    margin-bottom: 150px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
    margin: 0 auto;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;
    }
  }
}
</style>

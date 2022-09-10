<template>
  <div id="signup-page">
    <img src="../../assets/icon-left-font-monochrome-white.svg" alt="Logo groupomania">

    <form action="">
      <BaseInput
        v-model="data.firstName"
        :name="firstNameName"
        type="text"
        :error="focus.includes('firstName') ? errorFirstName : ''"
        @focusout="focusOut('firstName')"
        @focusin="focus = focus.filter((item) => item !== 'firstName')"
      />

      <BaseInput
        v-model="data.lastName"
        :name="lastNameName"
        type="text"
        :error="focus.includes('lastName') ? errorLastName : ''"
        @focusout="focusOut('lastName')"
        @focusin="focus = focus.filter((item) => item !== 'lastName')"
      />

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

      <BaseButton :disabled-value="disabled" text-value="Créer un compte" @click="signup($event)" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import { useAuthStore } from '../../store'
import router from '../../router/router'
import { accountService } from '../../_services'

const data = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

// Set name input
const firstNameName = 'Prénom'
const lastNameName = 'Nom'
const emailName = 'Adresse email'
const passwordName = 'Mot de passe'

// Set error messages
const errorFirstName = 'Veuillez entrer un prénom valide.'
const errorLastName = 'Veuillez entrer un nom valide.'
const errorEmail = 'Veuillez entrer une adresse email valide.'
const errorPassword = 'Votre mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule et un chiffre.'

// Set regex
const regexName = /^[a-zA-ZÀ-ÿ-]+(\s[a-zA-ZÀ-ÿ-]+)*$/
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const focus = ref([''])
const disabled = ref(true)

// Set computed
const isFormValid = computed(() => {
  // Check if all elements are valid
  return regexEmail.test(data.email) && regexPassword.test(data.password) && regexName.test(data.firstName) && regexName.test(data.lastName)
})

// Set watch
watch(isFormValid, (value) => {
  disabled.value = !value
})

// Set methods
const signup = async (event: any) => {
  event.preventDefault()

  if (disabled.value)
    return

  const { firstName, lastName, email, password } = data

  const authStore = useAuthStore()

  // return authStore.signup(firstName, lastName, email, password)
  const dataSignup = await accountService.signup(firstName, lastName, email, password)
    .then((res) => {
      if (res.status !== 201)
        throw new Error('Erreur lors de la création du compte')

      return res.data
    })
    .catch((err) => {
      console.error(err)

      throw err
    })

  authStore.$patch({
    user: dataSignup.user,
    token: dataSignup.access_token,
    logged: true,
  })

  await router.push(authStore.returnUrl || '/')
}

const focusOut = (type: string) => {
  // Check type
  if (type === 'email' && data.email && data.email.length > 0 && !regexEmail.test(data.email))
    focus.value.push(type)
  else if (type === 'password' && data.password && data.password.length > 0 && !regexPassword.test(data.password))
    focus.value.push(type)
  else if (type === 'firstName' && data.firstName && data.firstName.length > 0 && !regexName.test(data.firstName))
    focus.value.push(type)
  else if (type === 'lastName' && data.lastName && data.lastName.length > 0 && !regexName.test(data.lastName))
    focus.value.push(type)
}
</script>

<style lang="scss">
#signup-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0;

  img {
    width: 485px;
    margin-bottom: 50px;
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
    }
  }
}
</style>

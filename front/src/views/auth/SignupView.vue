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
import useValidate from '@vuelidate/core'
import { alpha, email, minLength, required } from '@vuelidate/validators'
import BaseInput from '../../components/common/BaseInput.vue'
import BaseButton from '../../components/common/BaseButton.vue'
import { useAuthStore } from '../../store'
import router from '../../router/router'
import { accountService } from '../../_services'

const data = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const rules = computed(() => ({
  firstName: { required, minLength: minLength(2), alpha },
  lastName: { required, minLength: minLength(2), alpha },
  email: { required, email },
  password: { required, minLength: minLength(8) },
}))

const v$ = useValidate(rules, data)

// Set name input
const firstNameName = 'Prénom'
const lastNameName = 'Nom'
const emailName = 'Adresse email'
const passwordName = 'Mot de passe'

// Set error messages
const errorFirstName = 'Veuillez entrer un prénom valide.'
const errorLastName = 'Veuillez entrer un nom valide.'
const errorEmail = 'Veuillez entrer une adresse email valide.'
const errorPassword = 'Votre mot de passe doit contenir au moins 8 caractères.'

const focus = ref([''])
const disabled = ref(true)

// Set computed
const isFormValid = computed(() => {
  // Check if all elements are valid
  return v$.value.$valid
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
  if (type === 'email' && v$.value.email.$invalid)
    focus.value.push(type)
  else if (type === 'password' && v$.value.password.$invalid)
    focus.value.push(type)
  else if (type === 'firstName' && v$.value.firstName.$invalid)
    focus.value.push(type)
  else if (type === 'lastName' && v$.value.lastName.$invalid)
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

<template>
  <div id="login-page">
    <img src="@/assets/icon-left-font-monochrome-white.svg" alt="Logo groupomania">

    <form action="">
      <BaseInput
        v-model="data.email"
        :name="emailName"
        type="email"
      />

      <BaseInput
        v-model="data.password"
        :name="passwordName"
        type="password"
      />

      <BaseButton text-value="Se connecter" @click="login($event)" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BaseInput from '../../components/common/BaseInput.vue'
import BaseButton from '../../components/common/BaseButton.vue'
import { useAuthStore } from '../../store'
import { accountService } from '../../_services'
import router from '../../router/router'

const data = reactive({
  email: '',
  password: '',
})

// Set name input
const emailName = 'Adresse email'
const passwordName = 'Mot de passe'

// Set methods
const login = async (event: any) => {
  event.preventDefault()

  const authStore = useAuthStore()
  const { email, password } = data

  const dataLogin = await accountService.login(email, password)
    .then((res) => {
      if (res.status !== 200)
        throw new Error('Une erreur est survenue lors de la connexion.')

      return res.data
    })
    .catch((err) => {
      console.error(err)
      throw err
    })

  // Update pinia state
  authStore.$patch({
    token: dataLogin.access_token,
    logged: true,
    user: {
      icon_url: dataLogin.user.icon_url,
      first_name: dataLogin.user.first_name,
      last_name: dataLogin.user.last_name,
      uuid: dataLogin.user.uuid,
    },
  })

  // Redirect to home
  await router.push('/')
}
</script>

<style lang="scss">
#login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 50px 0;
  height: calc(100vh - 100px);

  img {
    width: 485px;
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

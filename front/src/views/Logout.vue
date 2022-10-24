<template>
  <div class="page-container">
    <h1 class="page-title">
      Déconnexion...
    </h1>

    <div class="logout-container">
      <div class="logout-text">
        Vous êtes déconnecté.
      </div>
      <div class="logout-text">
        Vous allez être redirigé vers la page d'accueil.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { accountService } from '../_services'

accountService.logout()

setTimeout(() => {
  window.location.href = '/'
}, 1000)
</script>

<style scoped lang="scss">
.logout-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  margin-left: 50px;
}
</style>

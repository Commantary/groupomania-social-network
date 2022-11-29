<template>
  <div class="friends-list">
    <h1 class="page-title">
      Liste d'amis
    </h1>

    <div v-if="data.loading" class="information-text--margin">
      <h2>Chargement en cours...</h2>
    </div>

    <p v-if="data.friends.length === 0 && !data.loading" class="information-text--margin">
      Vous n'avez pas encore d'amis
    </p>

    <div v-if="!data.loading && data.friends.length !== 0" class="friends-list__list">
      <UserList :friends="data.friends" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { User } from '../models/User.model'
import { useUsersStore } from '../store/users.store'
import { useAuthStore } from '../store'
import UserList from '@/components/users/lists/UserList.vue'

const data = reactive({
  loading: true,
  friends: [] as User[],
})

useUsersStore().fetchFriendsList()
  .then(() => {
    data.friends = useAuthStore().getFriends
    data.loading = false
  })
</script>

<style scoped lang="scss">
.information-text--margin {
  margin-left: $page-title-margin-left;
}
</style>

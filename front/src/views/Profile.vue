<template>
  <div id="profil-container" class="page-container">
    <div v-if="data.loading">
      <h1 class="page-title">
        Chargement en cours...
      </h1>
    </div>

    <div v-if="data.error">
      <h1 class="page-title">
        Il y a eu une erreur lors du chargement
      </h1>
    </div>

    <div v-if="!data.loading && !data.error" id="header">
      <ProfileHeader :user="data.user" />
    </div>

    <div v-if="!data.loading && !data.error" id="activities">
      <ActivitiesList :uuid="uuid" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { userService } from '../_services'
import type { User } from '../models/User.model'
import { useUsersStore } from '../store/users.store'
import ProfileHeader from '@/components/users/common/ProfileHeader.vue'
import ActivitiesList from '@/components/users/lists/ActivitiesList.vue'

const props = defineProps<{
  uuid: string
}>()

const data = reactive({
  user: {} as User,
  loading: true,
  error: false,
})

getUser()

function getUser() {
  userService.getUserByUuid(props.uuid)
    .then((res: any) => {
      data.user = res.data.user

      useUsersStore().fetchUserInvitations()
        .then(() => {
          data.loading = false
        })
    })
    .catch((err: Error) => {
      console.error(err)
      data.loading = false
      data.error = true
    })
}

// Watch for changes in the uuid prop
watch(() => props.uuid, () => {
  data.loading = true
  data.error = false
  getUser()
})
</script>

<style scoped lang="scss">
</style>

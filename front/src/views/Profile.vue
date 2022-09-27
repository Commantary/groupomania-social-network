<template>
  <div id="profil-container">
    <div class="profile-page-title">
      <font-awesome-icon class="back-icon" icon="fa-solid fa-arrow-left" @click="goBack()" />
    </div>

    <div v-if="data.loading">
      <h1>Chargement en cours...</h1>
    </div>

    <div v-if="data.error">
      <h1>Il y a eu une erreur lors du chargement</h1>
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
import { reactive } from 'vue'
import { userService } from '../_services'
import router from '../router/router'
import type { User } from '../models/User.model'
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
      data.loading = false
    })
    .catch((err: Error) => {
      console.error(err)
      data.loading = false
      data.error = true
    })
}

function goBack() {
  if (history.length > 1)
    history.back()
  else
    router.push('/')
}
</script>

<style lang="scss">
.back-icon {
  margin-right: 24px;
  margin-left: 8px;
  font-size: 28px;
  cursor: pointer;
  padding: 8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: $primary-color;
    background-color: $tertiary-color-dark;
  }
}
</style>

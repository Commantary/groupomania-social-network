<template>
  <div class="invitation-list">
    <div v-if="data.loading" class="information-text--margin">
      <h1>Chargement en cours...</h1>
    </div>

    <p v-if="getInvitations.length === 0" class="information-text--margin">
      Il n'y a pas d'invitations
    </p>

    <InvitationItem v-for="item in getInvitations" :key="item.created_at" :invitation="item" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Invitation } from '../../../models/Invitation.model'
import { useUsersStore } from '../../../store/users.store'
import InvitationItem from '@/components/users/common/InvitationItem.vue'

const data = reactive({
  loading: true,
})

useUsersStore().fetchUserInvitations().then(() => {
  data.loading = false
})

const getInvitations = computed(() => {
  return useUsersStore().getInvitations
})

/* for (let i = 0; i < 10; i++) {
  data.invitations.push({
    uuid: 'uuid',
    username: 'username',
    icon_url: 'default.png',
    friends_count: 15,
    created_at: 'created_at',
  })
} */
</script>

<style lang="scss">
.invitation-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 2rem;
  margin-right: auto;
}
</style>

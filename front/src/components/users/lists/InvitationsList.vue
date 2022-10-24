<template>
  <div class="invitation-list">
    <InvitationItem v-for="item in data.invitations" :key="item.created_at" :invitation="item" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Invitation } from '../../../models/Invitation.model'
import InvitationItem from '@/components/users/common/InvitationItem.vue'

const data = reactive({
  invitations: [] as Invitation[],
})

for (let i = 0; i < 10; i++) {
  data.invitations.push({
    uuid: 'uuid',
    username: 'username',
    icon_url: 'default.png',
    friends_count: 15,
    created_at: 'created_at',
  })
}
</script>

<style lang="scss">
.invitation-list {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-left: 2rem;
  margin-right: auto;
}
</style>

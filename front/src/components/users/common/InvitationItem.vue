<template>
  <div class="invitation-item">
    <ProfilePicture :src="invitation.sender.icon_url" :size="42" />

    <h3 class="username">
      {{ getUsername }}
    </h3>

    <p class="friends-count">
      {{ getFriendsCount }}
    </p>

    <div class="buttons-validation">
      <button class="icon check" @click="acceptInvitation">
        <Icon icon="fa-solid fa-circle-check" />
      </button>
      <button class="icon xmark" @click="refuseInvitation">
        <Icon icon="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Invitation } from '../../../models/Invitation.model'
import { useUsersStore } from '../../../store/users.store'
import ProfilePicture from '@/components/users/common/ProfilePicture.vue'
import Icon from '@/components/common/Icon.vue'

const props = defineProps<{
  invitation: Invitation
}>()

const getUsername = computed(() => {
  return `${props.invitation.sender.first_name.charAt(0).toUpperCase()}${props.invitation.sender.first_name.slice(1)}`
})

const getFriendsCount = computed(() => {
  if (props.invitation.sender.friends.length === 1)
    return '(1 ami)'
  else if (props.invitation.sender.friends.length === 0)
    return '(0 amis)'
  else
    return `(${props.invitation.sender.friends.length} amis)`
})

const acceptInvitation = () => {
  useUsersStore().acceptInvitation(props.invitation)
}

const refuseInvitation = () => {
  useUsersStore().rejectInvitation(props.invitation)
}
</script>

<style lang="scss">
.invitation-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 350px;

  margin-left: 4px;
  margin-right: 4px;
  padding: 6px 14px;

  background-color: $bg-120;
  border-radius: 50px;

  margin-bottom: 20px;

  .username {
    font-weight: 400;
  }

  .friends-count {
    color: $neutral-2;
  }

  .buttons-validation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 22%;
  }

  .icon {
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;

    &:hover {
      color: $primary-color;
    }

    &.check {
      color: $neutral-3;
    }

    &.xmark {
      color: $neutral-2;
    }
  }
}
</style>

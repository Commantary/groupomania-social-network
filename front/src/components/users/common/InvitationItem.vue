<template>
  <div class="invitation-item">
    <ProfilePicture :src="invitation.icon_url" size="42" />

    <h3 class="username">
      {{ invitation.username }}
    </h3>

    <p class="friends-count">
      {{ getFriendsCount }}
    </p>

    <div class="buttons-validation">
      <button class="icon check">
        <Icon icon="fa-solid fa-circle-check" />
      </button>
      <button class="icon xmark">
        <Icon icon="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Invitation } from '../../../models/Invitation.model'
import ProfilePicture from '@/components/users/common/ProfilePicture.vue'
import Icon from '@/components/common/Icon.vue'

const props = defineProps<{
  invitation: Invitation
}>()

const getFriendsCount = computed(() => {
  if (props.invitation.friends_count === 1)
    return '(1 ami)'
  else if (props.invitation.friends_count === 0)
    return '(0 amis)'
  else
    return `(${props.invitation.friends_count} amis)`
})
</script>

<style lang="scss">
.invitation-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 350px;

  margin-left: auto;
  margin-right: auto;
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

  button {
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

<template>
  <div class="user-list__container">
    <div v-for="friend in data.friends" :key="friend.uuid" class="user-list__item">
      <ProfilePicture :clickable="true" :uuid="friend.uuid" :src="friend.icon_url" :size="42" />

      <h3 class="username">
        {{ getUsername(friend) }}
      </h3>

      <p class="friends-count">
        {{ getFriendsCount(friend) }}
      </p>

      <button class="icon xmark" @click="removeFriend(friend)">
        <Icon icon="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { User } from '../../../models/User.model'
import { useUsersStore } from '../../../store/users.store'
import ProfilePicture from '../../../components/users/common/ProfilePicture.vue'
import Icon from '../../../components/common/Icon.vue'

const props = defineProps<{
  friends: User[]
}>()

const data = reactive({
  friends: props.friends as User[],
})

const getUsername = (friend: User) => {
  const firstName = friend.first_name.charAt(0).toUpperCase() + friend.first_name.slice(1)
  return `${firstName} ${friend.last_name.charAt(0).toUpperCase()}.`
}

const getFriendsCount = (friend: User) => {
  if (friend.friends.length === 1)
    return '(1 ami)'
  else if (friend.friends.length === 0)
    return '(0 amis)'
  else
    return `(${friend.friends.length} amis)`
}

const removeFriend = (friend: User) => {
  useUsersStore().removeFriend(friend.uuid)

  const index = data.friends.findIndex(f => f.uuid === friend.uuid)

  if (index !== -1)
    data.friends.splice(index, 1)
}
</script>

<style scoped lang="scss">
.user-list {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: calc(100% - 2rem);
    height: 100%;
    padding: 0 1rem;
    margin-top: 2rem;
  }

  &__item {
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
  }
}

.icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  margin-top: auto;
  margin-bottom: auto;

  background-color: transparent;
  border: none;
  outline: none;
  padding: 0 3rem 0 0;

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
</style>

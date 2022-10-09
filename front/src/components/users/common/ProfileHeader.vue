<template>
  <div class="header-container">
    <div class="main-header">
      <div class="left-header">
        <ProfilePicture :size="152" :src="getSrc" />
        <p><span>{{ getFriendsCount }}</span> amies</p>
      </div>
      <div class="right-header">
        <h2>{{ getUserName }}</h2>
        <p>{{ getBio }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '../../../models/User.model'
import router from '../../../router/router'
import ProfilePicture from '@/components/users/common/ProfilePicture.vue'

const props = defineProps<{
  user: User
}>()

const getUserName = computed(() => `${props.user.first_name} ${props.user.last_name}`)

const getSrc = computed(() => props.user.icon_url)

const getBio = computed(() => props.user.bio ?? 'Aucune bio')

const getFriendsCount = computed(() => props.user.friends.length)

function goBack() {
  if (history.length > 1)
    history.back()
  else
    router.push('/')
}
</script>

<style lang="scss">
.header-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $bg-95;
  padding-top: 20px;

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

  .main-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    border-bottom: 3px solid $border-color-2;

    .left-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 42px;

      img {
        width: 152px;
        height: 152px;
        border-radius: 50%;
      }

      p {
        color: $neutral-1;

        span {
          color: $neutral-3;
        }
      }
    }

    .right-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      h2 {
        font-size: 32px;
        margin-top: 8px;
        margin-bottom: 0;
      }

      p {
        font-size: 16px;
        color: $neutral-2;
        text-align: left;
        max-width: 222px;
      }
    }
  }
}
</style>

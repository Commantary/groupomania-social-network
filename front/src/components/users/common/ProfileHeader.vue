<template>
  <div class="header-container">
    <div class="left-header">
      <img :src="getSrc" alt="User icon">
      <p><span>{{ getFriendsCount }}</span> amies</p>
    </div>
    <div class="right-header">
      <h2>{{ getUserName }}</h2>
      <p>{{ getBio }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '../../../models/User.model'

const props = defineProps<{
  user: User
}>()

const getUserName = computed(() => `${props.user.first_name} ${props.user.last_name}`)

const getSrc = computed(() => import.meta.env.VITE_IMAGE_URL + props.user.icon_url)

const getBio = computed(() => props.user.bio ?? 'Aucune bio')

const getFriendsCount = computed(() => props.user.friends.length)
</script>

<style lang="scss">
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 3px solid #e6e6e6;

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
      color: #AEAEAE;
      filter: opacity(82%);

      span {
        color: white;
        filter: opacity(100%);
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
      color: #AEAEAE;
      filter: opacity(82%);
      text-align: left;
      max-width: 222px;
    }
  }
}
</style>

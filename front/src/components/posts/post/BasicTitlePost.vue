<template>
  <div class="title_post">
    <div class="title_info">
      <img :src="iconUrl" alt="User icon">
      <h2>{{ userName }}</h2>
      <p>{{ getDate }}</p>
    </div>
    <div class="settings" :class="isOpenMenu ? 'open-menu' : ''">
      <font-awesome-icon v-if="isAuthor" icon="fa-solid fa-ellipsis" @click="openPostMenu()" />
      <div v-if="isOpenMenu" class="menu">
        <div class="menu-item" @click="deletePost()">
          <p>Supprimer</p>
        </div>
      </div>
    </div>
  </div>
  <div v-show="isOpenMenu" class="check-click-outside" @click="clickOutside()" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore, usePostsStore } from '../../../store'

const props = defineProps<{
  iconUrl?: string
  userName?: string
  dateValue?: string
  uuid?: string
  authorUuid?: string
}>()

const openMenu = ref(false)

const getDate = computed(() => {
  const date: any = new Date(props.dateValue!)

  // Return the date timing compared from the actual date
  const diff = Math.floor((+new Date() - date) / 1000)

  if (diff < 60)
    return 'maintenant'
  if (diff < 3600)
    return `${Math.floor(diff / 60)} min`
  if (diff < 86400)
    return `${Math.floor(diff / 3600)}h`
  if (diff < 604800)
    return `${Math.floor(diff / 86400)} jour${Math.floor(diff / 86400) > 1 ? 's' : ''}`
  if (diff < 2629743)
    return `${Math.floor(diff / 604800)} semaine${Math.floor(diff / 604800) > 1 ? 's' : ''}`
  if (diff < 31556926)
    return `${Math.floor(diff / 2629743)} mois`
  return `${Math.floor(diff / 31556926)} année${Math.floor(diff / 31556926) > 1 ? 's' : ''}`
})

const isAuthor = computed(() => {
  return props.authorUuid === useAuthStore().getUser.uuid
})

const isOpenMenu = computed(() => {
  return openMenu.value
})

function openPostMenu() {
  openMenu.value = !openMenu.value
}

function clickOutside() {
  openMenu.value = false
}

function deletePost() {
  openMenu.value = false

  usePostsStore().removePost(props.uuid!)
}
</script>

<style lang="scss">
.check-click-outside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: red;
}

.open-menu {
  // Create a menu
  .menu {
    position: absolute;
    top: 10px;
    right: 60px;
    width: 200px;
    background-color: #4E5166;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  // Create a menu item
  .menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      backdrop-filter: brightness(95%);
    }

    .icon {
      margin-right: 10px;
    }
  }
}

.title_post {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 35px);
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 20px;

  .settings {
    //position: relative;
  }

  .title_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    justify-content: space-evenly;
    text-align: center;

    p {
      color: #ABABAB;
      margin-left: 10px;
    }

    h2 {
      font-size: 1.2rem;
    }
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  svg {
    width: 22px;
    height: 22px;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      background-color: $tertiary-color-dark;
    }
  }
}
</style>

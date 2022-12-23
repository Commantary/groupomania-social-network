<template>
  <div class="title_post">
    <div class="title_info">
      <ProfilePicture :size="40" :clickable="true" :uuid="authorUuid" :src="iconUrl ?? 'null'" />
      <h2>{{ userName }}</h2>
      <p>{{ getDate }}</p>
      <p>⬤</p>
      <p>{{ getDateDiff }}</p>
    </div>

    <div class="settings" :class="isOpenMenu ? 'open-menu' : ''">
      <font-awesome-icon icon="fa-solid fa-ellipsis" @click="openPostMenu($event)" />
      <Menu
        v-if="isOpenMenu"
        :editable="editable"
        class="post-menu-right"
        :is-auth="isAuthor"
        :uuid="uuid"
        @edit="edit()"
        @destroy="destroyPostMenu"
      />
    </div>
  </div>
  <div v-show="isOpenMenu" class="check-click-outside" @click="clickOutside($event)" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '../../../store'
import { commonService } from '../../../_services'
import Menu from '../../../components/posts/common/Menu.vue'
import ProfilePicture from '../../../components/users/common/ProfilePicture.vue'

const props = defineProps<{
  iconUrl?: string
  userName?: string
  dateValue?: string
  uuid?: string
  authorUuid?: string
  editable?: boolean
}>()

const emit = defineEmits<{
  (event: 'edit'): void
  (event: 'destroy'): void
}>()

const openMenu = ref(false)

const getDateDiff = computed(() => {
  return commonService.getTimingFromDate(new Date(props.dateValue!))
})

const getDate = computed(() => {
  return commonService.getDateTranslation(new Date(props.dateValue!))
})

const isAuthor = computed(() => {
  return props.authorUuid === useAuthStore().getUser.uuid || useAuthStore().isAdmin
})

const isOpenMenu = computed(() => {
  return openMenu.value
})

function openPostMenu(event: Event) {
  event.preventDefault()
  openMenu.value = !openMenu.value
}

function clickOutside(event: Event) {
  event.preventDefault()

  openMenu.value = false
}

function destroyPostMenu() {
  emit('destroy')

  openMenu.value = false
}

function edit() {
  emit('edit')
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
    position: relative;
  }

  .title_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    justify-content: space-evenly;
    text-align: center;

    p {
      color: $neutral-1;
      margin-left: 10px;
    }

    h2 {
      font-size: 1.2rem;
      margin-left: 10px;
    }
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

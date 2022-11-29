<template>
  <div class="sidebar-item" @click="click">
    <div class="sidebar-item__content">
      <div class="sidebar-item__icon">
        <Icon class="icon" :icon="icon" />
      </div>
      <div class="sidebar-item__text">
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../common/Icon.vue'
import router from '../../router/router'
import { useUsersStore } from '../../store/users.store'

const props = defineProps<{
  icon: string
  text: string
  to: string
  exact: boolean
}>()

function click() {
  router.push({ path: props.to })

  if (useUsersStore().getSidebar) {
    // Set timeout to wait for the router to change the page
    setTimeout(() => {
      useUsersStore().setSidebar(false)
    }, 500)
  }
}
</script>

<style lang="scss">
.sidebar-item {
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  color: white;
  border-radius: 30px;

  &:hover {
    background-color: $sidebar-item-hover;
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__icon {
    margin-right: 0.5rem;
  }

  &__text {
    font-size: 1.2rem;
    font-weight: 300;

    p {
      margin: 0;
      padding: 12px 0;
    }
  }
}

// Make items responsive on mobile
@media screen and (max-width: 768px) {
  .sidebar-item {

    &__text {
      font-size: 1.8rem;

      p {
        padding: 16px 0;
      }
    }
  }
}
</style>

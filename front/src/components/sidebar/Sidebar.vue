<template>
  <div class="sidebar" :class="getSidebarState">
    <div v-if="isSidebarOpen" class="sidebar--back-color" @click="closeSidebar" />

    <div class="sidebar-content">
      <div class="sidebar-content__logo">
        <img src="../../assets/icon-left-font-monochrome-white.svg" alt="logo">
      </div>
      <div class="sidebar-content__items-list">
        <div class="sidebar-content__items-top">
          <SidebarItem
            v-for="item in items"
            :key="item.to"
            :icon="item.icon"
            :text="item.text"
            :to="item.to"
            :exact="item.exact"
            class="sidebar-content__item"
          />

          <hr class="sidebar-content__separator">

          <SidebarItem
            :icon="settingsItem.icon"
            :text="settingsItem.text"
            :to="settingsItem.to"
            :exact="settingsItem.exact"
            class="sidebar-content__item"
          />
        </div>

        <SidebarItem
          :icon="logoutItem.icon"
          :text="logoutItem.text"
          :to="logoutItem.to"
          :exact="logoutItem.exact"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { sidebarService } from '../../_services/sidebar.service'
import { useAuthStore } from '../../store'
import { useUsersStore } from '../../store/users.store'
import SidebarItem from './SidebarItem.vue'

const items = sidebarService.items

items.forEach((item) => {
  item.to = item.to.replace(':id', useAuthStore().user.uuid)
})

const settingsItem = {
  icon: 'fa-solid fa-gear',
  text: 'Paramètres',
  to: '/settings',
  exact: false,
}

const logoutItem = {
  icon: 'fa-solid fa-arrow-right-from-bracket',
  text: 'Se déconnecter',
  to: '/logout',
  exact: false,
}

const getSidebarState = computed(() => {
  return useUsersStore().getSidebar ? 'sidebar--open' : 'sidebar--close'
})

const isSidebarOpen = computed(() => useUsersStore().getSidebar)

function closeSidebar() {
  if (isSidebarOpen.value)
    useUsersStore().setSidebar(false)
}
</script>

<style lang="scss">
.sidebar {
  color: white;
  background-color: $sidebar-bg-color;

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: $sidebar-padding;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;

  width: $sidebar-width;

  border-right: 1px solid $sidebar-border-color;

  &--back-color {
    display: none;
  }

  &-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: start;

    &__logo {
      margin-bottom: 20px;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        max-width: 80%;
      }
    }

    &__separator {
      height: 1px;
      background-color: $sidebar-border-color;
      margin: 10px 0;
      width: calc(100%);
      border: none;
    }

    &__items-top {
      display: flex;
      flex-direction: column;
      align-items: start;

      &__item {
        margin-bottom: 10px;
      }
    }

    &__items-list {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      margin-left: 1rem;

      .icon {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.5rem;
      }
    }
  }
}

// Make sidebar responsive on mobile
@media only screen and (max-width: 768px) {
  .sidebar {
    width: 80%;
    background-color: $bg-void;

    &--back-color {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &--open {
      width: 70%;

      .sidebar--back-color {
        display: block;
        position: absolute;
        top: 0;
        left: 100%;
        right: -40%;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
      }
    }

    &--close {
      width: 0;
      padding: 0;
      border: none;

      .sidebar-content {
        display: none;

        &__items-list,
        &__logo,
        &__items-top,
        &__separator,
        &__item,
        &__item--active {
          display: none;
        }
      }
    }

    &-content {
      z-index: 20;

      &__item {
        margin-bottom: 14px;
      }

      &__logo {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
          max-width: 80%;
        }
      }

      &__items-top {
        display: flex;
        flex-direction: column;
        align-items: start;
      }

      &__items-list {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-between;
        margin-left: 1rem;

        .icon {
          width: 2rem;
          height: 2rem;
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>

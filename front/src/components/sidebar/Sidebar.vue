<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-content__logo">
        <img src="@/assets/icon-left-font-monochrome-white.svg" alt="logo">
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
import { sidebarService } from '../../_services/sidebar.service'
import { useAuthStore } from '../../store'
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
</style>

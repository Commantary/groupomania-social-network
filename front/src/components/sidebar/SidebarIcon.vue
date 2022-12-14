<template>
  <div class="sidebar-icon">
    <Icon icon="fa-solid fa-bars-staggered" @click="OpenSidebar" />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '../../store/users.store'
import Icon from '../../components/common/Icon.vue'

function OpenSidebar() {
  useUsersStore().setSidebar(!useUsersStore().getSidebar)
}
</script>

<style lang="scss">
.sidebar-icon {
  position: absolute;
  top: 12px;
  left: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  color: white;
  border-radius: 30px;

  .icon {
    font-size: 2rem;
  }
}
</style>

<template>
  <div id="root">
    <NotifBar id="notifbar" />

    <Sidebar v-if="logged" />

    <router-view v-slot="{ Component }" :class="{ 'router-view--sidebar': logged }" class="router-view">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NotifBar from './components/snackbars/NotifBar.vue'
import Sidebar from './components/sidebar/Sidebar.vue'
import { useAuthStore } from './store'

const logged = computed(() => useAuthStore().isLogged)
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
  position: relative;
}

#root {
  font-family: $font-1;
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.router-view--sidebar {
  width: calc(100% - $sidebar-width - $sidebar-padding * 2)!important;
  margin-left: calc($sidebar-width + $sidebar-padding * 2)!important;
}

.router-view {
  width: 100%;
  margin-left: 0;
}

.page-title {
  margin-left: $page-title-margin-left;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div id="root">
    <NotifBar id="notifbar" />

    <Sidebar />

    <router-view v-slot="{ Component }" class="router-view">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import NotifBar from './components/snackbars/NotifBar.vue'
import Sidebar from './components/sidebar/Sidebar.vue'
</script>

<style scoped lang="scss">
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

.router-view {
  width: calc(100% - $sidebar-width - $sidebar-padding * 2);
  margin-left: calc($sidebar-width + $sidebar-padding * 2);
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

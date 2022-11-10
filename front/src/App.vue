<template>
  <div id="root">
    <NotifBar id="notifbar" />

    <Sidebar v-if="logged" />

    <router-view v-slot="{ Component }" :class="{ 'router-view--sidebar': logged, 'router-view--no-sidebar': !logged }">
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

#notifbar {
  max-width: 1000px;
  min-width: 200px;
  height: 60px;
  position: fixed;
  bottom: 15px;
  right: 24px;
  color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 1000;

  #notif_close {
    position: absolute;
    right: 0;
    font-size: 16px;
    height: 100%;
    width: 42px;
    cursor: pointer;
    transition: backdrop-filter 0.3s ease;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      backdrop-filter: brightness(105%);
    }
  }

  #notif_text {
    text-align: left;
    padding-left: 10px;
    margin-right: 50px;
  }
}

.router-view--sidebar {
  width: calc(100% - $sidebar-width - $sidebar-padding * 2)!important;
  margin-left: calc($sidebar-width + $sidebar-padding * 2)!important;
}

.router-view--no-sidebar {
  width: 100%;
  margin-left: 0;
}

.page-title {
  margin-left: $page-title-margin-left;
  margin-top: 26px;
}

.page-container {
  width: 100%;
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

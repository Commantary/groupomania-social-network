<script setup lang="ts">
import NotifBar from './components/snackbars/NotifBar.vue'
</script>

<template>
  <div id="main">
    <NotifBar />
    <!--    <router-view /> -->

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
html {
  scroll-behavior: smooth;
}

.app {
  margin: 0;
  padding: 0;
  background-color: $tertiary-color;
}

#main {
  font-family: 'Roboto', sans-serif;
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

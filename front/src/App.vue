<script setup lang="ts">
import NotifBar from '../src/components/NotifBar.vue'
</script>

<template>
  <div id="main">
    <NotifBar />
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.app {
  margin: 0;
  padding: 0;
  background-color: $tertiary-color;
}

#main {
  font-family: 'Roboto', sans-serif;
  height: 100%;
  width: 100%;
}
</style>

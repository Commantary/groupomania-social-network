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
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.app {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: $tertiary-color!important;
}

#main {
  background-color: $tertiary-color;
  font-family: 'Roboto', sans-serif;
  height: 100%;
  width: 100%;
}
</style>

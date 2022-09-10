<template>
  <div v-if="getNotif" id="notif_ctn">
    <div id="notif_close" @click="close">
      <span>X</span>
    </div>
    <p id="notif_text">
      {{ getNotifMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useErrorStore } from '../store'

const getNotif = computed(() => useErrorStore().getNotif)

const getNotifMessage = computed(() => useErrorStore().getNotifMessage)

// Make method close
const close = () => {
  useErrorStore().setNotif(false)
}
</script>

<style lang="scss">
#notif_ctn{
  max-width: 600px;
  min-width: 200px;
  height: 60px;
  background-color: $primary-color;
  position: fixed;
  bottom: 15px;
  right: 24px;
  color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

#notif_close {
  position: absolute;
  right: 0;
  font-size: 16px;
  height: 100%;
  width: 42px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    background-color: $primary-color-light;
  }
}

#notif_text {
  text-align: left;
  padding-left: 10px;
}
</style>

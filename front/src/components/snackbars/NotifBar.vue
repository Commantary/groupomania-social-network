<template>
  <div v-if="getNotif" id="notif_ctn" :style="getNotifColor()">
    <div id="notif_close" @click="close">
      <span>X</span>
    </div>
    <p id="notif_text">
      {{ getNotifMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { useErrorStore } from '../../store'

const seconds = 5
const minutes = 0
const duration = seconds * 1000 + minutes * 1000

const getNotif = computed(() => useErrorStore().getNotif)
const isError = computed(() => useErrorStore().isError)

const getNotifMessage = computed(() => useErrorStore().getNotifMessage)

// Make method close
const close = () => {
  useErrorStore().setNotif(false)
}

function getNotifColor() {
  return {
    'background-color': isError.value ? '#FD2D01' : '#FFD9C9',
    'color': isError.value ? 'white' : '#404040',
  }
}
</script>

<style lang="scss">
#notif_ctn{
  max-width: 600px;
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
}

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
}
</style>

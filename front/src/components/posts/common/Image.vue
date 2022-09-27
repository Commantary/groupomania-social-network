<template>
  <div @click="viewImage()">
    <div class="normal-image">
      <img :src="getSrc" :alt="alt">
    </div>
    <div v-show="data.view" class="full-image">
      <img :src="getSrc" :alt="alt">
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  viewable: boolean
}>()

const data = reactive({
  view: false,
})

const getSrc = computed(() => import.meta.env.VITE_IMAGE_URL + props.src)

function viewImage() {
  if (props.viewable)
    data.view = !data.view
}
</script>

<style lang="scss">
.normal-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.1s ease-in-out;

    &:hover {
      filter: brightness(80%);
    }
  }
}

.full-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1100;
  background-color: rgba(0, 0, 0, 0.5);
  // Transition when element is shown
  transition: opacity 1s ease-in-out;

  img {
    width: auto;
    max-height: 80vh;
    margin-top: 50vh;
    margin-left: 50vw;
    transform: translateX(-50%) translateY(-50%);
    object-fit: contain;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>

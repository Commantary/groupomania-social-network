<template>
  <div>
    <div class="editable-image">
      <img :src="getSrc" :alt="alt">

      <font-awesome-icon
        v-if="crossSelect"
        class="font-awesome-icon"
        icon="fa-solid fa-circle-xmark"
        @click="deleteImage()"
        @mouseleave="mouseLeaveCross()"
      />

      <font-awesome-icon
        v-if="!crossSelect"
        class="font-awesome-icon"
        icon="fa-regular fa-circle-xmark"
        @mouseover="mouseOverCross()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  src: string
  alt: string
}>()

const emit = defineEmits<{
  (event: 'delete', src: string): void
}>()

const getSrc = computed(() => import.meta.env.VITE_IMAGE_URL + props.src)

const crossSelect = ref(false)

function mouseOverCross() {
  crossSelect.value = true
}

function mouseLeaveCross() {
  crossSelect.value = false
}

function deleteImage() {
  emit('delete', props.src)
}
</script>

<style lang="scss">
.editable-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  &:hover {
    img {
      filter: brightness(50%);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.1s ease-in-out;
    filter: brightness(60%);
  }

  .font-awesome-icon {
    position: absolute;
    top: 18px;
    right: 18px;
    font-size: 34px;
    color: #fff;
    cursor: pointer;
    transition: color 0.1s ease-in-out;
  }
}
</style>

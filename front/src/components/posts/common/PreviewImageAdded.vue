<template>
  <div class="preview-image-container">
    <div class="image-preview" :style="{ 'background-image': `url(${url})` }" />

    <p class="image-name">
      {{ name }}
    </p>

    <font-awesome-icon
      v-if="crossSelect"
      class="font-awesome-icon"
      icon="fa-solid fa-circle-xmark"
      @click="deletePreview()"
      @mouseleave="mouseLeaveCross()"
    />

    <font-awesome-icon
      v-if="!crossSelect"
      class="font-awesome-icon"
      icon="fa-regular fa-circle-xmark"
      @mouseover="mouseOverCross()"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  url?: string
  name?: string
}>()

const emit = defineEmits<{
  (event: 'delete'): void
}>()

const crossSelect = ref(false)

function mouseOverCross() {
  crossSelect.value = true
}

function mouseLeaveCross() {
  crossSelect.value = false
}

function deletePreview() {
  emit('delete')
}
</script>

<style lang="scss">
.preview-image-container {
  max-width: 15vw;
  width: auto;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: $tertiary-color-dark;
  padding: 5px;

  .image-preview {
    width: 60px;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 10px 0 0 10px;
    margin-right: 10px;
  }

  .image-name {
    width: 100%;
    height: 100%;
    line-height: 30px;
    font-size: 12px;
    font-weight: lighter;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .font-awesome-icon {
    width: 20px;
    height: 20px;
    line-height: 30px;
    font-size: 12px;
    cursor: pointer;
    margin-left: 5px;
  }
}
</style>

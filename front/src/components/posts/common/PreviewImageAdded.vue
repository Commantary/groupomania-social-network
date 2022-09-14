<template>
  <div class="preview-image-container">
    <div class="image-preview" :style="{ 'background-image': `url(${url})` }" />
    <p class="image-name">
      {{ name }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  url?: string
  name?: string
}>()

const getFileName = computed(() => {
  const url = props.url!
  return url.split('/').pop()
})
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
}
</style>

<template>
  <div class="images-post">
    <div v-for="image in images" :key="images[image]" class="image-item">
      <img :src="image" alt="Post image">
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images?: string[]
}>()
</script>

<style lang="scss">
.images-post {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  justify-content: center;
  height: 400px;
  margin-left: 70px;
  margin-right: 70px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ccc;
  flex-wrap: wrap;

  .image-item {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-right: 2px;

    &:last-child {
      margin-right: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>

<template>
  <div class="images-post" :class="getClassType">
    <div v-for="image in images" :key="images[image]" class="image-item">
      <EditableImage class="image" :src="image" alt="Post image" @delete="deleteImage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EditableImage from '../../../components/posts/addedit/common/EditableImage.vue'

const props = defineProps<{
  images?: string[]
}>()

const emit = defineEmits<{
  (event: 'deleteImage', src: string): void
}>()

const getClassType = computed(() => {
  switch (props.images!.length) {
    case 1:
      return 'one-images'
    case 2:
      return 'two-images'
    case 3:
      return 'three-images'
    case 4:
      return 'four-images'
    default:
      return 'one-image'
  }
})

function deleteImage(src: string) {
  emit('deleteImage', src)
}
</script>

<style lang="scss">
.one-images .image-item {
  width: 100%;
  height: 100%;
}

.two-images .image-item {
  width: 50%;
  height: 100%;

  &:nth-child(1) {
    margin-right: 2px;
  }
}

.three-images {
  flex-wrap: wrap;

  .image-item {
    height: 50%;

    &:nth-child(1) {
      width: calc(50% - 2px);
      margin-right: 2px;
    }

    &:nth-child(2) {
      width: 50%;
      margin-right: 0;
    }

    &:last-child {
      width: 100%;
      margin-top: 2px;
    }
  }
}

.four-images {
  flex-wrap: wrap;

  .image-item {
    height: 50%;

    &:nth-child(1), &:nth-child(3) {
      width: calc(50% - 2px);
      margin-right: 2px;
    }

    &:nth-child(2), &:nth-child(4) {
      width: 50%;
    }

    &:nth-child(3), &:nth-child(4) {
      height: calc(50% - 2px);
      margin-top: 2px;
    }
  }
}

.images-post {
  display: flex;
  flex-direction: row;
  height: 400px;
  margin-left: 70px;
  margin-right: 70px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid $border-color-1;

  .image-item {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<template>
  <div class="profil-picture-container" :style="getSize">
    <router-link v-if="clickable ?? false" :to="`/user/${uuid}`" :class="{ linked: clickable }">
      <img :src="getUserIcon" :style="getSize" alt="user-icon">
    </router-link>

    <img v-if="!clickable ?? true" :style="getSize" :src="getUserIcon" alt="user-icon">
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  clickable?: boolean
  uuid?: string
  src: string
  size?: number
}>()

const getUserIcon = computed(() => import.meta.env.VITE_IMAGE_URL + props.src)

const getSize = {
  width: `${props.size ?? 32}px`,
  height: `${props.size ?? 32}px`,
}
</script>

<style lang="scss">
.profil-picture-container {
  img {
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  }

  .linked {
    img {
      transition: filter 0.2s ease-in-out;
    }

    &:hover img {
      filter: opacity(80%);
    }
  }
}
</style>

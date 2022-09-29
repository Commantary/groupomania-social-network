<template>
  <div class="simple-comment">
    <div class="body">
      <img :src="getSrc" alt="user icon">
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Commentary } from '../../../models/Commentary.model'

const props = defineProps<{
  comment: Commentary
}>()

const getSrc = computed(() => {
  return import.meta.env.VITE_IMAGE_URL + props.comment.user.icon_url
})
</script>

<style lang="scss">
.simple-comment {
  width: auto;
  padding-left: 70px;
  padding-bottom: 14px;

  .body {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50%;

    p {
      font-size: 0.9rem;
      padding: 12px 14px;
      background-color: $bg-flat;
      border-radius: 4px 18px 18px 18px;
    }

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 18px;
      margin-bottom: 18px;
    }
  }
}
</style>

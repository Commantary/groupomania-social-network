<template>
  <div class="post-container">
    <TitlePost class="post-item" :icon-url="post.user.icon_url" :user-name="post.user.first_name" :date-value="post.createdAt" />

    <div class="post-content">
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitlePost from './TitlePost.vue'

interface Post {
  uuid: string
  body: string
  image: string[]
  likesCount: number
  commentsCount: number
  createdAt: string
  updatedAt: string
  user: {
    icon_url: string
    first_name: string
    last_name: string
  }
}

const props = defineProps<{
  post: Post
}>()
</script>

<style lang="scss">
.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;

  .post-item {
    //background-color: #FD2D01;
  }

  .post-content {
    width: 100%;
  }
}
</style>

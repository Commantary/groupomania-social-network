<template>
  <div class="post-container">
    <TitlePost :icon-url="post.user.icon_url" :user-name="post.user.first_name" :date-value="post.createdAt" />

    <div class="post-content">
      <p>{{ post.body }}</p>
    </div>

    <BasicImagesPost v-if="post.images.length !== 0" :images="post.images" />

    <BasicFooterPost :likes-count="post.likesCount" :comments-count="post.commentsCount" />
  </div>
</template>

<script setup lang="ts">
import TitlePost from './TitlePost.vue'
import BasicFooterPost from './BasicFooterPost.vue'
import BasicImagesPost from './BasicImagesPost.vue'

interface Post {
  uuid: string
  body: string
  images: string[]
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
  //align-items: center;
  justify-content: center;
  width: 100%;

  .post-content {
    width: calc(100% - 130px);
    padding-left: 70px;

    p {
      overflow: auto;
      font-weight: lighter;
      font-size: 15px;
    }
  }

  &:hover {
    cursor: pointer;
  }
}
</style>

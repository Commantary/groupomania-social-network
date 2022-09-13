<template>
  <div class="post-container">
    <TitlePost :icon-url="post.user.icon_url" :user-name="getUsername" :date-value="post.createdAt" :uuid="post.uuid" :author-uuid="post.user.uuid" />

    <div class="post-content">
      <p>{{ post.body }}</p>
    </div>

    <BasicImagesPost v-if="post.images.length !== 0" :images="post.images" />

    <BasicFooterPost :has-liked="hasLiked" :uuid="post.uuid" :likes-count="post.likesCount" :comments-count="post.commentsCount" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from '../../../models/Post.model'
import { useAuthStore } from '../../../store'
import TitlePost from './BasicTitlePost.vue'
import BasicFooterPost from './BasicFooterPost.vue'
import BasicImagesPost from './ImagesPost.vue'

const props = defineProps<{
  post: Post
}>()

const getUsername = computed(() => {
  return `${props.post.user.first_name} ${props.post.user.last_name.charAt(0)}.`
})

console.log(`post ${props.post.uuid} -->`, props.post.likes.some(like => like.user.uuid === useAuthStore().getUser.uuid))

for (let i = 0; i < props.post.likes.length; i++)
  console.log(props.post.likes[i].user.uuid)

const hasLiked = computed(() => {
  return props.post.likes.some(like => like.user.uuid === useAuthStore().getUser.uuid)
})
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

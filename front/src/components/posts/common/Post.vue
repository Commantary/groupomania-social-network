<template>
  <div class="post-container" :style="hoverStyle">
    <TitlePost :icon-url="post.user.icon_url" :user-name="getUsername" :date-value="post.createdAt" :uuid="post.uuid" :author-uuid="post.user.uuid" />

    <div class="post-content">
      <p>{{ post.body }}</p>
    </div>

    <BasicImagesPost v-if="post.images.length" :images="post.images" :viewable="imageViewable" />

    <BasicFooterPost :has-liked="hasLiked" :uuid="post.uuid" :likes-count="post.likesCount" :comments-count="post.commentsCount" />

    <AddComment v-if="commentViewable" @add="sendComment" />

    <Comments v-if="commentViewable" :comments="post.comments" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Post } from '../../../models/Post.model'
import { useAuthStore, usePostsStore } from '../../../store'
import router from '../../../router/router'
import { commonService } from '../../../_services'
import Comments from '../lists/Comments.vue'
import AddComment from '../addedit/AddComment.vue'
import type { Commentary } from '../../../models/Commentary.model'
import TitlePost from './TitlePost.vue'
import BasicFooterPost from './FooterPost.vue'
import BasicImagesPost from './ImagesPost.vue'

const props = defineProps<{
  post: Post
  imageViewable?: boolean
  commentViewable?: boolean
}>()

const post = ref(props.post)

const getUsername = computed(() => {
  return commonService.getUsername(props.post.user)
})

const hasLiked = computed(() => {
  return props.post.likes.some(like => like.user.uuid === useAuthStore().getUser.uuid)
})

const hoverStyle = computed(() => {
  if (!props.imageViewable)
    return '$hover-style: true;'

  return '$hover-style: false;'
})

function sendComment(value: string) {
  usePostsStore().sendComment(props.post.uuid, value)
    .then((comment: Commentary) => {
      post.value.comments.unshift(comment)
      post.value.commentsCount++
    })
}
</script>

<style lang="scss">
.post-container {
  display: flex;
  flex-direction: column;
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
}
</style>

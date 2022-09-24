<template>
  <div class="post-container">
    <TitlePost
      :icon-url="getPost.user.icon_url"
      :user-name="getUsername"
      :date-value="getPost.createdAt"
      :uuid="getPost.uuid"
      :author-uuid="getPost.user.uuid"
    />

    <div class="post-content">
      <p>{{ getPost.body }}</p>
    </div>

    <BasicImagesPost v-if="getPost.images.length" :images="getPost.images" :viewable="false" />

    <BasicFooterPost
      :has-liked="hasLiked"
      :uuid="getPost.uuid"
      :likes-count="getPost.likesCount"
      :comments-count="getPost.commentsCount"
    />

    <LimitedComments class="limited-comments" :comments="getPost.comments" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Post } from '../../../models/Post.model'
import { useAuthStore } from '../../../store'
import { commonService } from '../../../_services'
import LimitedComments from '../lists/LimitedComments.vue'
import TitlePost from './TitlePost.vue'
import BasicFooterPost from './FooterPost.vue'
import BasicImagesPost from './ImagesPost.vue'

const props = defineProps<{
  post: Post
}>()

const post = ref(props.post)

const getPost = computed(() => {
  return post.value
})

const getUsername = computed(() => {
  return commonService.getUsername(props.post.user)
})

const hasLiked = computed(() => {
  return props.post.likes.some(like => like.user.uuid === useAuthStore().getUser.uuid)
})
</script>

<style lang="scss">
.post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  &.post-container:not(.limited-comments):hover {
    backdrop-filter: brightness(90%);
  }

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

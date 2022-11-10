<template>
  <div class="post-container">
    <p v-if="activity ?? false" class="information-title">
      {{ getUsername }} {{ getInformationType }}
    </p>

    <TitlePost
      :icon-url="getUserIcon"
      :user-name="getUsername"
      :date-value="getPost.createdAt"
      :uuid="getPost.uuid"
      :author-uuid="getPost.user.uuid"
      @destroy="destroyPost"
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

    <LimitedComments
      v-if="!hideComments && getPost.comments.length" class="limited-comments"
      :comments="getPost.comments"
    />

    <SimpleComment v-if="activity && activity.type === 'comment'" :comment="activity.comment" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Post } from '../../../models/Post.model'
import { useAuthStore } from '../../../store'
import { commonService } from '../../../_services'
import LimitedComments from '../lists/LimitedComments.vue'
import type { Activity } from '../../../models/Activity.model'
import TitlePost from './TitlePost.vue'
import BasicFooterPost from './FooterPost.vue'
import BasicImagesPost from './ImagesPost.vue'
import SimpleComment from '@/components/posts/common/SimpleComment.vue'

const props = defineProps<{
  post: Post
  hideComments?: boolean
  activity?: Activity
}>()

const emit = defineEmits<{
  (event: 'destroy'): void
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

const getUserIcon = computed(() => {
  return getPost.value.user.icon_url
})

const getInformationType = computed(() => {
  switch (props.activity?.type) {
    case 'post':
      return 'a publié'
    case 'comment':
      return 'a commenté'
    case 'like':
      return 'a aimé'
  }
})

function destroyPost() {
  emit('destroy')
}
</script>

<style lang="scss">
.post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  .limited-comments {
    border-top: 2px solid $tertiary-color-dark;
  }

  .information-title {
    color: $neutral-1;
    font-size: 1rem;
    margin-bottom: 0;
    margin-left: 64px;
  }

  &.post-container:not(.limited-comments):hover {
    background-color: $bg-95;
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

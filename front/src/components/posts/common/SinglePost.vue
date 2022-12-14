<template>
  <div class="single-post-container">
    <TitlePost
      :editable="true"
      :icon-url="getUserIcon"
      :user-name="getUsername"
      :date-value="post.createdAt"
      :uuid="post.uuid"
      :author-uuid="post.user.uuid"
      @edit="edit()"
    />

    <div class="post-content">
      <p>{{ post.body }}</p>
    </div>

    <BasicImagesPost v-if="post.images.length" :images="post.images" :viewable="true" />

    <BasicFooterPost
      :has-liked="hasLiked"
      :uuid="post.uuid"
      :likes-count="post.likesCount"
      :comments-count="post.commentsCount"
    />

    <AddComment @add="sendComment" />

    <Comments :comments="post.comments" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { Post } from '../../../models/Post.model'
import { useAuthStore, usePostsStore } from '../../../store'
import { commonService } from '../../../_services'
import Comments from '../lists/Comments.vue'
import AddComment from '../addedit/AddComment.vue'
import type { Commentary } from '../../../models/Commentary.model'
import TitlePost from './TitlePost.vue'
import BasicFooterPost from './FooterPost.vue'
import BasicImagesPost from './ImagesPost.vue'

const props = defineProps<{
  post: Post
}>()

const emit = defineEmits<{
  (event: 'edit'): void
}>()

const data = reactive({
  post: props.post,
})

const postComments = ref({
  comments: props.post!.comments as Commentary[],
  commentsCount: props.post!.commentsCount as number,
})

const getUsername = computed(() => {
  return commonService.getUsername(props.post!.user)
})

const hasLiked = computed(() => {
  return props.post!.likes.some(like => like.user.uuid === useAuthStore().getUser.uuid)
})

const getUserIcon = computed(() => {
  return props.post!.user.icon_url
})

function sendComment(value: string) {
  usePostsStore().sendComment(props.post!.uuid, value)
    .then((comment: Commentary) => {
      postComments.value.comments.unshift(comment)
      postComments.value.commentsCount++
    })
}

function edit() {
  emit('edit')
}
</script>

<style lang="scss">
.single-post-container {
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

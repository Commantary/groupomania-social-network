<template>
  <div class="footer-post">
    <div class="likes-post">
      <font-awesome-icon v-if="!hasLiked" icon="fa-regular fa-heart" @click="likePost($event)" />
      <font-awesome-icon v-if="hasLiked" icon="fa-solid fa-heart" @click="likePost($event)" />
      <p>{{ likesCount }}</p>
    </div>
    <div class="comments-post">
      <font-awesome-icon icon="fa-regular fa-comment" />
      <p>{{ commentsCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { postService } from '../../../_services'
import { usePostsStore } from '../../../store'

const props = defineProps<{
  likesCount?: number
  commentsCount?: number
  uuid?: string
  hasLiked?: boolean
}>()

const likesCount = ref(props.likesCount)

const hasLiked = ref(props.hasLiked)

async function likePost(event: Event) {
  event.preventDefault()

  await postService.likePost(props.uuid!)
    .then((res) => {
      likesCount.value = res.data.likesCount
    })
    .catch((error) => {
      console.error(error)
    })

  await usePostsStore().updatePost(props.uuid)

  hasLiked.value = !hasLiked.value
}
</script>

<style lang="scss">
.footer-post {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 70px;

  .likes-post, .comments-post {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    p {
      margin-left: 14px;
    }

    svg {
      width: 20px;
      height: 20px;
      padding: 8px;
      border-radius: 50%;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        cursor: pointer;
        background-color: $tertiary-color-dark;
      }
    }
  }

  .likes-post {
    margin-right: 22px;
  }
}
</style>

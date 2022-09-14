<template>
  <div v-if="data.loading">
    <h1>Chargement en cours...</h1>
  </div>
  <div v-if="!data.loading" class="post_list">
    <p v-if="getPosts.length === 0">
      Il n'y a pas de posts
    </p>

    <Post v-for="post in getPosts" :key="post.uuid" class="basic-post" :post="post" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { usePostsStore } from '../../../store'
import Post from '@/components/posts/common/Post.vue'

const data = reactive({
  posts: [],
  loading: true,
})

usePostsStore().fetchPosts().then(() => {
  data.loading = false
})

const getPosts = computed(() => {
  return [...usePostsStore().getPosts].reverse()
})
</script>

<style lang="scss">
.basic-post {
  border-top: 1px solid #ccc;
  backdrop-filter: brightness(95%);

  &:last-child {
    border-bottom: 1px solid #ccc;
  }
}
</style>

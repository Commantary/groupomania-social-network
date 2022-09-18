<template>
  <div v-if="data.loading">
    <h1>Chargement en cours...</h1>
  </div>
  <div v-if="!data.loading" class="post_list">
    <p v-if="getPosts.length === 0">
      Il n'y a pas de posts
    </p>

    <router-link v-for="post in getPosts" :key="post.uuid" aria-label="Aller au poste" :to="`post/${post.uuid}`" class="basic-post">
      <Post class="post-item" :post="post" />
    </router-link>
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
  // Hide the 'a' tag
  color: white;
  text-decoration: none;

  .post-item {
    border-top: 1px solid #ccc;
    backdrop-filter: brightness(95%);
    transition: all 0.2s ease-in-out;

    &.post-container:hover {
      backdrop-filter: brightness(90%);
    }
  }

  &:first-child {
    .post-item {
      border-top: 2px solid #ccc;
    }
  }

  &:last-child {
    border-bottom: 1px solid #ccc;
  }
}
</style>

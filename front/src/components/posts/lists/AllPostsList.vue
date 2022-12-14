<template>
  <div v-if="data.loading" class="information-text--margin">
    <h1>Chargement en cours...</h1>
  </div>
  <div v-if="!data.loading" class="post-list">
    <p v-if="getPosts.length === 0" class="information-text--margin">
      Il n'y a pas de posts
    </p>

    <router-link
      v-for="post in getPosts"
      :key="post.uuid"
      aria-label="Aller au poste"
      :to="`/post/${post.uuid}`"
      class="basic-post"
    >
      <Post class="post-item" :post="post" />
    </router-link>

    <div class="fake-post" />
    <div v-if="getPosts.length < 3" class="fake-post fake-post--height" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { usePostsStore } from '../../../store'
import Post from '../../../components/posts/common/Post.vue'

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
.information-text--margin {
  margin-left: $page-title-margin-left;
}

.post-list {
  .fake-post {
    width: 100%;
    height: 100px;
    background-color: $bg-void;
    border-top: 1px solid $border-color-1;

    &--height {
      height: 300px;
      border: none;
    }
  }

  .basic-post {
    // Hide the 'a' tag
    color: white;
    text-decoration: none;

    .post-item {
      border-top: 1px solid $border-color-1;
      background-color: $bg-1;
      transition: background-color 0.2s ease-in-out;
    }

    &:first-child {
      .post-item {
        border-top: 2px solid $border-color-1;
      }
    }

    &:last-child {
      border-bottom: 1px solid $border-color-1;
    }
  }
}
</style>

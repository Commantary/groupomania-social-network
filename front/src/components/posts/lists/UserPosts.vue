<template>
  <div v-if="data.loading && !data.error" class="information-text--margin">
    <h1>Chargement en cours...</h1>
  </div>
  <div v-if="data.error" class="information-text--margin">
    <h1>Il y a eu une erreur ...</h1>
  </div>
  <div v-if="!data.loading && !data.error" class="post-list">
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
import Post from '@/components/posts/common/Post.vue'
import { type Post as PostType } from '@/models/index'

const props = defineProps<{
  type: string
}>()

const data = reactive({
  posts: [] as PostType[],
  loading: true,
  error: false,
})

if (props.type === 'liked') {
  usePostsStore().fetchUserPostsLiked().then((posts: PostType[]) => {
    data.loading = false
    data.posts = posts
  })
} else if (props.type === 'my-posts') {
  usePostsStore().fetchUserPosts().then((posts: PostType[]) => {
    data.loading = false
    data.posts = posts
  })
} else {
  data.error = true
}

const getPosts = computed(() => {
  return [...data.posts].reverse()
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
      height: 60vh;
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

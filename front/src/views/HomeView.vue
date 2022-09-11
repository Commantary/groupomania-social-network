<template>
  <div class="home">
    <h1>Les derniers posts</h1>

    <div class="post_list">
      <p v-if="data.posts.length === 0">
        Il n'y a pas de posts
      </p>
      <BasicPost v-for="post in data.posts" :key="post.uuid" class="basic-post" :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { postService } from '../_services'
import BasicPost from '../components/posts/BasicPost.vue'

const data = reactive({
  posts: [],
})

postService.getAllPosts()
  .then((res) => {
    data.posts = res.data.posts
  })
  .catch((err) => {
    console.error(err)
  })
</script>

<style lang="scss">
.home {
  width: 100%;
}

.post_list {
  margin: 0 50px;
}

.basic-post {
  border-top: 1px solid #ccc;
  backdrop-filter: brightness(95%);

  &:last-child {
    border-bottom: 1px solid #ccc;
  }
}
</style>

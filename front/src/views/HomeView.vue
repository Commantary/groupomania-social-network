<template>
  <div class="home">
    <h1>Welcome home</h1>

    <div class="post_list">
      <div v-for="post in posts" :key="post.uuid" class="post_list__item">
        <div class="post_list__item__content">
          {{ post.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { postService } from '../_services'

const posts = ref([''])

postService.getAllPosts()
  .then((res) => {
    posts.value = res.data.posts
  })
  .catch((err) => {
    console.log(err)
  })
</script>

<style lang="scss">

</style>

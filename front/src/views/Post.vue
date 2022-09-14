<template>
  <div>
    <div v-if="data.loading">
      <h1>Chargement en cours...</h1>
    </div>
    <div v-if="data.error">
      <h1>Il y a eu une erreur lors du chargement</h1>
    </div>
    <h1>Post</h1>
    <Post v-if="!data.loading && !data.error" :post="data.posts" :image-viewable="true" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Post from '../components/posts/common/Post.vue'
import { postService } from '@/_services'
import type { Post as PostType } from '@/models/'

const props = defineProps<{
  uuid: string
}>()

const data = reactive({
  posts: null as PostType,
  loading: true,
  error: false,
})

postService.getPost(props.uuid)
  .then((res) => {
    data.posts = res.data.post
    data.loading = false
  })
  .catch((err) => {
    console.error(err)
    data.loading = false
    data.error = true
  })
</script>

<style lang="scss">
h1 {
  border-bottom: 1px solid #e6ecf0;
  padding-bottom: 24px;
}
</style>

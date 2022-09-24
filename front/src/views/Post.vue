<template>
  <div>
    <div class="post-page-title">
      <font-awesome-icon class="back-icon" icon="fa-solid fa-arrow-left" @click="goBack()" />
      <h1>Post</h1>
    </div>

    <div v-if="data.loading">
      <h1>Chargement en cours...</h1>
    </div>

    <div v-if="data.error">
      <h1>Il y a eu une erreur lors du chargement</h1>
    </div>

    <SinglePost v-if="!data.loading && !data.error && !data.editable" :post="data.post" @edit="edit" />
    <PostEditor v-if="!data.loading && !data.error && data.editable" :post="data.post" :reset="reset" @updated="reset" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import SinglePost from '../components/posts/common/SinglePost.vue'
import PostEditor from '../components/posts/addedit/PostEditor.vue'
import router from '../router/router'
import { postService } from '@/_services'
import type { Post } from '@/models/'

const props = defineProps<{
  uuid: string
}>()

const data = reactive({
  post: null as Post,
  originalPost: null as Post,
  loading: true,
  error: false,
  editable: false,
})

getPost()

function getPost() {
  postService.getPost(props.uuid)
    .then((res: any) => {
      data.post = res.data.post
      data.originalPost = res.data.post
      data.loading = false
    })
    .catch((err: Error) => {
      console.error(err)
      data.loading = false
      data.error = true
    })
}

function goBack() {
  if (history.length > 1)
    history.back()
  else
    router.push('/')
}

function reset() {
  data.editable = false
  data.loading = true

  getPost()
}

function edit() {
  data.editable = true
}
</script>

<style lang="scss">
.post-page-title {
  border-bottom: 1px solid #e6ecf0;
  display: flex;
  align-items: center;

  .back-icon {
    margin-right: 24px;
    margin-left: 8px;
    font-size: 28px;
    cursor: pointer;
    padding: 8px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: $primary-color;
      background-color: $tertiary-color-dark;
    }
  }
}
</style>

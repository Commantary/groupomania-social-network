<template>
  <div class="my-posts">
    <h1 class="page-title">
      Mes posts
    </h1>

    <UserPosts type="my-posts" />
  </div>
</template>

<script setup lang="ts">
import UserPosts from '@/components/posts/lists/UserPosts.vue'
</script>

<style scoped lang="scss">
.my-posts {
  width: 100%;
}
</style>

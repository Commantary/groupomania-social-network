<template>
  <div class="my-posts">
    <h1 class="page-title">
      Mes favoris
    </h1>

    <UserPosts type="liked" />
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

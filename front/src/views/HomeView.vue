<template>
  <div class="home">
    <h1>Les derniers posts</h1>

    <PostCreator />

    <AllPostsList />
  </div>
</template>

<script setup lang="ts">
import AllPostsList from '@/components/posts/lists/AllPostsList.vue'
import PostCreator from '@/components/posts/addedit/PostCreator.vue'
</script>

<style lang="scss">
.home {
  width: 100%;
}
</style>

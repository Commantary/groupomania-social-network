<template>
  <div class="page-container">
    <h1 class="page-title">
      Les derniers posts
    </h1>

    <PostCreator />

    <AllPostsList />
  </div>
</template>

<script setup lang="ts">
import AllPostsList from '../components/posts/lists/AllPostsList.vue'
import PostCreator from '../components/posts/addedit/PostCreator.vue'
</script>

<style scoped lang="scss">

</style>

<template>
  <div class="page-container">
    <h1 class="page-title">
      Mes favoris
    </h1>

    <UserPosts type="liked" />

    <div class="page-container--bg-color" />
  </div>
</template>

<script setup lang="ts">
import UserPosts from '../components/posts/lists/UserPosts.vue'
</script>

<style scoped lang="scss">
.page-container {
  min-height: calc(100vh - 26px);

  .page-title {
    z-index: 20;
    background-color: $tertiary-color;
  }
}
</style>

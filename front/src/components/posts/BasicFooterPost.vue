<template>
  <div class="footer-post">
    <div class="likes-post">
      <font-awesome-icon icon="fa-regular fa-heart" />
      <p>{{ likesCount }}</p>
    </div>
    <div class="comments-post">
      <font-awesome-icon icon="fa-regular fa-comment" />
      <p>{{ commentsCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  likesCount?: number
  commentsCount?: number
}>()
</script>

<style lang="scss">
.footer-post {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 70px;

  .likes-post, .comments-post {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    p {
      margin-left: 14px;
    }

    svg {
      width: 20px;
      height: 20px;
      padding: 8px;
      border-radius: 50%;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        cursor: pointer;
        background-color: $tertiary-color-dark;
      }
    }
  }

  .likes-post {
    margin-right: 22px;
  }
}
</style>

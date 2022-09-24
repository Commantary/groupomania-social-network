<template>
  <div class="list-comments">
    <Comment v-for="comment in getComments" :key="comment.uuid" class="comment-item" :comment="comment" />
    <p v-if="props.comments.length > 2" class="more-comments">
      Voir plus
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Commentary } from '../../../models/Commentary.model'
import Comment from '@/components/posts/common/Comment.vue'

const props = defineProps<{
  comments: Commentary[]
}>()

const getComments = computed(() => {
  // Return only the 2 first comments
  return [...props.comments].slice(0, 2)
})
</script>

<style lang="scss">
.list-comments {

  .comment-item {
    width: calc(100% - 140px);
    padding-left: 70px;
    padding-right: 70px;
    background-color: $tertiary-color;
  }

  .more-comments {
    padding: 16px 70px;
    margin: 0;
    font-weight: 500;
    cursor: pointer;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    background-color: $tertiary-color;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

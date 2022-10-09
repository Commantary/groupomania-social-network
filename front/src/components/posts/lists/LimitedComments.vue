<template>
  <div class="list-comments">
    <!--    <Comment v-for="comment in getComments" :key="comment.uuid" class="comment-item" :comment="comment" /> -->
    <SimpleComment v-for="comment in getComments" :key="comment.uuid" class="comment-item comment-item--hover" :comment="comment" />
    <button v-if="props.comments.length > 2" class="btn-more-comments">
      Voir plus
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Commentary } from '../../../models/Commentary.model'
import Comment from '@/components/posts/common/Comment.vue'
import SimpleComment from '@/components/posts/common/SimpleComment.vue'

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
  background-color: $tertiary-color;

  .comment-item {
    width: calc(100% - 140px);
    padding-right: 70px;

    &:first-child {
      padding-top: 14px;
    }

    &--hover {
      &:hover {
        background-color: $bg-1;
      }
    }
  }

  .btn-more-comments {
    margin: 0 70px 16px;
    padding: 12px 18px;
    font-weight: 500;
    cursor: pointer;
    background-color: $tertiary-color;
    border: none;
    outline: none;
    color: $neutral-3;
    font-size: 14px;
    font-family: $font-1;
    border-radius: 12px;
    transition: all 0.2s ease-in-out;

    &:hover {
      text-decoration: underline;
      background-color: $bg-95;
    }
  }
}
</style>

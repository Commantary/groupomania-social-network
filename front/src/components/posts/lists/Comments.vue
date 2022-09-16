<template>
  <div id="list-comments">
    <Comment v-for="comment in comments" :key="comment.uuid" :comment="comment" />
  </div>
</template>

<script setup lang="ts">
import type { Commentary } from '../../../models/Commentary.model'
import Comment from '@/components/posts/common/Comment.vue'

const props = defineProps<{
  comments: Commentary[]
}>()
</script>

<style lang="scss">
#list-comments {
  width: calc(100% - 44px);
  margin-left: 22px;
  margin-right: 22px;
  border-top: 1px solid #ccc;
}
</style>

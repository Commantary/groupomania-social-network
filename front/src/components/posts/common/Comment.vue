<template>
  <div class="comment">
    <div class="comment-header">
      <div class="comment-header-left">
        <div class="comment-header-left-avatar">
          <img :src="getSrc" alt="user icon">
        </div>
        <div class="comment-header-left-username">
          <p>{{ getUserName }}</p>
        </div>
      </div>
      <div class="comment-header-right">
        <p>{{ getDate }}</p>
      </div>
    </div>
    <div class="comment-body">
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Commentary } from '../../../models/Commentary.model'
import { commonService } from '../../../_services'

const props = defineProps<{
  comment: Commentary
}>()

const getUserName = computed(() => {
  return commonService.getUsername(props.comment.user)
})

const getDate = computed(() => {
  return commonService.getDateTranslation(props.comment.createdAt)
})

const getSrc = computed(() => {
  return import.meta.env.VITE_IMAGE_URL + props.comment.user.icon_url
})
</script>

<style lang="scss">
.comment {
  width: calc(100% - 28px);
  padding: 14px;
  backdrop-filter: brightness(95%);
  border-top: 1px solid rgba(255, 255, 255, 0.3);

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .comment-header-left {
      display: flex;
      align-items: center;

      .comment-header-left-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 12px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .comment-header-left-username {
        p {
          font-weight: 500;
        }
      }
    }

    .comment-header-right {
      p {
        font-size: 0.8rem;
        color: #999;
      }
    }
  }

  .comment-body {
    display: flex;
    align-items: start;
    height: 50%;

    p {
      font-size: 0.9rem;
      padding: 12px 14px;
      background-color: $tertiary-color-dark;
      border-radius: 4px 18px 18px 18px;
    }
  }
}
</style>

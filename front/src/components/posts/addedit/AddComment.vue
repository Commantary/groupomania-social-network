<template>
  <div class="comment-creator">
    <div class="comment-creator-header">
      <div class="comment-creator-header-left">
        <div class="comment-creator-header-left-avatar">
          <img :src="getUserIcon" alt="user icon">
        </div>
        <div class="comment-header-left-username">
          <p>{{ getUserName }}</p>
        </div>
      </div>
    </div>
    <div class="comment-body">
      <textarea id="comment" v-model="data.body" name="comment" placeholder="Votre commentaire" />
      <font-awesome-icon
        class="font-awesome-icon" icon="fa-solid fa-paper-plane"
        :style="{ color: data.body.length > 0 ? '' : 'gray', cursor: data.body.length > 1 ? 'pointer' : 'not-allowed' }"
        @click="sendComment()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useAuthStore } from '../../../store'
import { commonService } from '../../../_services'

// Define send comment event
const emit = defineEmits(['add'])

const data = reactive({
  body: '' as string,
})

const getUserIcon = computed(() => {
  return import.meta.env.VITE_IMAGE_URL + useAuthStore().getUser.icon_url
})

const getUserName = computed(() => {
  return commonService.getUsername(useAuthStore().getUser)
})

function sendComment() {
  if (data.body.length > 0) {
    emit('add', data.body)
    data.body = ''
  }
}
</script>

<style lang="scss">
.comment-creator {
  border-top: 1px solid #ccc;
  width: calc(100% - 28px - 44px);
  padding: 14px 14px 28px;
  margin-left: 22px;
  margin-right: 22px;
  backdrop-filter: brightness(95%);

  .comment-creator-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .comment-creator-header-left {
      display: flex;
      align-items: center;

      .comment-creator-header-left-avatar {
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
  }

  .comment-body {
    display: flex;
    align-items: start;
    height: 50%;

    .font-awesome-icon {
      font-size: 30px;
      margin: auto 24px auto 32px;
      padding: 16px;
      border-radius: 50%;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: $primary-color;
        background-color: $tertiary-color-dark;
      }
    }

    textarea {
      background-color: $creator-input-color;
      font-weight: lighter;
      color: white;
      width: 100%;
      height: 50px;
      border: none;
      outline: none;
      resize: none;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      padding: 12px 14px;
      border-radius: 4px 18px 18px 18px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>

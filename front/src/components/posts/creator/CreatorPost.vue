<template>
  <div id="creator-post-container">
    <div id="creator-post">
      <div id="top-creator-post">
        <div id="user-icon">
          <img :src="getUser.icon_url" alt="user-icon">
        </div>

        <div id="post-input">
          <textarea id="body" v-model="data.body" name="body" cols="30" rows="10" placeholder="Que voulez-vous partagez ?" />
        </div>

        <div id="post-buttons">
          <font-awesome-icon
            class="font-awesome-icon" icon="fa-solid fa-file-circle-plus"
            :style="{ cursor: data.images.length === 4 ? 'not-allowed' : 'pointer' }"
            @click="choiceFile()"
          />
          <font-awesome-icon
            class="font-awesome-icon" icon="fa-solid fa-paper-plane"
            :style="{ color: data.body.length > 0 ? 'white' : 'gray', cursor: data.body.length > 1 ? 'pointer' : 'not-allowed' }"
            @click="sendPost()"
          />
        </div>
      </div>

      <div v-if="data.urlArr.length !== 0" id="bottom-creator-post">
        <PreviewImagePost v-for="(url, index) in data.urlArr" :key="url" :url="url" :name="data.images[index].name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useErrorStore, usePostsStore } from '../../../store'
import PreviewImagePost from './../post/PreviewImagePost.vue'
import { useAuthStore } from '@/store'
import type { ViewUser } from '@/models/ViewUser.model'
import { postService } from '@/_services'

const data = reactive({
  images: [] as File[],
  urlArr: [] as string[],
  body: '' as string,
})

const getUser: ViewUser = computed(() => useAuthStore().getUser)

function onAddFile(e: Event) {
  // Add file to an array
  const target = e.target as HTMLInputElement
  if (target && target.files) {
    data.images.push(target.files[0])
    data.urlArr.push(URL.createObjectURL(target.files[0]))
  }
}

function choiceFile() {
  if (data.images.length >= 4)
    return

  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/jpg, image/jpeg, image/png, image/gif'
  input.multiple = false

  input.onchange = (e) => {
    onAddFile(e)
  }

  input.click()
}

function sendPost() {
  if (data.body.length < 1)
    return

  postService.sendPost(data.body, data.images)
    .then((res: any) => {
      useErrorStore().setNotif(true, false, 'Post envoyé !')

      usePostsStore().fetchPosts()

      data.body = ''
      data.images = []
    })
    .catch((err: any) => {
      console.error(err)
    })
}
</script>

<style lang="scss">
#creator-post-container {
  border-top: 1px solid #e6ecf0;
  padding: 40px;

  #creator-post {
    display: flex;
    flex-direction: column;
    width: calc(100% - 75px * 2);
    backdrop-filter: brightness(120%);
    padding: 20px 75px;
    border-radius: 125px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    #top-creator-post {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 230px;
      justify-content: space-between;
    }

    #user-icon {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    #post-input {
      width: 80%;
      height: 70%;
      margin-left: 20px;
      padding: 20px;
      border-radius: 5px;
      background-color: $creator-input-color;

      textarea {
        background-color: $creator-input-color;
        font-weight: lighter;
        color: white;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;

        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }

    #post-buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 50px;
      height: calc(100% - 45px);
      margin-left: 20px;

      .font-awesome-icon {
        font-size: 30px;
        color: white;
        cursor: pointer;
        padding: 16px;
        border-radius: 50%;
        transition: all 0.2s ease-in-out;

        &:hover {
          color: $primary-color;
          background-color: $tertiary-color-dark;
        }
      }
    }

    #bottom-creator-post {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      padding-right: 90px;
      padding-left: 75px;
    }
  }
}
</style>

<template>
  <div id="creator-post-container">
    <div id="creator-post">
      <div id="top-creator-post">
        <div id="user-icon">
          <ProfilePicture :size="72" :clickable="true" :uuid="getUseUuid" :src="getIconUrl" />
        </div>

        <div id="post-input">
          <textarea
            id="body"
            v-model="data.body"
            name="body"
            cols="30"
            rows="10"
            placeholder="Que voulez-vous partagez ?"
          />
        </div>

        <div id="post-buttons">
          <font-awesome-icon
            class="font-awesome-icon" icon="fa-solid fa-file-circle-plus"
            :style="{ cursor: data.images.length === 4 ? 'not-allowed' : 'pointer' }"
            @click="choiceFile()"
          />
          <font-awesome-icon
            class="font-awesome-icon" icon="fa-solid fa-paper-plane"
            :class="checkClassIcon"
            @click="sendPost()"
          />
        </div>
      </div>

      <div v-if="data.urlArr.length !== 0" id="bottom-creator-post">
        <PreviewImageAdded
          v-for="(url, index) in data.urlArr"
          :key="url" :url="url"
          :name="data.images[index].name"
          @delete="deletePreview(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useAuthStore, useErrorStore, usePostsStore } from '../../../store'
import PreviewImageAdded from '../common/PreviewImageAdded.vue'
import type { ViewUser } from '../../../models/ViewUser.model'
import { postService } from '../../../_services'
import ProfilePicture from '../../../components/users/common/ProfilePicture.vue'

const data = reactive({
  images: [] as File[],
  urlArr: [] as string[],
  body: '' as string,
})

const getIconUrl = computed(() => useAuthStore().getUser.icon_url)

const getUseUuid = computed(() => useAuthStore().getUser.uuid)

function onAddFile(e: Event) {
  // Add file to an array
  const target = e.target as HTMLInputElement

  if (target && target.files) {
    // Check if the file is an image
    if (!target.files[0].type.includes('image')) {
      useErrorStore().setNotif(true, true, 'Vous ne pouvez pas ajouter un fichier qui n\'est pas une image')
      return
    }

    // Check if the array is not full
    if (data.images.length >= 4) {
      useErrorStore().setNotif(true, true, 'Vous ne pouvez pas ajouter plus de 4 images')
      return
    }

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
      data.urlArr = []
    })
    .catch((err: any) => {
      console.error(err)
    })
}

function deletePreview(index: number) {
  data.images.splice(index, 1)
  data.urlArr.splice(index, 1)
}

function checkClassIcon() {
  let classToAdd = {}

  if (data.body.length <= 1)
    classToAdd = { 'font-awesome-icon--enabled': true }

  return classToAdd
}
</script>

<style lang="scss">
#creator-post-container {
  border-top: 1px solid $border-color-1;
  padding: 40px;

  #creator-post {
    display: flex;
    flex-direction: column;
    width: calc(100% - 75px * 2);
    background-color: $bg-120;
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

    #post-input {
      flex: 1;
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

        &--enabled {
          color: gray;
          cursor: not-allowed;
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

// Make responsive for mobile
@media screen and (max-width: 768px) {
  #creator-post-container {
    padding: 20px;
    width: 100%;

    #creator-post {
      padding: 10px 30px;
      width: 80%;
    }
  }
}
</style>

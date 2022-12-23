<template>
  <div class="editable-single-post-container">
    <TitlePost
      :editable="false"
      :icon-url="getUserIcon"
      :user-name="getUsername"
      :date-value="post.createdAt"
      :uuid="post.uuid"
      :author-uuid="post.user.uuid"
    />

    <div class="post-content">
      <textarea
        id="body"
        v-model="data.body"
        name="body"
        cols="30"
        rows="10"
        placeholder="Que voulez-vous partagez ?"
        @input="updatePost"
      />
    </div>

    <EditableImagesPost
      v-if="post.images.length"
      :images="post.images"
      @delete-image="deleteImage"
    />

    <EditableFooterPost
      v-model="data.imagesData"
      :uuid="post.uuid"
      :body="data.body"
      :body-empty="isBodyEmpty"
      :images="post.images"
      :old-images="data.oldImages"
      @reset="reset"
    />

    <div v-if="data.imagesData.urlArr.length !== 0" id="bottom-creator-post">
      <PreviewImageAdded
        v-for="(url, index) in data.imagesData.urlArr"
        :key="url" :url="url"
        :name="data.imagesData.images[index].name"
        @delete="deletePreview(index)"
      />
    </div>

    <AddComment @add="sendComment" />

    <Comments :comments="post.comments" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { Post } from '../../../models/Post.model'
import { usePostsStore } from '../../../store'
import { commonService } from '../../../_services'
import Comments from '../lists/Comments.vue'
import AddComment from '../addedit/AddComment.vue'
import type { Commentary } from '../../../models/Commentary.model'
import TitlePost from '../../../components/posts/common/TitlePost.vue'
import EditableImagesPost from '../../../components/posts/addedit/common/EditableImagesPost.vue'
import EditableFooterPost from '../../../components/posts/addedit/common/EditableFooterPost.vue'
import PreviewImageAdded from '../../../components/posts/common/PreviewImageAdded.vue'

const props = defineProps<{
  post: Post
  reset: Function
}>()

interface Data {
  images: File[]
  urlArr: string[]
}

const data = reactive({
  images: [] as File[],
  urlArr: [] as string[],
  body: props.post.body as string,
  oldImages: props.post.images as string[],
  imagesData: {
    images: [] as File[],
    urlArr: [] as string[],
  } as Data,
})

const post = ref(props.post)

const getUsername = computed(() => {
  return commonService.getUsername(props.post.user)
})

const getUserIcon = computed(() => {
  return props.post.user.icon_url
})

function sendComment(value: string) {
  usePostsStore().sendComment(props.post.uuid, value)
    .then((comment: Commentary) => {
      post.value.comments.unshift(comment)
      post.value.commentsCount++
    })
}

function deleteImage(src: string) {
  post.value.images = props.post.images.filter(image => image !== src)
}

const isBodyEmpty = computed(() => {
  return data.body.length <= 1
})

function updatePost() {
  // console.log('body -> ', data.body, '/', isBodyEmpty.value)
}

function deletePreview(index: number) {
  data.imagesData.images.splice(index, 1)
  data.imagesData.urlArr.splice(index, 1)
}
</script>

<style lang="scss">
.editable-single-post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  #bottom-creator-post {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding-right: 90px;
    padding-left: 75px;
    margin-bottom: 16px;
  }

  .post-content {
    width: calc(100% - 130px);
    padding-left: 70px;

    textarea {
      background-color: $creator-input-color;
      font-weight: lighter;
      color: white;
      width: calc(100% - 25px);
      min-height: 100px;
      height: auto;
      border: none;
      outline: none;
      resize: none;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      padding: 10px;
      border-radius: 10px;
      margin-right: 25px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>

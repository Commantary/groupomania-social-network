<template>
  <div class="editable-footer-post">
    <div class="buttons-left">
      <font-awesome-icon
        class="font-awesome-icon" icon="fa-solid fa-file-circle-plus"
        :style="{ cursor: isImagesLength ? 'not-allowed' : 'pointer', color: isImagesLength ? 'gray' : 'white' }"
        @click="choiceFile()"
      />
    </div>
    <div class="buttons-right">
      <div @mouseover="mouseOverCross()" @mouseleave="mouseLeaveCross()" @click="reset()">
        <p>Annuler</p>
        <font-awesome-icon
          v-if="crossSelect"
          class="font-awesome-icon"
          icon="fa-solid fa-circle-xmark"
        />

        <font-awesome-icon
          v-if="!crossSelect"
          class="font-awesome-icon"
          icon="fa-regular fa-circle-xmark"
        />
      </div>
      <div @click="updatePost()">
        <p>Sauvegarder</p>
        <font-awesome-icon
          class="font-awesome-icon" icon="fa-solid fa-paper-plane"
          :style="{ color: (bodyEmpty ? 'gray' : ''), cursor: bodyEmpty ? 'not-allowed' : 'pointer' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useErrorStore, usePostsStore } from '../../../../store'

const props = defineProps<{
  uuid: string
  body: string
  bodyEmpty: boolean
  images: string[]
  oldImages: string[]
}>()

const emit = defineEmits<{
  (event: 'reset'): void
  (event: 'update:modelValue', data: {}): void
}>()

const crossSelect = ref(false)

const data = reactive({
  images: [] as File[],
  urlArr: [] as string[],
})

const isImagesLength = computed(() => {
  return (data.images.length + props.images.length) === 4
})

function mouseOverCross() {
  crossSelect.value = true
}

function mouseLeaveCross() {
  crossSelect.value = false
}

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
    if (isImagesLength.value) {
      useErrorStore().setNotif(true, true, 'Vous ne pouvez pas ajouter plus de 4 images')
      return
    }

    data.images.push(target.files[0])
    data.urlArr.push(URL.createObjectURL(target.files[0]))

    emit('update:modelValue', { urlArr: data.urlArr, images: data.images })
  }
}

function choiceFile() {
  if (isImagesLength.value)
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

async function updatePost() {
  const imagesRemoved = props.oldImages.filter((oldImage) => {
    return !props.images.includes(oldImage)
  })

  const dataPost = {
    body: props.body,
    images: [...data.images],
    imagesRemoved,
    uuid: props.uuid,
  }

  await usePostsStore().editPost(dataPost.uuid, dataPost.body, dataPost.images, dataPost.imagesRemoved)

  reset()
}

function reset() {
  emit('reset')
}
</script>

<style lang="scss">
.editable-footer-post {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 70px;
  padding-right: 70px;
  margin-top: 8px;
  margin-bottom: 8px;

  .buttons-left .font-awesome-icon {
    width: 26px;
    height: 26px;
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

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .buttons-right div {
    padding: 16px;
    border-radius: 50px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    margin-left: 12px;

    p {
      margin: 0;
    }

    .font-awesome-icon {
      width: 22px;
      height: 22px;
      color: white;
      cursor: pointer;
      margin-left: 8px;
    }

    &:hover {
      background-color: $tertiary-color-dark;

      .font-awesome-icon {
        color: $primary-color;
      }
    }
  }

  .likes-post {
    margin-right: 22px;
  }
}
</style>

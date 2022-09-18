<template>
  <div>
    <Menu :items="items" />
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '../../../store'
import router from '../../../router/router'
import Menu from '@/components/common/BaseMenu.vue'

const props = defineProps<{
  isAuth: boolean
  uuid: string
}>()

const emit = defineEmits<{
  (event: 'destroy'): void
}>()

const items = props.isAuth
  ? [
      {
        id: 1,
        text: 'Editer',
        onClick: ($event: Event) => {
          $event.preventDefault()

          console.log('Create post')
        },
      },
      {
        id: 2,
        text: 'Supprimer',
        onClick: ($event: Event) => {
          $event.preventDefault()

          deletePost()
        },
      },
      {
        id: 1,
        text: 'Partager',
        onClick: ($event: Event) => {
          $event.preventDefault()

          sharePost()
        },
      },
    ]
  : [
      {
        id: 1,
        text: 'Partager',
        onClick: ($event: Event) => {
          $event.preventDefault()

          sharePost()
        },
      },
    ]

function sharePost() {
  // Past the link in the clipboard of the user
  navigator.clipboard.writeText(`${window.location.origin}/post/${props.uuid}`)

  // Destroy the component
  emit('destroy')
}

function deletePost() {
  usePostsStore().removePost(props.uuid!)

  // Check with router is the current page is the post page
  if (window.location.pathname === `/post/${props.uuid}`) {
    // Redirect to the home page
    router.push('/')
  }

  // Destroy the component
  emit('destroy')
}
</script>

<style lang="scss">

</style>

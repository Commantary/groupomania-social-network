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
  editable: boolean
}>()

const emit = defineEmits<{
  (event: 'destroy'): void
  (event: 'edit'): void
}>()

const items = props.isAuth
  ? [
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
        id: 2,
        text: 'Partager',
        onClick: ($event: Event) => {
          $event.preventDefault()

          sharePost()
        },
      },
    ]

if (props.editable) {
  items.unshift({
    id: 1,
    text: 'Éditer',
    onClick: ($event: Event) => {
      $event.preventDefault()

      emit('edit')
    },
  })
}

function sharePost() {
  // Past the link in the clipboard of the user
  navigator.clipboard.writeText(`${window.location.origin}/post/${props.uuid}`)

  // Destroy the component
  emit('destroy')
}

async function deletePost() {
  await usePostsStore().removePost(props.uuid!)

  // Check with router is the current page is the post page
  if (window.location.pathname === `/post/${props.uuid}`) {
    // Redirect to the home page
    await router.push('/')
  }

  // Destroy the component
  emit('destroy')
}
</script>

<style lang="scss">

</style>

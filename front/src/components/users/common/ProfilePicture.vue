<template>
  <div class="profil-picture-container" :style="getSize">
    <router-link
      v-if="(clickable ?? false) && (!editable ?? true)"
      :to="`/user/${uuid}`" :class="{ linked: clickable }"
    >
      <img :src="getUserIcon" :style="getSize" alt="user-icon">
    </router-link>

    <div v-if="(!clickable ?? true) || (editable ?? false)" :class="{ editable }">
      <img
        :style="getSize" :src="getUserIcon" alt="user-icon" @click="editIcon"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const props = defineProps<{
  clickable?: boolean
  editable?: boolean
  uuid?: string
  src: string
  size?: number
}>()

const emit = defineEmits<{
  (event: 'edit', file: File): void
}>()

const data = reactive({
  newIcon: null as File | null,
})

const getUserIcon = computed(() => {
  if (data.newIcon)
    return URL.createObjectURL(data.newIcon)
  else
    return import.meta.env.VITE_IMAGE_URL + props.src
})

const getSize = {
  width: `${props.size ?? 32}px`,
  height: `${props.size ?? 32}px`,
}

function editIcon() {
  if (props.editable) {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files![0]
      const reader = new FileReader()

      // Check size of the file is not over 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert('La taille de l\'image est trop grande')
        return
      }

      reader.readAsDataURL(file)
      reader.onload = () => {
        const image = new Image()

        image.src = reader.result as string

        image.onload = () => {
          if (image.width > 1000 || image.height > 1000) {
            alert('Les dimensions de l\'image sont trop grandes')
            return
          }

          data.newIcon = file

          // Emit event to parent component
          emit('edit', data.newIcon)
        }
      }
    }
    input.click()
  }
}
</script>

<style lang="scss">
.profil-picture-container {
  img {
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  }

  .linked {
    img {
      transition: filter 0.2s ease-in-out, border 0.2s ease-in-out;
      border: 2px solid transparent;
    }

    &:hover img {
      filter: brightness(0.7);
      border-color: $primary-color;
    }
  }

  .editable {
    img {
      transition: filter 0.2s ease-in-out, border 0.2s ease-in-out;
      border: 2px solid transparent;
    }

    &:hover img {
      filter: opacity(50%);
      border-color: $neutral-2;
      cursor: pointer;
    }
  }
}
</style>

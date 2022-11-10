<template>
  <div class="settings-container">
    <h1 class="page-title">
      Paramètres
    </h1>

    <div class="change-icon">
      <div class="change-icon--top">
        <ProfilePicture :editable="true" :clickable="true" :size="120" :src="getUserIcon" @edit="edited" />
        <div class="change-icon--description">
          <h2>Changer d'image de profil</h2>
          <p>La taille recommandée est de 512x512 et ne doit pas dépasser 5mo</p>
          <p />
        </div>
      </div>

      <button v-if="data.canUpdate" class="update-icon" @click="editIcon">
        Sauvegarder
      </button>

      <button v-if="canDelete" class="delete-icon" @click="deleteIcon">
        Supprimer
      </button>
    </div>
    <hr>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useAuthStore } from '../store'
import { useUsersStore } from '../store/users.store'
import ProfilePicture from '@/components/users/common/ProfilePicture.vue'

const data = reactive({
  canUpdate: false,
  newIcon: null as File | null,
})

const getUserIcon = computed(() => {
  return useAuthStore().getUser.icon_url
})

const canDelete = computed(() => {
  return useAuthStore().getUser.icon_url !== 'default.png' && !data.canUpdate
})

function edited(file: File) {
  data.canUpdate = true
  data.newIcon = file
}

function editIcon() {
  if (data.canUpdate) {
    useUsersStore().updateIcon(useAuthStore().getUuid, data.newIcon)
    data.canUpdate = false
    data.newIcon = null
  }
}

async function deleteIcon() {
  await useUsersStore().deleteIcon(useAuthStore().getUuid)
  // Refresh the page
  window.location.reload()
}
</script>

<style lang="scss">
.settings-container hr {
  height: 1px;
  background-color: $sidebar-border-color;
  margin: 10px 0;
  border: none;
}

.change-icon {
  margin-left: 3rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: left;

  &--top {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2rem;
  }

  &--description {
    display: flex;
    flex-direction: column;
    margin-left: 2rem;

    p {
      font-size: 0.8rem;
      color: #8e8e8e;
    }
  }

  .update-icon {
    background-color: $neutral-3;
    color: black;

    &:hover {
      filter: brightness(80%);
    }
  }

  .delete-icon {
    background-color: $neutral-3;
    color: black;

    &:hover {
      background-color: $primary-color-dark;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      color: white;
    }
  }

  button {
    padding: 10px 20px;
    border-radius: 25px;
    border: none;
    color: black;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-bottom: 1rem;

    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

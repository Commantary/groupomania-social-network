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

    <div class="password-container">
      <h2>Changer de mot de passe</h2>

      <form action="">
        <BaseInput
          v-model="data.password.actual"
          :name="getText.actual"
          type="password"
          :error="focus.includes('actual') ? getText.error.current : ''"
          @focusout="focusOut('actual')"
          @focusin="focus = focus.filter((item) => item !== 'actual')"
        />

        <BaseInput
          v-model="data.password.new"
          :name="getText.new"
          type="password"
          :error="focus.includes('new') ? getText.error.password : ''"
          @focusout="focusOut('new')"
          @focusin="focus = focus.filter((item) => item !== 'new')"
        />

        <BaseInput
          v-model="data.password.confirm"
          :name="getText.confirm"
          type="password"
          :error="focus.includes('confirm') ? getText.error.confirm : ''"
          @focusout="focusOut('confirm')"
          @focusin="focus = focus.filter((item) => item !== 'confirm')"
        />

        <BaseButton :disabled-value="disabled" :text-value="getText.button" @click="changePassword($event)" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { minLength, required, sameAs } from '@vuelidate/validators'
import useValidate from '@vuelidate/core'
import { useAuthStore } from '../store'
import { useUsersStore } from '../store/users.store'
import { textService } from '../_services/text.service'
import ProfilePicture from '@/components/users/common/ProfilePicture.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const data = reactive({
  canUpdate: false,
  newIcon: null as File | null,
  password: {
    actual: '',
    new: '',
    confirm: '',
  },
})

const focus = ref([''])
const disabled = ref(true)

const rules = computed(() => ({
  actual: { required, minLength: minLength(1) },
  new: { required, minLength: minLength(8) },
  confirm: { required, sameAs: sameAs(data.password.new) },
}))

const $v = useValidate(rules, data.password)

// Set computed
const isFormValid = computed(() => {
  // Check if all elements are valid
  return !$v.value.$invalid
})

// Set watch
watch(isFormValid, (value) => {
  disabled.value = !value
})

const focusOut = (type: string) => {
  if (type === 'new' && $v.value.new.$invalid)
    focus.value.push(type)
  else if (type === 'confirm' && $v.value.confirm.$invalid)
    focus.value.push(type)
  else if (type === 'actual' && $v.value.actual.$invalid)
    focus.value.push(type)
}

const getText = textService.settings_page

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

function changePassword(event: Event) {
  event.preventDefault()
  event.stopPropagation()

  console.log('Change password')

  if (disabled.value)
    return

  const request = useUsersStore().updatePassword(useAuthStore().getUuid, data.password.actual, data.password.new, data.password.confirm)

  if (request) {
    data.password.actual = ''
    data.password.new = ''
    data.password.confirm = ''
  } else {
    focus.value.push('actual')
  }
}
</script>

<style lang="scss">
.settings-container hr {
  height: 1px;
  background-color: $sidebar-border-color;
  margin: 10px 0;
  border: none;
}

.password-container {
  margin-top: 20px;
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  align-items: start;

  form {
    width: 100%;
    max-width: 400px;
  }

  .base-button {
    padding-left: 25%;
  }
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

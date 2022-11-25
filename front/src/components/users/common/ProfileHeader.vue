<template>
  <div class="header-container">
    <div class="main-header">
      <div class="left-header">
        <ProfilePicture :size="152" :src="getSrc" />
        <p><span>{{ getFriendsCount }}</span>{{ getFriendText }}</p>
      </div>
      <div class="right-header">
        <div class="right-header__top">
          <h2>{{ getUserName }}</h2>
          <p v-if="!data.editMode" class="right-header__bio">
            {{ getBio }}
          </p>
          <textarea v-if="data.editMode && isAuthorProfile" v-model="data.bio" />

          <button v-if="!data.editMode && isAuthorProfile" @click="edit">
            Éditer
          </button>
          <button v-if="data.editMode && isAuthorProfile" @click="saveEdit">
            Sauvegarder
          </button>
        </div>
        <div class="right-header__bottom">
          <button :style="{ display: getFriendStatus === 'self' ? 'none' : 'block' }" @click="friendAction">
            {{ getFriendButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { User } from '../../../models/User.model'
import { useUsersStore } from '../../../store/users.store'
import { useAuthStore } from '../../../store'
import type { Invitation } from '../../../models/Invitation.model'
import ProfilePicture from '@/components/users/common/ProfilePicture.vue'

const props = defineProps<{
  user: User
}>()

const data = reactive({
  user: props.user,
  editMode: false,
  bio: props.user.bio,
})

const getUserName = computed(() => `${props.user.first_name} ${props.user.last_name}`)

const getSrc = computed(() => props.user.icon_url)

const getBio = computed(() => (props.user.bio === '' || !props.user.bio) ? 'Aucune bio' : props.user.bio)

const isAuthorProfile = computed(() => props.user.uuid === useAuthStore().user.uuid)

const getFriendsCount = computed(() => {
  if (props.user.friends.length === 0)
    return 'Aucun'
  else if (props.user.friends.length === 1)
    return '1'
  else
    return props.user.friends.length
})

const getFriendText = computed(() => {
  if (props.user.friends.length <= 1)
    return ' ami'
  else
    return ' amis'
})

const getFriendStatus = computed(() => {
  if (data.user.uuid === useAuthStore().user.uuid) {
    return 'self'
  } else if (data.user.friends.some(friend => friend.friend.uuid === useAuthStore().user.uuid)) {
    return 'friend'
  } else {
    if (useUsersStore().getInvitationsSent.some((invitation: Invitation) => invitation.target.uuid === data.user.uuid))
      return 'pending'
    else if (useUsersStore().getInvitations.some((invitation: Invitation) => invitation.sender.uuid
        === data.user.uuid))
      return 'pending'
    else
      return 'none'
  }
})

const getFriendButtonText = computed(() => {
  if (getFriendStatus.value === 'friend')
    return 'Supprimer des amis'
  else if (getFriendStatus.value === 'pending')
    return 'Demande envoyée'
  else if (getFriendStatus.value === 'self')
    return 'Vous'
  else
    return 'Ajouter en ami'
})

const friendAction = () => {
  if (getFriendStatus.value === 'friend') {
    useUsersStore().removeFriend(props.user.uuid)

    data.user.friends = props.user.friends.filter(friend => friend.friend.uuid !== useAuthStore().user.uuid)
  } else if (getFriendStatus.value === 'none') {
    useUsersStore().sendInvitation(props.user.uuid)
  }
}

function edit() {
  if (isAuthorProfile.value)
    data.editMode = true
}

function saveEdit() {
  if (isAuthorProfile.value) {
    data.editMode = false
    useUsersStore().editBio(props.user.uuid, data.bio)
      .then((data: any) => {
        if (!data)
          data.bio = data.user.bio
        else if (data.bio === '')
          data.bio = null
        else
          data.user.bio = data.bio
      })
      .catch(() => {
        data.bio = data.user.bio
      })
  }
}
</script>

<style lang="scss">
.header-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $bg-95;
  padding-top: 20px;

  .back-icon {
    margin-right: 24px;
    margin-left: 8px;
    font-size: 28px;
    cursor: pointer;
    padding: 8px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: $primary-color;
      background-color: $tertiary-color-dark;
    }
  }

  .main-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    border-bottom: 3px solid $border-color-2;
    min-height: 210px;

    .left-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 42px;

      img {
        width: 152px;
        height: 152px;
        border-radius: 50%;
      }

      p {
        color: $neutral-1;

        span {
          color: $neutral-3;
        }
      }
    }

    .right-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &__bio {
        font-size: 16px;
        color: $neutral-2;
        text-align: left;
        max-width: 222px;
        max-height: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;

      }

      &__top {
        min-height: 152px;
        max-height: 300px;

        textarea {
          width: 90%;
          height: 100px;
          resize: none;
          border-radius: 25px;
          outline: none;
          background-color: $tertiary-color-light;
          color: $neutral-3;
          font-size: 14px;
          font-weight: 300;
          padding: 14px 16px;
          margin-top: 1rem;
          border: 3px solid transparent;
          transition: border 0.2s ease-in-out;

          &:focus {
            border: 3px solid $primary-color;
          }
        }

        button {
          margin-top: 16px;
          width: 100%;
          height: 40px;
          border-radius: 25px;
          background-color: $neutral-3;
          color: $bg-void;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          border: none;
          cursor: pointer;

          &:hover {
            background-color: $primary-color-dark;
            color: $neutral-3;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          }

          &:active {
            background-color: $primary-color;
          }
        }
      }

      &__bottom {
        margin-top: 8px;
        margin-bottom: 16px;

        button {
          width: 100%;
          height: 40px;
          border-radius: 50px;
          padding: 8px 16px;
          background-color: $neutral-3;
          font-weight: 500;
          font-size: 16px;
          transition: all 0.2s ease-in-out;
          border: 2px solid transparent;
          cursor: pointer;

          &:hover {
            background-color: $primary-color-dark;
            color: $neutral-3;
            border: 2px solid $primary-color-light;
          }

          &:active {
            background-color: $primary-color;
            border: 2px solid $primary-color-light;
          }
        }
      }

      h2 {
        font-size: 32px;
        margin-top: 8px;
        margin-bottom: 0;
      }
    }
  }
}
</style>

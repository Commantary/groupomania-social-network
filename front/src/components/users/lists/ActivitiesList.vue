<template>
  <div>
    <div v-if="!data.loading" class="post_list">
      <p v-if="!data.activities.length" class="page-title">
        Il n'y a aucune activité pour le moment
      </p>

      <router-link
        v-for="activity in data.activities"
        :key="activity.post.uuid"
        aria-label="Aller au poste"
        :to="`/post/${activity.post.uuid}`"
        class="basic-post"
      >
        <Post
          class="post-item"
          :post="activity.post"
          :hide-comments="true"
          :activity="activity"
          @destroy="fetchActivities"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Activity } from '../../../models/Activity.model'
import { userService } from '../../../_services'
import Post from '../../posts/common/Post.vue'

const props = defineProps<{
  uuid: string
}>()

const data = reactive({
  activities: [] as Activity[],
  loading: true,
  error: false,
})

fetchActivities()

function fetchActivities() {
  data.loading = true
  data.error = false

  userService.getUserActivities(props.uuid)
    .then((res: any) => {
      data.activities = []

      res.data.activities.forEach((activity: any, index: number) => {
        switch (activity.type) {
          case 'post':
            data.activities[index] = {
              post: activity,
              type: activity.type,
            }
            break
          case 'comment':
            data.activities[index] = {
              comment: {
                uuid: activity.uuid,
                body: activity.body,
                createdAt: activity.createdAt,
                user: activity.user,
              },
              post: activity.post,
              type: activity.type,
            }
            break
          case 'like':
            data.activities[index] = {
              post: activity.post,
              type: activity.type,
            }
            break
        }
      })

      data.loading = false
    })
    .catch((err: Error) => {
      console.error(err)
      data.loading = false
      data.error = true
    })
}
</script>

<style lang="scss">
.basic-post {
  // Hide the 'a' tag
  color: white;
  text-decoration: none;

  .post-item {
    border-top: 1px solid $border-color-1;
    background-color: $bg-1;
    transition: all 0.2s ease-in-out;
  }

  &:first-child {
    .post-item {
      border-top: none;
    }
  }

  &:last-child {
    border-bottom: 1px solid $border-color-1;
  }
}
</style>

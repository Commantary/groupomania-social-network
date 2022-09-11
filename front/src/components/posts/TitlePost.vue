<template>
  <div class="title_post">
    <div class="title_info">
      <img :src="iconUrl" alt="User icon">
      <h2>{{ userName }}</h2>
      <p>{{ getDate }}</p>
    </div>
    <div class="settings">
      <font-awesome-icon icon="fa-solid fa-ellipsis" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  iconUrl?: string
  userName?: string
  dateValue?: string
}>()

const getDate = computed(() => {
  const date: any = new Date(props.dateValue!)

  // Return the date timing compared from the actual date
  const diff = Math.floor((+new Date() - date) / 1000)

  if (diff < 60)
    return 'maintenant'
  if (diff < 3600)
    return `${Math.floor(diff / 60)} min`
  if (diff < 86400)
    return `${Math.floor(diff / 3600)}h`
  if (diff < 604800)
    return `${Math.floor(diff / 86400)} jour${Math.floor(diff / 86400) > 1 ? 's' : ''}`
  if (diff < 2629743)
    return `${Math.floor(diff / 604800)} semaine${Math.floor(diff / 604800) > 1 ? 's' : ''}`
  if (diff < 31556926)
    return `${Math.floor(diff / 2629743)} mois`
  return `${Math.floor(diff / 31556926)} année${Math.floor(diff / 31556926) > 1 ? 's' : ''}`
})
</script>

<style lang="scss">
.title_post {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 35px);
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 20px;

  .title_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    justify-content: space-evenly;
    text-align: center;

    p {
      color: #ABABAB;
      margin-left: 10px;
    }

    h2 {
      font-size: 1.2rem;
    }
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  svg {
    width: 22px;
    height: 22px;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      background-color: $tertiary-color-dark;
    }
  }
}
</style>

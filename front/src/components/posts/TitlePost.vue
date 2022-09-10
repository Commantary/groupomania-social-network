<template>
  <div class="title_post">
    <div class="title_info">
      <img :src="iconUrl" alt="User icon">
      <h2>{{ userName }}</h2>
      <p>{{ getDate }}</p>
    </div>
    <div class="settings">
      <img src="xxx" alt="Settings icon">
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
  const date = new Date(props.dateValue!)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>

<style lang="scss">
.title_post {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  padding: 0 10px;

  .title_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 40vw;
    justify-content: space-evenly;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>

<template>
  <div>
    <font-awesome-icon class="icon" :icon="icon" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()
</script>

<style lang="scss">

</style>

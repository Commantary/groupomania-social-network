<template>
  <div class="menu">
    <ul>
      <li v-for="item in items" :key="item.id" class="menu-item">
        <button @click="item.onClick($event)">
          {{ item.text }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: {
    id: number
    text: string
    onClick: (event: Event) => void
  }[]
}>()
</script>

<style lang="scss">
.menu {
  position: absolute;
  top: 0;
  right: 50px;
  z-index: 1000;
  background-color: #4E5166;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  border: 1px solid $tertiary-color-dark;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      list-style: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);

      &:hover {
        background-color: $bg-95;
      }

      &:last-child {
        border-bottom: none;
      }

      button {
        padding: 14px 20px;
        background-color: transparent;
        border: none;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        color: white;
        z-index: 1300;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

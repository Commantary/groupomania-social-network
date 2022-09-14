<template>
  <div class="base-button">
    <button :disabled="disabledValue">
      {{ textValue }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  disabledValue: Boolean,
  textValue: String,
})
</script>

<style lang="scss">
.base-button {
  button {
    height: 60px;
    width: auto;
    max-width: 400px;
    background: white;
    border-radius: 25px;
    color: black;
    font-size: 16px;
    font-weight: bold;
    border: none;
    padding: 0 26px;

    &:focus:active {
      box-shadow: 0 2px 15px darkslategray;
      filter: brightness(80%);
      cursor: pointer;
    }

    &:hover:not(&:disabled):not(:active) {
      box-shadow: 0 2px 10px darkslategray;
      filter: brightness(90%);
      cursor: pointer;
    }

    &:disabled {
      color: gray;
      background: white;
      cursor: not-allowed;
    }
  }
}
</style>

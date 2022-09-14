<!-- BaseInput.vue component -->

<template>
  <div class="base-input">
    <label v-if="name !== ''">{{ name }}</label>
    <input :type="type" :value="modelValue" :placeholder="name" :class="type === 'password' ? 'password-input' : ''" @input="updateValue">
    <p v-if="error && error.length > 0">
      {{ error || '' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  name: String,
  error: String,
  type: String,
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: any) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style lang="scss">
.base-input {
  height: 170px;

  input {
    height: 60px;
    width: 400px;
    background: rgba(0, 0, 0, 0.09);
    border: 2px solid white;
    border-radius: 5px;
    padding: 0 18px;
    transition: border 0.3s ease;
    color: white;

    &:not(.password-input){
      font-size: 16px;
    }

    &.password-input {
      font-size: 22px;
      font-weight: bold;
    }

    &:placeholder-shown {
      padding: 0 18px;
      font-size: 14px;
      font-weight: normal;
    }

    &:focus {
      border: 2px solid #FD2D01;
      outline: none;
    }
  }

  label {
    font-size: 14px;
    color: white;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #a4a4a4;
    margin-top: 10px;
    text-align: center;
  }
}
</style>

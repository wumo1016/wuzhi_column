<template>
  <div
    class="alert message-info fixed-top w-25 mx-auto text-center mt-2"
    :class="classObject"
  >
    <div>{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    message: String,
    type: String
  },
  setup(props) {
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    return {
      classObject
    }
  }
})
</script>

<style scoped>
.close {
  cursor: pointer;
}
</style>

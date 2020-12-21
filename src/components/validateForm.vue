<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <!-- <button type="submit" class="btn btn-primary">提交</button> -->
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type validateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  emits: ['formSubmit'],
  setup(props, ctx) {
    let functionArr: validateFunc[] = []
    const submitForm = () => {
      const res = functionArr.map(cb => cb()).every(v => v)
      ctx.emit('formSubmit', res)
    }
    const validateForm = () => functionArr.map(cb => cb()).every(v => v)
    const callback = (func?: validateFunc) => {
      if (func) {
        functionArr.push(func)
      }
    }
    emitter.on('formItemCreateed', callback)
    emitter.on('formSubmit', submitForm)
    onUnmounted(() => {
      emitter.off('formItemCreateed', callback)
      functionArr = []
    })
    return {
      submitForm,
      validateForm
    }
  }
})
</script>
<style lang="scss" scoped>
.validate-form-container {
  > div {
    position: relative;
    margin-bottom: 1.6rem !important;
  }
}
</style>

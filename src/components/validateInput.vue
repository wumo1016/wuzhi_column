<template>
  <div class="validate-input-container">
    <input
      v-if="tag !== 'textarea'"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <textarea
      v-else
      type="text"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span v-show="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './validateForm.vue'
const emailReg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
interface RuleProp {
  type: 'required' | 'email' | 'custom'
  message: string
  validator?: () => boolean
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  // 本组件的根元素不自动添加使用组件时定义的属性(没有在attrs上定义的)
  inheritAttrs: false,
  props: {
    rules: {
      type: Array as PropType<RulesProp>
    },
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup(props, ctx) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      ctx.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              console.log(passed, 1111111)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('formItemCreateed', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style lang="scss" scoped>
.validate-form-container {
  > div {
    position: relative;
  }
}
.invalid-feedback {
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 100%;
}
</style>

<template>
  <div class="file_upload">
    <div class="file_upload_container" @click.prevent="submit" v-bind="$attrs">
      <slot v-if="fileStatus === 'ready'" name="default">
        <button class="btn btn-primary" disabled>点击上传</button>
      </slot>
      <slot v-else-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else name="success" :uploadData="uploadData">
        <button class="btn btn-primary" disabled>上传成功</button>
      </slot>
    </div>
    <input
      type="file"
      class="file_input d-none"
      ref="fileInput"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
import axios from '@/api/request'
export default defineComponent({
  inheritAttrs: false,
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    uploaded: {
      type: Object
    }
  },
  emits: ['on-success', 'on-error'],
  setup(props, ctx) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadData = ref()
    const submit = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    watch(
      () => props.uploaded,
      newValue => {
        if (newValue) {
          fileStatus.value = 'success'
          uploadData.value = newValue
        }
      }
    )
    const handleChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            if (fileInput.value) {
              fileInput.value.value = ''
            }
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axios
          .post(props.action, formData)
          .then(res => {
            const data = res.data
            fileStatus.value = 'success'
            uploadData.value = data
            ctx.emit('on-success', data)
          })
          .catch(error => {
            fileStatus.value = 'error'
            ctx.emit('on-error', { error })
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = ''
            }
          })
      }
    }
    return {
      fileInput,
      submit,
      fileStatus,
      handleChange,
      uploadData
    }
  }
})
</script>

<style lang="scss" scoped></style>

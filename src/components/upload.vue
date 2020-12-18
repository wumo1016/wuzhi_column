<template>
  <div class="file_upload">
    <button class="btn btn-primary" @click.prevent="submit">
      <span v-if="fileStatus === 'ready'">点击上传</span>
      <span v-if="fileStatus === 'loading'">正在上传...</span>
      <span v-if="fileStatus === 'success'">上传成功</span>
    </button>
    <input
      type="file"
      class="file_input d-none"
      ref="fileInput"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
import axios from '@/api/request'
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const submit = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        fileStatus.value = 'loading'
        const files = Array.from(currentTarget.files)
        const formData = new FormData()
        formData.append('file', files[0])
        axios
          .post(props.action, formData)
          .then(data => {
            fileStatus.value = 'success'
            console.log(data)
          })
          .catch(() => {
            fileStatus.value = 'error'
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
      handleChange
    }
  }
})
</script>

<style lang="scss" scoped>
.file_upload {
}
</style>

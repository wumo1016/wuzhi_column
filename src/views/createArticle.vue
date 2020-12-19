<template>
  <div class="create_article">
    <h2>新建文章</h2>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb3">
        <Upload
          :before-upload="beforeUpload"
          action="/upload"
          @on-success="onSuccess"
          @on-error="onError"
          class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
        >
          <h3>点击上传图片</h3>
          <template #loading>
            <div class="d-flex align-items-center">
              <div class="spinner-border text-secondary" role="status">
                <span class="sr-only"></span>
              </div>
              <h3 class="px-2">正在上传</h3>
            </div>
          </template>
          <template #success="props">
            <div class="uploaded-area">
              <img :src="props.uploadData.url" />
              <h3>点击重新上传</h3>
            </div>
          </template>
        </Upload>
      </div>
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ImageProps } from '@/public/types'
import { ArticleProps } from '@/public/types'
import ValidateInput, { RulesProp } from '@/components/validateInput.vue'
import ValidateForm from '@/components/validateForm.vue'
import Upload from '@/components/upload.vue'
import { useRouter } from 'vue-router'
import { brforeUploadCheck } from '@/public/utils'
import createMessage from '@/public/createMessage'
import * as types from '@/store/action-types'
export default defineComponent({
  name: 'CreateArticle',
  components: {
    ValidateInput,
    ValidateForm,
    Upload
  },
  setup() {
    const titleVal = ref('')
    const contentVal = ref('')
    const imgVal = ref()
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const store = useStore<GlobalDataProps>()
    const beforeUpload = (file: File) => {
      const { passed, type } = brforeUploadCheck(file, {
        format: ['image/jpeg', 'image/png'],
        size: 1
      })
      if (type === 'format') {
        createMessage({
          type: 'error',
          message: `只能上传图片 且格式只能是 jpg/png 格式`
        })
      } else if (type === 'size') {
        createMessage({
          type: 'error',
          message: `上传图片不能超过1M`
        })
      }
      return passed
    }
    const onSuccess = (data: ImageProps) => {
      imgVal.value = data
      createMessage({
        type: 'success',
        message: '上传成功'
      })
    }
    const onError = () => {
      createMessage({
        type: 'success',
        message: '上传失败'
      })
    }

    const router = useRouter()
    const onFormSubmit = async (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        console.log(store.state.user)
        if (column) {
          const newPosts: ArticleProps = {
            title: titleVal.value,
            content: contentVal.value,
            column: `${column}`,
            author: `${_id}`
          }
          if (imgVal.value) {
            newPosts.image = imgVal.value
          }
          await store.dispatch(types.CREATE_ARTICLE, newPosts)
          createMessage({
            type: 'success',
            message: '发表成功,2秒后跳转到专栏',
            timeout: 2000
          })
          setTimeout(() => {
            router.push(`/column/${column}`)
          }, 2000)
        }
      }
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit,
      beforeUpload,
      onSuccess,
      onError
    }
  }
})
</script>
<style lang="scss">
.create_article {
  h2 {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  .file_upload_container {
    height: 200px;
    cursor: pointer;
    overflow: hidden;
    h3 {
      font-size: 2rem;
      margin-bottom: 0 !important;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .uploaded-area {
      position: relative;
      h3 {
        display: none;
        position: absolute;
        color: #999;
        text-align: center;
        width: 100%;
        top: 50%;
      }
      &:hover h3 {
        display: block;
      }
    }
  }
}
</style>

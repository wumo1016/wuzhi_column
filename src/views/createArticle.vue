<template>
  <div class="create_article">
    <h2>{{ isEdit ? '编辑文章' : '新建文章' }}</h2>
    <validate-form ref="articleForm">
      <div class="mb3">
        <Upload
          :before-upload="beforeUpload"
          :uploaded="uploaded"
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
    </validate-form>
    <div>
      <button class="btn btn-primary btn-large me-2">
        <router-link :to="`/column/${column}`">返回专栏</router-link>
      </button>
      <button class="btn btn-primary btn-large" @click="onFormSubmit">
        {{ isEdit ? '保存文章' : '发表文章' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ImageProps } from '@/public/types'
import { ArticleProps } from '@/public/types'
import ValidateInput, { RulesProp } from '@/components/validateInput.vue'
import ValidateForm from '@/components/validateForm.vue'
import Upload from '@/components/upload.vue'
import { brforeUploadCheck } from '@/public/utils'
import { useRouter, useRoute } from 'vue-router'
import createMessage from '@/public/createMessage'
import * as types from '@/store/action-types'
import { getArticleInfo } from '@/api'
import { AxiosResponse } from 'axios'
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
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const isEdit = ref(false)
    const uploaded = ref()
    const column = computed(() => store.state.user.column)
    const articleForm = ref()

    // 编辑
    const route = useRoute()
    const { id: articleId } = route.query
    onMounted(() => {
      if (articleId) {
        isEdit.value = true
        getArticleInfo(articleId).then((res: AxiosResponse<ArticleProps>) => {
          const { image, title, content } = res.data
          if (image) {
            uploaded.value = image
          }
          titleVal.value = title
          contentVal.value = content
        })
      }
    })
    // 表单规则
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    // 上传图片
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
    // 提交
    const onFormSubmit = async () => {
      if (articleForm.value.validateForm()) {
        const { column, _id } = store.state.user
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
          if (isEdit.value) {
            await store.dispatch(types.PATCH_ARTICLE, {
              id: articleId,
              data: newPosts
            })
          } else {
            await store.dispatch(types.CREATE_ARTICLE, newPosts)
          }
          createMessage({
            type: 'success',
            message: '操作成功,1秒后跳转到专栏',
            timeout: 1000
          })
          setTimeout(() => {
            router.push(`/column/${column}`)
          }, 1000)
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
      onError,
      isEdit,
      uploaded,
      column,
      articleForm
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

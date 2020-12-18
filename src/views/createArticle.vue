<template>
  <div class="create_article">
    <h3>新建文章</h3>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb3">
        <Upload action="/upload" />
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
import { GlobalDataProps } from '@/public/types'
// import { ArticleProps } from '@/public/types'
import ValidateInput, { RulesProp } from '@/components/validateInput.vue'
import ValidateForm from '@/components/validateForm.vue'
import Upload from '@/components/upload.vue'
// import { useRouter } from 'vue-router'
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
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const store = useStore<GlobalDataProps>()
    // const router = useRouter()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          // const newPosts: ArticleProps = {
          //   title: titleVal.value,
          //   content: contentVal.value,
          //   column: `${columnId}`
          // }
          // router.push(`/column/${columnId}`)
        }
      }
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit
    }
  }
})
</script>
<style lang="scss">
.create_article {
  h3 {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  .file-upload-container {
    height: 200px;
    cursor: pointer;
    overflow: hidden;
  }
  .file-upload-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .uploaded-area:hover h3 {
    display: block;
  }
  .uploaded-area h3 {
    display: none;
    position: absolute;
    color: #999;
    text-align: center;
    width: 100%;
    top: 50%;
  }
}
</style>

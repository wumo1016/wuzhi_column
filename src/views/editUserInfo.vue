<template>
  <div class="edit_user_info">
    <ul class="nav nav-tabs">
      <li
        class="nav-item"
        v-for="item in tabList"
        :key="item.value"
        @click="changeTab(item.value)"
      >
        <span class="nav-link" :class="{ active: activeTab === item.value }">
          {{ item.name }}
        </span>
      </li>
    </ul>
    <div>
      <validate-form v-if="activeTab === 1" @form-submit="submitUser">
        <div class="mb3">
          <Upload
            :before-upload="beforeUpload"
            :uploaded="userUploaded"
            action="/upload"
            @on-success="onSuccessUser"
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
          <label class="form-label">昵称：</label>
          <validate-input
            :rules="nickNameRules"
            v-model="userInfo.nickName"
            placeholder="请输入昵称"
            type="text"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">介绍：</label>
          <validate-input
            rows="10"
            tag="textarea"
            placeholder="请输入个人介绍"
            v-model="userInfo.description"
          />
        </div>
        <template #submit>
          <button class="btn btn-primary btn-large">
            保存
          </button>
        </template>
      </validate-form>
      <validate-form v-else @form-submit="submitColumn">
        <div class="mb3">
          <Upload
            :before-upload="beforeUpload"
            :uploaded="columnUploaded"
            action="/upload"
            @on-success="onSuccessColumn"
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
          <label class="form-label">主题：</label>
          <validate-input
            :rules="nickNameRules"
            v-model="columnInfo.title"
            placeholder="请输入主题"
            type="text"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">简介：</label>
          <validate-input
            rows="10"
            tag="textarea"
            placeholder="请输入简介"
            v-model="columnInfo.description"
          />
        </div>
        <template #submit>
          <button class="btn btn-primary btn-large">
            保存
          </button>
        </template>
      </validate-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/validateInput.vue'
import ValidateForm from '@/components/validateForm.vue'
import Upload from '@/components/upload.vue'
import { brforeUploadCheck } from '@/public/utils'
import createMessage from '@/public/createMessage'
import { ImageProps } from '@/public/types'
import * as types from '@/store/action-types'
import store from '@/store'
import { getColumnInfo, updateColumnInfo } from '@/api'
export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm,
    Upload
  },
  setup() {
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

    const onError = () => {
      createMessage({
        type: 'success',
        message: '上传失败'
      })
    }
    // tab
    const activeTab = ref(1)
    const tabList = [
      { name: '个人信息', value: 1 },
      { name: '专栏信息', value: 2 }
    ]
    const changeTab = (value: number) => (activeTab.value = value)
    // 用户
    const userUploaded = ref()
    const { _id, nickName, description, column } = store.state.user
    const userInfo = reactive({
      nickName: nickName,
      description: description
    })
    userUploaded.value = store.state.user.avatar
    const nickNameRules: RulesProp = [
      { type: 'required', message: '昵称不能为空' }
    ]
    const submitUser = async res => {
      if (res) {
        await store.dispatch(types.PATCH_USER_INFO, {
          id: _id,
          data: {
            ...store.state.user,
            ...userInfo,
            avatar: userUploaded.value
          }
        })
        createMessage({
          type: 'success',
          message: '保存成功'
        })
      }
    }
    const onSuccessUser = (data: ImageProps) => {
      userUploaded.value = data
      createMessage({
        type: 'success',
        message: '上传成功'
      })
    }
    // 专栏
    const columnUploaded = ref()
    const columnInfo = reactive({
      title: '',
      description: ''
    })
    getColumnInfo(`${column}`).then(res => {
      const column = res.data
      const { avatar, title, description } = column
      if (avatar) {
        avatar.dealUrl = `${avatar.url}?x-oss-process=image/resize,m_fill,h_110,w_200`
      } else {
        column.avatar = {
          url: '',
          dealUrl: require('@/assets/blank.png')
        }
      }
      columnUploaded.value = avatar
      columnInfo.title = title
      columnInfo.description = description
    })

    const onSuccessColumn = (data: ImageProps) => {
      columnUploaded.value = data
      createMessage({
        type: 'success',
        message: '上传成功'
      })
    }
    const submitColumn = async res => {
      if (res) {
        await updateColumnInfo({
          id: column,
          data: {
            ...columnInfo,
            avatar: columnUploaded.value
          }
        })
        createMessage({
          type: 'success',
          message: '保存成功'
        })
      }
    }

    return {
      beforeUpload,
      onError,
      tabList,
      activeTab,
      changeTab,
      userInfo,
      nickNameRules,
      submitUser,
      userUploaded,
      onSuccessUser,
      columnInfo,
      columnUploaded,
      submitColumn,
      onSuccessColumn
    }
  }
})
</script>

<style lang="scss">
.edit_user_info {
  .nav-item {
    cursor: pointer;
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

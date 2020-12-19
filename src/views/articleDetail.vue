<template>
  <div class="article_detail w-75 mx-auto">
    <ul class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">首页</router-link>
      </li>
      <li v-if="currentArticle" class="breadcrumb-item">
        <router-link :to="`/column/${currentArticle.column}`">
          专栏首页
        </router-link>
      </li>
      <li v-if="currentArticle" class="breadcrumb-item active">
        {{ currentArticle.title }}
      </li>
    </ul>
    <article class="mb-5 pb-3" v-if="currentArticle">
      <img
        v-if="currentImageUrl"
        :src="currentImageUrl"
        :alt="currentArticle.title"
        class="rounded-lg img-fluid my-4"
      />
      <h2 class="mb-4">{{ currentArticle.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <div v-if="user" class="d-flex align-items-center">
            <img
              :src="user.avatar && user.avatar.dealUrl"
              :alt="user.nickName"
              class="rounded-circle img-thumbnail"
            />
            <div class="detail ms-3">
              <h6 class="d-block mb-0">{{ user.nickName }}</h6>
              <span class="text-truncate text-muted d-block">
                {{ user.description }}
              </span>
            </div>
          </div>
        </div>
        <span class="text-muted col text-end font-italic">
          发表于：{{ currentArticle.createdAt }}
        </span>
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{ path: '/createEdit', query: { id: currentArticle._id } }"
        >
          编辑
        </router-link>
        <button
          type="button"
          class="btn btn-danger"
          @click.prevent="modalIsVisible = true"
        >
          删除
        </button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { useRoute, useRouter } from 'vue-router'
import store from '@/store'
import * as types from '@/store/action-types'
import { ImageProps, UserProps } from '@/public/types'
export default defineComponent({
  name: 'ArticleDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const md = new MarkdownIt()
    const currentId = route.params.id
    const modalIsVisible = ref(false)
    onMounted(() => {
      store.dispatch(types.SET_CURRENT_ARTICLE, currentId)
    })
    const currentArticle = computed(() => store.state.currentArticle)
    const currentHTML = computed(() => {
      if (currentArticle.value && currentArticle.value.content) {
        const { content, isHTML } = currentArticle.value
        return isHTML ? content : md.render(content)
      }
    })
    const currentImageUrl = computed(() => {
      if (currentArticle.value && currentArticle.value.image) {
        const { image } = currentArticle.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })
    const user = computed(() => {
      if (currentArticle.value) {
        const { author } = currentArticle.value
        if (author && typeof author !== 'string') {
          const { avatar } = author
          if (avatar) {
            avatar.dealUrl = `${avatar.url}?x-oss-process=image/resize,m_fill,h_50,w_50`
          } else {
            author.avatar = {
              url: '',
              dealUrl: require('@/assets/column.jpg')
            }
          }
          return author
        }
      }
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentArticle.value && currentArticle.value.author && isLogin) {
        const postAuthor = currentArticle.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })
    return {
      currentArticle,
      currentImageUrl,
      currentHTML,
      user,
      showEditArea,
      modalIsVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.article_detail {
  h2 {
    font-size: 2rem;
  }
  .breadcrumb {
    padding: 1rem 1rem;
    margin-bottom: 1rem;
    background-color: #e9ecef;
    border-radius: 0.25rem;
  }
}
</style>

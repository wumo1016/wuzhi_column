<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="columnInfo"
    >
      <div class="col-2 text-center">
        <img
          :src="columnInfo.avatar && columnInfo.avatar.url"
          :alt="columnInfo.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-10">
        <h4>{{ columnInfo.title }}</h4>
        <p class="text-muted">{{ columnInfo.description }}</p>
      </div>
    </div>
    <PostList :list="list" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '@/components/postList.vue'
import * as types from '@/store/action-types'
import { GlobalDataProps } from '@/public/types'

export default defineComponent({
  components: { PostList },
  setup() {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = route.params.id
    const columnInfo = computed(() => store.state.currentColumn)
    const list = computed(() =>
      store.state.articleList.map(item => {
        if (item.image) {
          item.image.url = `${item.image.url}?x-oss-process=image/resize,m_fill,h_110,w_200`
        } else {
          item.image = {
            url: require('@/assets/column.jpg')
          }
        }
        return item
      })
    )
    onMounted(() => {
      store.dispatch(types.SET_CURRENT_COLUMN, currentId)
      store.dispatch(types.SET_ARTICLE_LIST, currentId)
    })
    return {
      columnInfo,
      list
    }
  }
})
</script>

<style scoped></style>

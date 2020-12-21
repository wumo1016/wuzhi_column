<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="columnInfo"
    >
      <div class="col-2 text-center">
        <img
          :src="columnInfo.avatar && columnInfo.avatar.dealUrl"
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
    <Pagination
      :total="pageData.total"
      :currentPage="pageData.currentPage"
      :pageSize="pageData.pageSize"
      :pageSizes="[5, 10, 15, 20]"
      layout="total, prev, next"
      @currentChange="currentChange"
      @pageSizeChange="pageSizeChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '@/components/postList.vue'
import Pagination from '@/components/pagination.vue'
import * as types from '@/store/action-types'
import { GlobalDataProps } from '@/public/types'

export default defineComponent({
  components: { PostList, Pagination },
  setup() {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const pageData = reactive({
      total: 0,
      currentPage: 1,
      pageSize: 5
    })
    const total = ref(0)
    const columnInfo = computed(() => {
      const column = store.state.currentColumn
      if (column) {
        const { avatar } = column
        if (avatar) {
          avatar.dealUrl = `${avatar.url}?x-oss-process=image/resize,m_fill,h_120,w_130`
        } else {
          column.avatar = {
            url: '',
            dealUrl: require('@/assets/blank.png')
          }
        }
      }
      return store.state.currentColumn
    })
    const list = computed(() =>
      store.state.articleList.map(item => {
        if (item.image) {
          item.image.dealUrl = `${item.image.url}?x-oss-process=image/resize,m_fill,h_110,w_200`
        } else {
          item.image = {
            url: '',
            dealUrl: require('@/assets/blank.png')
          }
        }
        return item
      })
    )
    const getArticleData = async (id, currentPage = 1, pageSize = 5) => {
      const res = await store.dispatch(types.SET_ARTICLE_LIST, {
        id,
        params: { currentPage, pageSize }
      })
      pageData.total = res.count
      pageData.currentPage = res.currentPage
      pageData.pageSize = res.pageSize
    }
    const getColumnData = async id => {
      await store.dispatch(types.SET_CURRENT_COLUMN, id)
      getArticleData(id)
    }
    watch(
      () => route.params.id,
      v => {
        if (v) {
          getColumnData(v)
        }
      }
    )
    onMounted(() => {
      getColumnData(route.params.id)
    })
    const currentChange = page => {
      getArticleData(route.params.id, page, pageData.pageSize)
    }
    const pageSizeChange = size => {
      getArticleData(route.params.id, 1, size)
    }
    return {
      columnInfo,
      list,
      total,
      pageData,
      currentChange,
      pageSizeChange
    }
  }
})
</script>

<style scoped></style>

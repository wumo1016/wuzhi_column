<template>
  <div>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="@/assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/createEdit" class="btn btn-primary my-2">
              开始写文章
            </router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list" />
    <div class="text-center">
      <button
        v-if="hasMore"
        @click="loadMorePage"
        class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
      >
        加载更多
      </button>
      <span v-else>已经到底拉...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '@/components/columnList.vue'
import { GlobalDataProps } from '@/public/types'
import * as types from '@/store/action-types'
import UseLoadMore from '@/hooks/useLoadMore'
export default defineComponent({
  components: { ColumnList },
  setup() {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columnList)
    const length = computed(() => list.value.length)
    const total = computed(() => store.state.columnTotal)
    const { loadMorePage, hasMore } = UseLoadMore(
      types.SET_COLUMN_LIST,
      total,
      length,
      { currentPage: 2, pageSize: 6 }
    )
    onMounted(() => {
      if (list.value.length < 1) {
        store.dispatch(types.SET_COLUMN_LIST)
      }
    })
    return {
      list,
      loadMorePage,
      hasMore
    }
  }
})
</script>

<style scoped></style>

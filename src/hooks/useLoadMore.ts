import store from '@/store'
import { computed, ComputedRef, ref } from 'vue'

interface LoadParams {
  currentPage: number
  pageSize: number
}
const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  length: ComputedRef<number>,
  params: LoadParams = { currentPage: 1, pageSize: 5 }
) => {
  const currentPage = ref(params.currentPage)
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize
  }))
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++
    })
  }
  const hasMore = computed(() => {
    return length.value < total.value
  })
  return {
    loadMorePage,
    hasMore
  }
}

export default useLoadMore

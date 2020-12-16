<template>
  <div>
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
    const list = computed(() => store.state.articleList)
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

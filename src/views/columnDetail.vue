<template>
  <div>
    <PostList :list="list" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '@/components/postList.vue'
export default defineComponent({
  components: { PostList },
  setup() {
    const route = useRoute()
    const store = useStore()
    const currentId = +route.params.id
    const column = computed(() => store.getters.getColumnById(currentId))
    const list = computed(() => store.getters.getPostByCid(currentId))
    return {
      column,
      list
    }
  }
})
</script>

<style scoped></style>

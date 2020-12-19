<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4 style="cursor: pointer" @click="toAricleDetail(post._id)">
          {{ post.title }}
        </h4>
        <div class="row my-3 align-items-center">
          <div class="col-4">
            <img
              :src="post.image && post.image.dealUrl"
              :alt="post.title"
              class="rounded-lg w-100"
            />
          </div>
          <p :class="{ 'col-8': post.image }" class="text-muted">
            {{ post.excerpt }}
          </p>
        </div>
        <span class="text-muted">{{ post.author }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ArticleProps } from '@/public/types'
import router from '@/router'
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<ArticleProps[]>
    }
  },
  setup() {
    const toAricleDetail = id => {
      router.push(`/article/${id}`)
    }
    return {
      toAricleDetail
    }
  }
})
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}
.post-list h4 a:hover {
  color: #0d6efd;
}
</style>

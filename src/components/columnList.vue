<template>
  <div class="row">
    <div v-for="item in columnList" :key="item._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="item.avatar && item.avatar.dealUrl"
            :alt="item.title"
            class="rounded-circle border border-light my-3 w-30"
          />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">
            {{ item.description }}
          </p>
          <router-link
            :to="`/column/${item._id}`"
            class="btn btn-outline-primary"
          >
            进入专栏
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/public/types'
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map(item => {
        if (item.avatar) {
          item.avatar.dealUrl = `${item.avatar.url}?x-oss-process=image/resize,m_fill,h_100,w_100`
        } else {
          item.avatar = {
            url: '',
            dealUrl: require('@/assets/blank.png')
          }
        }
        return item
      })
    })
    return {
      columnList
    }
  }
})
</script>

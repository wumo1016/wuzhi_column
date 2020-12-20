<template>
  <div class="pagination_box">
    <div v-if="showButton('total')" class="me-2">共{{ total }}条</div>
    <select
      v-if="pageSizes"
      class="form-select me-2"
      aria-label="Default select example"
      style="width:100px"
      @change="pageSizeChange"
    >
      <option
        v-for="size in pageSizes"
        :key="size"
        :value="size"
        :selected="size === pageSize"
      >
        {{ size }} 条/页
      </option>
    </select>
    <div
      v-if="showButton('prev')"
      class="page-item"
      :class="{ disabled: currentPage < 2 }"
      @click="pervPage"
    >
      <div class="page-link">&laquo;</div>
    </div>
    <div
      v-for="index in pageButtons"
      :key="index"
      class="page-item"
      :class="{ active: index === currentPage }"
      @click="currentChange(index)"
    >
      <div class="page-link">{{ index }}</div>
    </div>
    <div
      v-if="showButton('next')"
      class="page-item"
      :class="{ disabled: currentPage > pageButtonNum - 1 }"
      @click="nextPage"
    >
      <div class="page-link">&raquo;</div>
    </div>
    <div class="ms-2">共{{ pageButtonNum }}页</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
type ButtonType = 'total' | 'prev' | 'next'
export default defineComponent({
  props: {
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array as PropType<number[]>
    },
    layout: {
      type: String
    }
  },
  emits: ['currentChange', 'pageSizeChange'],
  setup(props, ctx) {
    const layout = ref(props.layout)
    const showList = ref<string[]>([])
    if (layout.value) {
      layout.value = layout.value.replace(/ /g, '')
      showList.value = layout.value.split(',')
    }
    const showButton = (type: ButtonType): boolean => {
      return showList.value.includes(type)
    }
    const pageButtonNum = computed(() => {
      return Math.ceil(props.total / props.pageSize)
    })
    const pageButtons = computed(() => {
      if (pageButtonNum.value === 0) {
        return [1]
      } else if (pageButtonNum.value <= 3) {
        return Array(pageButtonNum.value)
          .fill('')
          .map((v, index) => index + 1)
      } else {
        if (props.currentPage === 1) {
          return [1, 2, 3]
        } else if (props.currentPage === pageButtonNum.value) {
          return [
            pageButtonNum.value - 2,
            pageButtonNum.value - 1,
            pageButtonNum.value
          ]
        } else {
          return [
            props.currentPage - 1,
            props.currentPage,
            props.currentPage + 1
          ]
        }
      }
    })
    // 改变页码
    const currentChange = index => {
      if (index !== props.currentPage) {
        ctx.emit('currentChange', index)
      }
    }
    const pervPage = () => {
      if (props.currentPage > 1) {
        ctx.emit('currentChange', props.currentPage - 1)
      }
    }
    const nextPage = () => {
      if (props.currentPage < pageButtonNum.value) {
        ctx.emit('currentChange', props.currentPage + 1)
      }
    }
    // 改变pageSize
    const pageSizeChange = e => {
      ctx.emit('pageSizeChange', Number(e.target.value))
    }

    return {
      showButton,
      pageButtonNum,
      pageButtons,
      currentChange,
      pageSizeChange,
      pervPage,
      nextPage
    }
  }
})
</script>

<style lang="scss">
.pagination_box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  .page-link {
    cursor: pointer;
  }
}
</style>

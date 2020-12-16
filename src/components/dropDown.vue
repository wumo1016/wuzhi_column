<template>
  <div class="drop_down" ref="dropDownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside.ts'
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const dropDownRef = ref<null | HTMLElement>(null)
    const isClickOutside = useClickOutside(dropDownRef)
    watch(isClickOutside, v => {
      if (isOpen.value && v) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropDownRef
    }
  }
})
</script>

<style lang="scss">
.drop_down {
  position: relative;
}
</style>

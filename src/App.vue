<template>
  <div class="app_box">
    <GobalHeader :user="user" />
    <div class="layout_center px-4">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GobalHeader from '@/components/globalHeader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/public/types'
export default defineComponent({
  name: 'App',
  components: { GobalHeader },
  setup() {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    return {
      user
    }
  }
})
</script>

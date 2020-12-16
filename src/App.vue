<template>
  <div class="app_box">
    <GobalHeader :user="user" />
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GobalHeader from '@/components/globalHeader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
export default defineComponent({
  name: 'App',
  components: { GobalHeader },
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    return {
      user: currentUser
    }
  }
})
</script>

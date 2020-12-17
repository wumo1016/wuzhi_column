<template>
  <div class="global_header_box">
    <nav
      class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4 layout_center"
    >
      <router-link class="navbar-brand" to="/">舞之专栏</router-link>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link to="/login" class="btn btn-outline-light my-2">
            登陆
          </router-link>
        </li>
        <li class="list-inline-item">
          <a href="#" class="btn btn-outline-light my-2">注册</a>
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <DropDown :title="`你好,${user.nickName}`">
            <DropDownItme>
              <router-link to="/create" class="dropdown-item">
                新建文章
              </router-link>
            </DropDownItme>
            <DropDownItme disabled>
              <a href="#" class="dropdown-item">编辑资料</a>
            </DropDownItme>
            <DropDownItme>
              <a href="#" class="dropdown-item">退出登录</a>
            </DropDownItme>
          </DropDown>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from '@/components/dropDown.vue'
import DropDownItme from '@/components/dropDownItem.vue'
import { UserProps } from '@/public/types'

export default defineComponent({
  components: { DropDown, DropDownItme },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.global_header_box {
  background: #0d6efd;
  .navbar-brand {
    font-size: 1.5rem;
  }
  .btn {
    font-size: 1.2rem;
  }
}
</style>

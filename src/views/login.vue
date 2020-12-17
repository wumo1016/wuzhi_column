<template>
  <div class="login_box card">
    <h2>登录</h2>
    <ValidateForm @formSubmit="onSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱</label>
        <ValidateInput
          v-model="emailVal"
          :rules="emailRules"
          placeholder="请输入邮箱"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <ValidateInput
          type="password"
          v-model="passwordVal"
          :rules="passwordRules"
          placeholder="请输入密码"
        />
      </div>
      <!-- 全写是 v-slot="submit" -->
      <template #submit>
        <span class="btn btn-primary">提交</span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/validateInput.vue'
import ValidateForm from '@/components/validateForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import * as types from '@/store/action-types'
export default defineComponent({
  components: { ValidateInput, ValidateForm },
  setup() {
    const emailVal = ref('111@test.com')
    const passwordVal = ref('111111')
    const emailRules: RulesProp = [
      {
        type: 'required',
        message: '邮箱不能为空'
      },
      {
        type: 'email',
        message: '邮箱格式不正确'
      }
    ]
    const passwordRules: RulesProp = [
      {
        type: 'required',
        message: '密码不能为空'
      }
    ]
    const store = useStore()
    const router = useRouter()
    const onSubmit = async (res: boolean) => {
      if (res) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        await store.dispatch(types.SET_TOKEN, payload)
        await store.dispatch(types.SET_USER)
        router.push('/')
      }
    }
    return {
      emailRules,
      passwordRules,
      emailVal,
      passwordVal,
      onSubmit
    }
  }
})
</script>

<style lang="scss">
.login_box {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px 50px;
  margin-top: 100px;
  h2 {
    font-size: 2rem;
    text-align: center;
  }
  .btn {
    width: 100%;
    padding: 10px 0;
    font-size: 1.3rem;
  }
  .form-control {
    line-height: 2.5;
  }
  input {
    height: 40px;
  }
}
</style>

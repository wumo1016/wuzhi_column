<template>
  <div class="register_bac">
    <div class="register_box card">
      <h2>注册</h2>
      <ValidateForm @formSubmit="onSubmit">
        <div class="mb-3">
          <label class="form-label">邮箱</label>
          <ValidateInput
            v-model="email"
            :rules="emailRules"
            placeholder="请输入邮箱"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">昵称</label>
          <ValidateInput
            v-model="nickName"
            :rules="nickNameRules"
            placeholder="请输入昵称"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">密码</label>
          <ValidateInput
            type="password"
            v-model="password"
            :rules="passwordRules"
            placeholder="请输入密码"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">
            再次输入密码
          </label>
          <ValidateInput
            type="password"
            v-model="rePassword"
            :rules="rePasswordRules"
            placeholder="请输入密码"
          />
        </div>
        <template #submit>
          <span class="btn btn-primary">提交</span>
        </template>
      </ValidateForm>
      <div class="d-flex justify-content-between mt-1">
        <router-link to="/" class="text-primary">去首页</router-link>
        <router-link to="/login" class="text-primary">
          已有账户，去登录
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/validateInput.vue'
import ValidateForm from '@/components/validateForm.vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/index'
export default defineComponent({
  components: { ValidateInput, ValidateForm },
  setup() {
    const email = ref('')
    const nickName = ref('')
    const password = ref('')
    const rePassword = ref('')
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
    const nickNameRules: RulesProp = [
      {
        type: 'required',
        message: '昵称不能为空'
      }
    ]
    const passwordRules: RulesProp = [
      {
        type: 'required',
        message: '密码不能为空'
      },
      {
        type: 'custom',
        validator: () => password.value.length > 5,
        message: '密码至少为6位'
      }
    ]
    const rePasswordRules: RulesProp = [
      {
        type: 'required',
        message: '密码不能为空'
      },
      {
        type: 'custom',
        validator: () => password.value === rePassword.value,
        message: '两次密码必须一致'
      }
    ]
    const router = useRouter()
    const onSubmit = async (res: boolean) => {
      if (res) {
        const payload = {
          email: email.value,
          nickName: nickName.value,
          password: password.value
        }
        await register(payload)
        router.push('/login')
      }
    }
    return {
      email,
      nickName,
      password,
      rePassword,
      emailRules,
      nickNameRules,
      passwordRules,
      rePasswordRules,
      onSubmit
    }
  }
})
</script>

<style lang="scss">
.register_bac {
  height: 100%;
  background: url(~@/assets/login_bac.png) no-repeat center / cover;
  position: relative;
  .register_box {
    position: absolute;
    left: 50%;
    width: 400px;
    top: 50%;
    transform: translate(-50%, -65%);
    padding: 20px;
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
}
</style>

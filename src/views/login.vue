<template>
  <div>
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
        <span class="btn btn-danger">提交</span>
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
export default defineComponent({
  components: { ValidateInput, ValidateForm },
  setup() {
    const emailVal = ref('')
    const passwordVal = ref('')
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
    const onSubmit = (res: boolean) => {
      if (res) {
        store.commit('login')
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

<style scoped></style>

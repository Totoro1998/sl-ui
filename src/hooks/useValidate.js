import { passwordRegex, verificationCodeRegex } from '@/lib/validate'
import { pick } from 'lodash-es'
import { ref, computed, unref } from 'vue'

export default function useValidate(fields) {
  const totalFormRules = ref({
    first_name: [{ required: true, message: '请填写姓名' }],
    last_name: [{ required: true, message: '请填写姓氏' }],
    gender: [{ required: true, message: '请选择性别' }],
    birthday: [{ required: true, message: '请选择生日' }],
    country_or_region: [{ required: true, message: '请选择国家或地区' }],
    email: [{ required: true, message: '请输入邮箱' }],
    password: [
      { required: true, message: '请输入密码' },
      {
        pattern: passwordRegex,
        message: '请输入至少8位密码'
      }
    ],
    code: [
      { required: true, message: '请输入六位验证码' },
      {
        pattern: verificationCodeRegex,
        message: '请输入六位验证码'
      }
    ]
  })

  const formRules = computed(() => {
    return pick(totalFormRules.value, unref(fields))
  })

  return {
    formRules
  }
}

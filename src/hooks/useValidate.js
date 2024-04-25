import { passwordRegex, verificationCodeRegex } from '@/lib/validate'
import { pick } from 'lodash-es'
import { ref, computed, unref } from 'vue'

export default function useValidate(fields) {
  const totalFormRules = ref({
    name: [{ required: true, message: '请填写姓名' }],
    surname: [{ required: true, message: '请填写姓氏' }],
    gender: [{ required: true, message: '请选择性别' }],
    birth: [{ required: true, message: '请选择生日' }],
    country: [{ required: true, message: '请选择国家或地区' }],
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
    ],
    mobile: [{ required: true, message: '请填写电话号码' }],
    role: [{ required: true, message: '请填写身份信息' }],
    address: [{ required: true, message: '请填写身份信息' }],
    organize_name: [{ required: true, message: '请填写单位名称' }],
    organize_head: [{ required: true, message: '请填写负责人名称' }],
    organize_address: [{ required: true, message: '请填写单位地址' }],
    organize_contact: [{ required: true, message: '请填写联系方式' }]
  })

  const formRules = computed(() => {
    return pick(totalFormRules.value, unref(fields))
  })

  return {
    formRules
  }
}

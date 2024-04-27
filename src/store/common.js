import { REQUEST_URL } from '@/lib/const'
import { requestGet } from '@/lib/request'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore(
  'app-common',
  () => {
    const shaolinTechniqueList = ref([])
    const setShaolinTechniqueList = () => {
      requestGet(REQUEST_URL.PROJECT_LIST).then((res) => {
        shaolinTechniqueList.value = res.data.map((item) => {
          item.id = item.code
          item.text = item.name
          item.children = item.children.map((c) => {
            ;(c.id = c.code), (c.text = c.name)
            return c
          })
          return item
        })
      })
    }
    const setCommonStore = () => {
      setShaolinTechniqueList()
    }
    return {
      shaolinTechniqueList,
      setShaolinTechniqueList,
      setCommonStore
    }
  },
  {
    persist: true
  }
)

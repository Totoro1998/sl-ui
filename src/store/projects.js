import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectsStore = defineStore('app-projects', () => {
  const projectSetting = ref({
    project_id: [],
    custom_project: []
  })
  return {
    projectSetting
  }
})

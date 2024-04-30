import { useI18n } from '@/hooks/useI18n'
import { computed } from 'vue'

export const ENTRY_TYPE = {
  KUNGFU_FINAIS: 'kungfu-finais',
  SEMINARIO_CULTURAL: 'seminario-cultural',
  KUNGFU_PERFORMANCE: 'kungfu-performance'
}
export default function useEntry() {
  const { t } = useI18n()
  const allEntryList = computed(() => [
    {
      type: ENTRY_TYPE.KUNGFU_FINAIS,
      title: t('entryKungfuFinais.title'),
      tip: t('entryKungfuFinais.tip'),
      formTitle: t('entryKungfuFinais.formTitle')
    },
    {
      type: ENTRY_TYPE.SEMINARIO_CULTURAL,
      title: t('seminarioCultural.title'),
      tip: t('seminarioCultural.tip'),
      formTitle: t('seminarioCultural.formTitle')
    },
    {
      type: ENTRY_TYPE.KUNGFU_PERFORMANCE,
      title: t('kungfuPerformance.title'),
      tip: t('kungfuPerformance.tip'),
      formTitle: t('kungfuPerformance.formTitle')
    }
  ])
  const getEntryByType = (type) => {
    return allEntryList.value.find((entry) => entry.type === type)
  }

  return {
    allEntryList,
    getEntryByType
  }
}

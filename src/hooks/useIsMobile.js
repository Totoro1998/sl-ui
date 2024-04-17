import { useMediaQuery } from '@vueuse/core'

export default function useIsMobile() {
  const isMobileScreen = useMediaQuery('(max-width: 767px)')
  return isMobileScreen
}

import { ref } from 'vue'
import type { TApiCallArgs } from './types'
import { getDefaultErrorCb } from './default-error-handler'

export function useApiCall<Args = undefined>({
  cb,
  defaultLoading = false,
  catchCb,
  finallyCb,
}: TApiCallArgs<Args>) {
  const isLoading = ref(defaultLoading)

  const call = async (args?: Args) => {
    if (!defaultLoading && isLoading.value) return
    try {
      isLoading.value = true
      await cb(args as Args)
    } catch (e: any) {
      if (catchCb) {
        await catchCb(e)
      } else {
        const defaultErrorHandler = getDefaultErrorCb()
        if (defaultErrorHandler) {
          await defaultErrorHandler(e)
        } else {
          console.error(e)
        }
      }
    } finally {
      isLoading.value = false
      await finallyCb?.()
    }
  }

  return {
    call,
    isLoading,
  }
}

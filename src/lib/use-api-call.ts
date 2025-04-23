import { ref } from 'vue'
import type { TApiCallArgs } from '../types'
import { getDefaultErrorCb } from './default-error-handler'

export function useApiCall<Args = undefined, Data = void, Errors = void>({
  cb,
  defaultLoading = false,
  catchCb,
  finallyCb,
}: TApiCallArgs<Args, Data, Errors>) {
  const isLoading = ref(defaultLoading)
  const data = ref({} as Data)
  const errors = ref({} as Errors)

  const call = async (args?: Args) => {
    if (!defaultLoading && isLoading.value) return

    try {
      isLoading.value = true
      data.value = await cb(args as Args)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (catchCb) {
        errors.value = await catchCb(e)
      } else {
        const defaultErrorHandler = getDefaultErrorCb()
        if (defaultErrorHandler) {
          await defaultErrorHandler(e)
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
    data,
    errors,
  }
}

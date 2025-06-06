import { ref } from 'vue'
import { getDefaultErrorCb } from './default-error-handler'
import type { TApiCallArgs } from './types'

export function useApiCall<Args = undefined, Data = void, Errors = null>({
  cb,
  defaultLoading = false,
  catchCb,
  finallyCb,
}: TApiCallArgs<Args, Data, Errors>) {
  const isLoading = ref(defaultLoading)
  const data = ref({} as Data)
  const errors = ref(null as Errors)

  const call = async (args?: Args, skipLoading = false) => {
    if (!defaultLoading && isLoading.value) return

    try {
      if (!skipLoading) isLoading.value = true

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
      if (!skipLoading) isLoading.value = false

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

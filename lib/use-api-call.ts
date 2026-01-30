import { ref } from 'vue'
import { getDefaultErrorCb } from './default-error-handler'
import type { TApiCallArgs, TApiCallReturn } from './types'

export function useApiCall<Data = void>(
  args: TApiCallArgs<undefined, Data, null>
): TApiCallReturn<undefined, Data, null>
export function useApiCall<Data = void, Errors = null>(
  args: TApiCallArgs<undefined, Data, Errors>
): TApiCallReturn<undefined, Data, Errors>
export function useApiCall<Args, Data = void, Errors = null>(
  args: TApiCallArgs<Args, Data, Errors>
): TApiCallReturn<Args, Data, Errors>
export function useApiCall<Args = undefined, Data = void, Errors = null>({
  cb,
  defaultLoading = false,
  catchCb,
  finallyCb,
  callOnInit = false,
}: TApiCallArgs<Args, Data, Errors>) {
  const isLoading = ref<boolean>(defaultLoading || callOnInit)
  const data = ref(null as Data)
  const errors = ref<Errors | null>(null)

  const call = async (args?: Args, skipLoading = false): Promise<void> => {
    if (!defaultLoading && !callOnInit && isLoading.value) return

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

  const reset = (): void => {
    isLoading.value = defaultLoading
    data.value = null
    errors.value = null
  }

  if (callOnInit) call()

  return {
    call,
    isLoading,
    data,
    errors,
    reset,
  }
}

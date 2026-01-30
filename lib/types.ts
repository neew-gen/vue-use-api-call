import type { Ref } from 'vue'

export type TApiCallArgs<Args, Data, Errors> = {
  cb: [Args] extends undefined ? () => Promise<Data> | Data : (args: Args) => Promise<Data> | Data
  defaultLoading?: boolean
  catchCb?: (e: any) => Promise<Errors> | Errors // eslint-disable-line
  finallyCb?: () => Promise<void> | void
  callOnInit?: boolean
}

export type TApiCallReturn<Args, Data, Errors> = {
  call: (args?: Args, skipLoading?: boolean) => Promise<void>
  isLoading: Ref<boolean>
  data: Ref<Data>
  errors: Ref<Errors | null>
  reset: () => void
}

export type TDefaultErrorCb = (e: any) => Promise<void> | void // eslint-disable-line

export type TPluginOptions = {
  defaultErrorCb?: TDefaultErrorCb
}

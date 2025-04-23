export type TApiCallArgs<Args, Data, Errors> = {
  cb: (args?: Args) => Promise<Data> | Data
  defaultLoading?: boolean
  catchCb?: (e: any) => Promise<Errors> | Errors
  finallyCb?: () => Promise<void> | void
}

export type TDefaultErrorCb = (e: any) => Promise<void> | void

export type TPluginOptions = {
  defaultErrorCb?: TDefaultErrorCb
}

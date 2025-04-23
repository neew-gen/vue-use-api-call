export type TApiCallArgs<Args, Errors> = {
  cb: (args?: Args) => Promise<void> | void
  defaultLoading?: boolean
  catchCb?: (e: any) => Promise<Errors> | Errors
  finallyCb?: () => Promise<void> | void
}

export type TDefaultErrorCb = (e: any) => Promise<void> | void

export type TPluginOptions = {
  defaultErrorCb?: TDefaultErrorCb
}

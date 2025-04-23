export type TApiCallArgs<Args> = {
  cb: (args?: Args) => Promise<void> | void
  defaultLoading?: boolean
  catchCb?: TErrorCb
  finallyCb?: () => Promise<void> | void
}

export type TErrorCb = (e: any) => Promise<void> | void

export type TPluginOptions = {
  defaultErrorCb?: TErrorCb
}

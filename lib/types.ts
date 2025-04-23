type TApiCallWithArgs<Args, Data, Errors> = {
  cb: (args: Args) => Promise<Data> | Data
  defaultLoading?: boolean
  catchCb?: (e: any) => Promise<Errors> | Errors
  finallyCb?: () => Promise<void> | void
}

type TApiCallWithoutArgs<Data, Errors> = {
  cb: () => Promise<Data> | Data
  defaultLoading?: boolean
  catchCb?: (e: any) => Promise<Errors> | Errors
  finallyCb?: () => Promise<void> | void
}

export type TApiCallArgs<Args, Data, Errors> = Args extends undefined 
  ? TApiCallWithoutArgs<Data, Errors>
  : TApiCallWithArgs<Args, Data, Errors>

export type TDefaultErrorCb = (e: any) => Promise<void> | void

export type TPluginOptions = {
  defaultErrorCb?: TDefaultErrorCb
}

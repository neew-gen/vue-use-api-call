type TApiCallWithArgs<Args, Data, Errors> = {
  cb: (args: Args) => Promise<Data> | Data
  defaultLoading?: boolean
  catchCb?: (e: any) => Promise<Errors> | Errors // eslint-disable-line
  finallyCb?: () => Promise<void> | void
  callOnInit?: boolean
}
type TApiCallWithoutArgs<Data, Errors> = {
  cb: () => Promise<Data> | Data
  defaultLoading?: boolean
  catchCb?: (e: any) => Promise<Errors> | Errors // eslint-disable-line
  finallyCb?: () => Promise<void> | void
  callOnInit?: boolean
}
export type TApiCallArgs<Args, Data, Errors> = Args extends undefined
  ? TApiCallWithoutArgs<Data, Errors>
  : TApiCallWithArgs<Args, Data, Errors>

export type TDefaultErrorCb = (e: any) => Promise<void> | void // eslint-disable-line

export type TPluginOptions = {
  defaultErrorCb?: TDefaultErrorCb
}

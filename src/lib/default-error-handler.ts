import type { TErrorCb } from './types'

let defaultErrorCb: TErrorCb | null = null

export const setDefaultErrorCb = (cb: TErrorCb | null) => {
  defaultErrorCb = cb
}

export const getDefaultErrorCb = () => {
  return defaultErrorCb
}

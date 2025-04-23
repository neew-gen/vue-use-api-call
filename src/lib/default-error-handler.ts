import type { TDefaultErrorCb } from '../types'

let defaultErrorCb: TDefaultErrorCb | null = null

export const setDefaultErrorCb = (cb: TDefaultErrorCb | null) => {
  defaultErrorCb = cb
}

export const getDefaultErrorCb = () => {
  return defaultErrorCb
}
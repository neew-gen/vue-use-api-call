import type { App } from 'vue'
import type { TPluginOptions } from './types'
import { setDefaultErrorCb } from './default-error-handler'
import { useApiCall } from './use-api-call'

export const install = (app: App, options?: TPluginOptions) => {
  if (options?.defaultErrorCb) {
    setDefaultErrorCb(options.defaultErrorCb)
  }

  app.provide('useApiCall', useApiCall)
}

export { useApiCall }

export default {
  install,
}

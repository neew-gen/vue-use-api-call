import type { App } from 'vue'
import { useApiCall } from './lib/use-api-call'
import { setDefaultErrorCb } from './lib/default-error-handler'
import type { TPluginOptions } from './types'

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

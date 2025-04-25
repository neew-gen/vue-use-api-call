import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createApp } from 'vue'
import { install, useApiCall } from '../lib'
import { setDefaultErrorCb } from '../lib/default-error-handler'
describe('Plugin tests', () => {
  let app: ReturnType<typeof createApp>

  beforeEach(() => {
    vi.clearAllMocks()
    setDefaultErrorCb(null)
    app = createApp({})
  })

  it('should install plugin and provide useApiCall', () => {
    const mockErrorCb = vi.fn()
    install(app, { defaultErrorCb: mockErrorCb })

    expect(app._context.provides['useApiCall']).toBeDefined()
  })

  it('should successfully execute cb', async () => {
    const mockCb = vi.fn()

    install(app)

    const { call } = useApiCall({
      cb: mockCb,
    })

    await call()

    expect(mockCb).toHaveBeenCalled()
  })

  it('should correctly handle defaultLoading true', async () => {
    const mockCb = vi.fn()

    install(app)

    const { call, isLoading } = useApiCall({
      cb: mockCb,
      defaultLoading: true,
    })

    expect(isLoading.value).toBe(true)

    await call()

    expect(isLoading.value).toBe(false)
    expect(mockCb).toHaveBeenCalled()
  })

  it('should correctly handle defaultLoading false', async () => {
    const mockCb = vi.fn()

    install(app)

    const { call, isLoading } = useApiCall({
      cb: mockCb,
      defaultLoading: false,
    })

    expect(isLoading.value).toBe(false)

    await call()

    expect(isLoading.value).toBe(false)
    expect(mockCb).toHaveBeenCalled()
  })

  it('should correctly handle data after successful API call', async () => {
    const mockData = { id: 1, name: 'Test' }
    const mockCb = vi.fn().mockResolvedValue(mockData)

    install(app)

    const { call, data } = useApiCall({
      cb: mockCb,
    })

    expect(data.value).toEqual({})

    await call()

    expect(data.value).toEqual(mockData)
    expect(mockCb).toHaveBeenCalled()
  })

  it('should call finallyCb after successful execution', async () => {
    const mockCb = vi.fn()
    const mockFinallyCb = vi.fn()

    install(app)

    const { call } = useApiCall({
      cb: mockCb,
      finallyCb: mockFinallyCb,
    })

    await call()

    expect(mockCb).toHaveBeenCalled()
    expect(mockFinallyCb).toHaveBeenCalled()
  })

  it('should call finallyCb after error', async () => {
    const error = new Error('Test error')
    const mockFinallyCb = vi.fn()

    install(app)

    const { call } = useApiCall({
      cb: async () => {
        throw error
      },
      finallyCb: mockFinallyCb,
    })

    await call()

    expect(mockFinallyCb).toHaveBeenCalled()
  })

  it('should call default error handler when error occurs', async () => {
    const mockErrorCb = vi.fn()
    const error = new Error('Test error')

    install(app, { defaultErrorCb: mockErrorCb })

    const { call } = useApiCall({
      cb: async () => {
        throw error
      },
    })

    await call()

    expect(mockErrorCb).toHaveBeenCalledWith(error)
  })

  it('should not call default error handler when catchCb is provided', async () => {
    const mockErrorCb = vi.fn()
    const error = new Error('Test error')
    const customCatchCb = vi.fn()

    install(app, { defaultErrorCb: mockErrorCb })

    const { call } = useApiCall({
      cb: async () => {
        throw error
      },
      catchCb: customCatchCb,
    })

    await call()

    expect(mockErrorCb).not.toHaveBeenCalled()
    expect(customCatchCb).toHaveBeenCalledWith(error)
  })

  it('should correctly handle error data from catchCb', async () => {
    const error = new Error('Test error')
    const errorData = { code: 'ERROR_001', message: 'Test error message' }
    const mockCatchCb = vi.fn().mockResolvedValue(errorData)

    install(app)

    const { call, errors } = useApiCall({
      cb: async () => {
        throw error
      },
      catchCb: mockCatchCb,
    })

    expect(errors.value).toEqual(null)

    await call()

    expect(errors.value).toEqual(errorData)
    expect(mockCatchCb).toHaveBeenCalledWith(error)
  })

  it('should correctly pass args to cb function', async () => {
    const mockArgs = { id: 1, name: 'Test' }
    const mockCb = vi.fn().mockResolvedValue(mockArgs)

    install(app)

    const { call } = useApiCall({
      cb: mockCb,
    })

    await call(mockArgs)

    expect(mockCb).toHaveBeenCalledWith(mockArgs)
  })
})

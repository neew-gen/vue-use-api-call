# vue-use-api-call

Vue 3 composable for convenient handling of asynchronous operations. Makes it easy to manage loading state and error handling.

> This library is inspired by [TanStack Query](https://tanstack.com/query/latest) but with a key difference: while TanStack Query focuses on data fetching and caching, `vue-use-api-call` provides a simpler way to handle any asynchronous operations and can be called not only in component setup but anywhere in your code.

## Installation

```bash
npm install vue-use-api-call
# or
yarn add vue-use-api-call
# or
pnpm add vue-use-api-call
```

## Usage

### Basic Example (destructuring)

```vue
<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <button @click="call()" :disabled="isLoading">
      {{ isLoading ? 'Loading...' : 'Do smth' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useApiCall } from 'vue-use-api-call'

const { isLoading, call } = useApiCall({
  cb: async () => {
    // Your async operation
    await fetch('https://api.example.com/do-smth')
  }
})

// Execute the operation
call()
</script>

```

### Basic Example (without destructuring)

```vue
<template>
  <div>
    <!-- You should use .value if you don't destructure composable -->
    <div v-if="doSmth.isLoading.value">Loading...</div>
    <button @click="doSmth.call()" :disabled="doSmth.isLoading.value">
      {{ isLoading ? 'Loading...' : 'Do smth' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useApiCall } from 'vue-use-api-call'

const doSmth = useApiCall({
  cb: async () => {
    // Your async operation
    await fetch('https://api.example.com/do-smth')
  }
})

// Execute the operation
doSmth.call()
</script>

```

### Fetching data

```vue
<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div>{{ data }}</div>
  </div>
</template>

<script setup lang="ts">
import { useApiCall } from 'vue-use-api-call'

// Data will be auto typed depends on type of fetching result
const { isLoading, call, data } = useApiCall({
  cb: async () => {
    // Result of fetching will be stored in data variable
    return await fetch('https://api.example.com/fetch-smth')
  }
})

call()
</script>

```

### Init as plugin (optional)
Plugin initialization is optional and is needed when you want to set up a global error handler that will be used when no `catchCb` is provided.


```vue
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import useApiCallPlugin from 'vue-use-api-call'

const app = createApp(App)

// Initialize the plugin with default error handler
app.use(useApiCallPlugin, {
  defaultErrorCb: (e) => {
    // Global error handling logic (call toast for example)
    toast('error', yourAmazingErrorHandler(e))
  }
})

app.mount('#app')
```

### With Error Handling

```vue
<script setup lang="ts">
import { useApiCall } from 'vue-use-api-call'

const { isLoading, call } = useApiCall({
  cb: async () => {
    await fetch('https://api.example.com/do-smth')
  },
  catchCb: (e) => {
    // Your error handling logic
  }
})
</script>
```

### With Errors Variable

```vue
<script setup lang="ts">
import { useApiCall } from 'vue-use-api-call'

// Errors variable will be auto typed depends on type of catchCb returning value
const { isLoading, call, errors } = useApiCall({
  cb: async () => {
    await fetch('https://api.example.com/do-smth')
  },
  catchCb: (e) => {
    // You can convert error to array or what you want
    return yourAmazingErrorConverter(e)
  }
})
</script>
```

### With Parameters

```vue
<script setup lang="ts">
import { useApiCall } from 'vue-use-api-call'

const { isLoading, call } = useApiCall({
  cb: async (params: { userId: string }) => {
    await fetch(`https://api.example.com/do-smth/${params.userId}`)
  }
})

// Execute operation with parameters
call({ userId: '123' })
</script>
```

## API

### Parameters

| Parameter | Type | Description |
|----------|-----|----------|
| cb | `(args?: Args) => Promise<Data> \| Data` | Main async function |
| defaultLoading | boolean | Initial loading state (default: false) |
| catchCb | `(e: any) => Promise<Errors> \| Errors` | Error handler |
| finallyCb | `() => Promise<void> \| void` | Callback called after operation completion |

### Return Values

| Property | Type | Description |
|----------|-----|----------|
| call | `(args?: Args, skipLoading = false) => Promise<void>` | Function to execute the operation. The `skipLoading` parameter can be used to prevent showing loading state on subsequent calls, for example when you don't want to show loading screen on retry. |
| isLoading | `Ref<boolean>` | Loading flag |
| data | `Ref<Data \| null>` | Reactive reference to the data returned from the API call. The type `Data` is automatically inferred from the return type of the `cb` function |
| errors | `Ref<Errors \| null>` | Reactive reference to the error data returned from the `catchCb` function. The type `Errors` is automatically inferred from the return type of the `catchCb` function |
| reset | `void` | Reset data, loading, errors to default value

### Plugin Options

| Property | Type | Description |
|----------|-----|----------|
| defaultErrorCb | `(e: any) => Promise<void> \| void` | Global error handler that will be used when no `catchCb` is provided |

## License

MIT

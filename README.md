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
| cb | `(args?: Args) => Promise<void> \| void` | Main async function |
| defaultLoading | boolean | Initial loading state (default: false) |
| catchCb | `(e: any) => Promise<void> \| void` | Error handler |
| finallyCb | `() => Promise<void> \| void` | Callback called after operation completion |

### Return Values

| Property | Type | Description |
|----------|-----|----------|
| call | `(args?: Args) => Promise<void> \| void` | Function to execute the operation |
| isLoading | `Ref<boolean>` | Loading flag |

### Plugin Options

| Property | Type | Description |
|----------|-----|----------|
| defaultErrorCb | `(e: any) => Promise<void> \| void` | Global error handler that will be used when no `catchCb` is provided |

## License

MIT

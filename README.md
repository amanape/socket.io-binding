## `@mswjs/socket.io-utils`

## Motivation

This package is intended as a wrapper over the `WebSocketInterceptor` from [`@mswjs/interceptors`](https://github.com/mswjs/interceptors). It provides automatic encoding and decoding of messages, letting you work with the Socket.IO clients and servers as you are used to.

```js
import { WebSocketInterceptor } from '@mswjs/interceptor'
import { toSocketIoConnection } from '@mswjs/socket.io-utils'

const interceptor = new WebSocketInterceptor()

interceptor.on('connection', ({ client, server }) => {
  client.on('message', (event) => {
    // Socket.IO implements their custom messaging protocol.
    // This means that the "raw" event data you get will be
    // encoded: e.g. "40", "42['message', 'Hello, John!']".
    console.log(event.data)
  })

  const io = toSocketIoConnection({ client, server })

  io.client.on('greeting', (message) => {
    // Using the wrapper, you get the decoded messages,
    // as well as support for custom event listeners.
    console.log(message) // "Hello, John!"
  })
})
```

> You can also use this package with [Mock Service Worker](https://github.com/mswjs/msw) directly.

## Install

```sh
npm i @mswjs/socket.io-utils
```

## Examples

### Using with Mock Service Worker

```js
import { ws } from 'msw'
import { toSocketIoConnection } from '@mswjs/socket.io-utils'

const chat = ws.url('wss://example.com')

export const handlers = [
  ws.on('connection', ({ client, server }) => {
    const io = toSocketIoConnection({ client, server })

    io.on('hello', (name) => {
      console.log('client sent hello:', name)
    })
  }),
]
```

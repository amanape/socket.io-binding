// Type definitions for MSW v2 WebSocket connections
declare module 'msw' {
  import { WebSocketConnectionData } from '@mswjs/interceptors/WebSocket'
  
  interface PathParams {
    [key: string]: string
  }
  
  interface WebSocketHandlerConnection {
    client: any
    server: any
    info: WebSocketConnectionData['info']
    params: PathParams
  }
}
import { describe, it, expect, vi } from 'vitest'
import { ws } from 'msw'
import { toSocketIo } from '../src'

describe('MSW v2 compatibility', () => {
  it('should work with MSW v2 connection object', () => {
    const chat = ws.link('wss://chat.example.com')
    
    // Mock MSW v2 connection object
    const mockConnection = {
      client: {
        addEventListener: vi.fn(),
        send: vi.fn(),
      },
      server: {
        addEventListener: vi.fn(),
        send: vi.fn(),
      },
      info: {
        protocols: ['chat'],
      },
      params: {},
    }
    
    // This should not throw any type errors
    const io = toSocketIo(mockConnection)
    
    // Basic functionality check
    expect(io).toBeDefined()
    expect(io.client).toBeDefined()
    expect(io.server).toBeDefined()
  })
})
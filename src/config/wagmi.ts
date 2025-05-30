import { http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { createStorage } from 'wagmi'

const projectId = '3a79bcd00dbc4d8d96894a1b45c941cf'

const mainnetRpc = `https://mainnet.infura.io/v3/${projectId}`
const sepoliaRpc = `https://sepolia.infura.io/v3/${projectId}`

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected({
      target: 'metaMask',
      shimDisconnect: true,
    }),
  ],
  storage: createStorage({
    storage: window.localStorage,
  }),
  transports: {
    [mainnet.id]: http(mainnetRpc, {
      retryCount: 3,
      retryDelay: 1000,
      timeout: 10000,
    }),
    [sepolia.id]: http(sepoliaRpc, {
      retryCount: 3,
      retryDelay: 1000,
      timeout: 10000,
    }),
  },
  pollingInterval: 4000, // Poll every 4 seconds
}) 
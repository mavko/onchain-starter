import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import {
	mainnet,
	arbitrum,
	avalanche,
	base,
	optimism,
	polygon,
	bsc,
} from '@reown/appkit/networks'

// Get projectId from environment variable
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

if (!projectId) {
	throw new Error('Project ID is not defined')
}

export const networks = [
	mainnet,
	arbitrum,
	avalanche,
	base,
	optimism,
	polygon,
	bsc,
]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage,
	}),
	ssr: true,
	projectId,
	networks,
})

export const config = wagmiAdapter.wagmiConfig

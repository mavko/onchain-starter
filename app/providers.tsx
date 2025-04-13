'use client'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { base, mainnet, bsc } from 'wagmi/chains'
import {
	coinbaseWallet,
	injected,
	metaMask,
	walletConnect,
} from 'wagmi/connectors'

const config = createConfig({
	chains: [mainnet, base, bsc],
	connectors: [
		injected({ target: 'binancewallet' }), // Binance Wallet
		coinbaseWallet({ appName: 'Portfolio Tracker' }),
		metaMask(),
		walletConnect({
			projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
		}),
	],
	transports: {
		[mainnet.id]: http(),
		[base.id]: http(),
		[bsc.id]: http(),
	},
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<OnchainKitProvider>{children}</OnchainKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}

import '../styles/globals.css'
import React, { useState, useEffect } from 'react'
import '../component/FloatingBoxes.modules.css'
import Layout from '@/component/layout'
import { useRouter } from 'next/router'
import WalletConnect from '@/component/WalletConnect'

// IMPORT WALLETCONNECT
import { EthereumClient } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  polygonMumbai,
} from 'wagmi/chains'

// INITIALIZE WALLETCONNECT
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora, polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_PROVIDER }),
    publicProvider(),
  ],
)
const { connectors } = getDefaultWallets({
  appName: 'Stories',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains,
})
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const [hydrated, setHydrated] = useState(false)
  const isLandingPage = router.pathname === '/'

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return <h1>Loading</h1>
  } else if (isLandingPage) {
    return <WagmiConfig config={wagmiConfig}> <Component {...pageProps} /></WagmiConfig>
  } else {
    return (
      <>
        <WagmiConfig config={wagmiConfig}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </WagmiConfig>
      </>
    )
  }
}
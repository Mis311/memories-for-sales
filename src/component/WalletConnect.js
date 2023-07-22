'use client'
import React from 'react'
import { useWeb3Modal } from '@web3modal/react'
import { useAccount } from 'wagmi'

function WalletConnect(props) {
  const { open, close } = useWeb3Modal()
  const { address, isConnecting, isDisconnected } = useAccount()

  return (
    <>
      {address ? (
        <button
          onClick={() => open()}
          style={{
            backgroundColor: '#3595fe',
            padding: '.2em',
            borderRadius: '10px',
          }}
        >
          {address.substring(0, 6)}...
          {address.substring(
            address.substring.length - 4,
            address.substring.length,
          )}
        </button>
      ) : (
        <button onClick={() => open()}>Connect</button>
      )}
    </>
  )
}

export default WalletConnect
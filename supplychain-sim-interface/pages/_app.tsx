import 'tailwindcss/tailwind.css'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
import { AppProps } from 'next/app'

const POLLING_INTERVAL = 1200

function getLibrary(provider: any): ethers.providers.Web3Provider {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL

  return library
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary} >
      <Component {...pageProps} />
    </Web3ReactProvider>
  )

}

export default App

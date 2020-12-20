import { AppProps } from 'next/app'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import '../tailwind.output.css'

const POLLING_INTERVAL = 1200

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
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

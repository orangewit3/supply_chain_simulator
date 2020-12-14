import 'tailwindcss/tailwind.css'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

const POLLING_INTERVAL = 1200

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL

  return library
}

function App({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={ getLibrary }>
      <Component { ...pageProps } />
    </Web3ReactProvider>
  )

}

export default App

import 'tailwindcss/tailwind.css'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

function getLibrary(provider, connector) {
  return new ethers.providers.InfuraProvider(
    'goerli',
    process.env.INFURA_ENDPOINT_KEY
  )
}

function App({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={ getLibrary }>
      <Component { ...pageProps } />
    </Web3ReactProvider>
  )

}

export default App

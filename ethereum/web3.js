import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider)
} else {
  const provider = new Web3.providers.HttpProvider(
    // Recall that 'infura' is solely used as a portal to access the ethereum
    // network
    'https://ropsten.infura.io/v3/3f4f959699224811bce8d70d6f8ea717'
  )
  web3 = new Web3(provider)
}

export default web3

import { ethers, Contract } from 'ethers'
import Manufacturer from '../../../../../build/contracts/Manufacturer.json'

export default async function api() {
  const walletlessProvider = new ethers.providers.InfuraProvider(
    'goerli',
    process.env.INFURA_ENDPOINT_KEY
  )

  const contract = new Contract(
    process.env.MANUFACTURER_CONTRACT_ADDRESS,
    Manufacturer.abi,
    walletlessProvider
  )

  return contract
}
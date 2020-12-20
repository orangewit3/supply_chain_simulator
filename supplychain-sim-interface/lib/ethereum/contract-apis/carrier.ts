import { ethers, Contract } from 'ethers'
import Carrier from '../../../../build/contracts/Carrier.json'

/**
 * @todo Complete the contract functions before completing this interface.
 */
export default async function api() {
  const walletlessProvider = new ethers.providers.InfuraProvider(
    'goerli',
    process.env.INFURA_ENDPOINT_KEY
  )

  const contract = new Contract(
    process.env.CARRIER_CONTRACT_ADDRESS,
    Carrier.abi,
    walletlessProvider
  )

  return contract
}
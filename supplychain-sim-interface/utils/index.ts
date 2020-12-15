import { Contract } from 'ethers'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { getAddress, isAddress } from 'ethers/lib/utils'
import { AddressZero } from '@ethersproject/constants'

// Account is not optional
export function getSigner(library: Web3Provider, account: string):
  JsonRpcProvider {
  return library.getSigner(account).connectUnchecked()
}

// Account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string):
  Web3Provider | JsonRpcProvider {
  return account ? getSigner(library, account) : library
}

// Account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  )
}
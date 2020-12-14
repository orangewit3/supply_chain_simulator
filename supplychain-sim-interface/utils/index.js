import { Contract } from 'ethers'
import { getAddress, isAddress } from 'ethers/lib/utils'
import { AddressZero } from '@ethersproject/constants'


// account is not optional
export function getSigner(web3Provider, account) {
  return web3Provider.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(web3Provider, account) {
  return account ? getSigner(web3Provider, account) : web3Provider
}

// account is optional
export function getContract(address, ABI, web3Provider, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(web3Provider, account)
  )
}
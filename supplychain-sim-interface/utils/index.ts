import { Contract } from 'ethers'
import invariant from 'tiny-invariant'
import warning from 'tiny-warning'
import JSBI from 'jsbi'

import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { getAddress, isAddress } from 'ethers/lib/utils'
import { AddressZero } from '@ethersproject/constants'

import {
  BigintIsh,
  ZERO,
  ONE,
  TWO,
  THREE,
  SolidityType,
  SOLIDITY_TYPE_MAXIMA
} from '../constants'

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




export function validateSolidityTypeInstance(
  value: JSBI,
  solidityType: SolidityType
): void {
  invariant(
    JSBI.greaterThanOrEqual
      (value, ZERO),
    `${value} is not a ${solidityType}.`
  )
  invariant(
    JSBI.lessThanOrEqual(
      value,
      SOLIDITY_TYPE_MAXIMA[solidityType]),
    `${value} is not a ${solidityType}.`
  )
}

// Warns if addresses are not checksummed
export function validateAndParseAddress(address: string): string {
  try {
    const checksummedAddress = getAddress(address)

    warning(address === checksummedAddress, `${address} is not checksummed.`)

    return checksummedAddress
  } catch (error) {
    invariant(false, `${address} is not a valid address.`)
  }
}

export function parseBigintIsh(bigintIsh: BigintIsh): JSBI {
  return bigintIsh instanceof JSBI
    ? bigintIsh
    : typeof bigintIsh === 'bigint'
      ? JSBI.BigInt(bigintIsh.toString())
      : JSBI.BigInt(bigintIsh)
}

// Mock the on-chain sqrt function
export function sqrt(y: JSBI): JSBI {
  validateSolidityTypeInstance(y, SolidityType.uint256)

  let z: JSBI = ZERO
  let x: JSBI

  if (JSBI.greaterThan(y, THREE)) {
    z = y
    x = JSBI.add(JSBI.divide(y, TWO), ONE)

    while (JSBI.lessThan(x, z)) {
      z = x
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), TWO)
    }
  } else if (JSBI.notEqual(y, ZERO)) {
    z = ONE
  }

  return z
}

// Given an array of items sorted by `comparator`, insert an item into its sort
// index and constrain the size to `maxSize` by removing the last item.
export function sortedInsert<T>(
  items: T[],
  add: T,
  maxSize: number,
  comparator: (a: T, b: T) => number
): T | null {
  invariant(maxSize > 0, 'MAX_SIZE_ZERO')
  // This is an invariant because the interface cannot return multiple removed 
  // items if items.length exceeds maxSize.
  invariant(items.length <= maxSize, 'ITEMS_SIZE')

  // short circuit first item add
  if (items.length === 0) {
    items.push(add)

    return null
  } else {
    const isFull = items.length === maxSize

    // Short circuit if full and the additional item does not come before the 
    // last item
    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add
    }

    let lo = 0,
      hi = items.length

    while (lo < hi) {
      const mid = (lo + hi) >>> 1

      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1
      } else {
        hi = mid
      }
    }
    items.splice(lo, 0, add)

    return isFull ? items.pop()! : null
  }
}
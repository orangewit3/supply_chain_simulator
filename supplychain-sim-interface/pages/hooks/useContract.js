import { Contract } from 'ethers'

import { abi as COCOA_BEAN_FARMER_ABI } from '../../../build/contracts/CocoaBeanFarmer.json'
import { abi as MANUFACTURER_ABI } from '../../../build/contracts/Manufacturer.json'
import { abi as CARRIER_ABI } from '../../../build/contracts/Carrier.json'

import { useMemo } from 'react'

import { getContract } from '../../utils'
import { useActiveWeb3React } from './index'


/**
 * @returns `null` on errors
 */
function useContract(address, ABI, withSignerIfPossible = true) {
  const { web3Provider, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !web3Provider) return null

    try {
      return getContract(address, ABI, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.log('Failed to get contract', error)
      return null
    }
  }, [ address, ABI, withSignerIfPossible, account ])
}

export function useCocoaBeanFarmerContract(address, withSignerIfPossible) {
  return useContract(address, COCOA_BEAN_FARMER_ABI, withSignerIfPossible)
}
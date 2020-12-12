import React, { useState, useCallback } from 'react'
import deployManufacturer from '../../../lib/ethereum/web3/deploy/deployManufacturer'
import { ManufacturerForm } from './ManufacturerForm'


const DeployManufacturer = () => {
  const [ initialBeanCount, setInitialBeanCount ] = useState(null)
  const [ estimatedBeansToCoffeeRatio, setEstimatedBeansToCoffeeRatio ] = useState(null)
  const [ estimatedBeanValueInWei, setEstimatedBeanValueInWei ] = useState(null)
  const [ supplyChainTransactionsAddress, setSupplyChainTransactionsAddress ] = useState(null)

  const useHandleDeploy = useCallback(async (e) => {
    e.preventDefault()
    await deployManufacturer(
      initialBeanCount,
      estimatedBeansToCoffeeRatio,
      estimatedBeanValueInWei,
      supplyChainTransactionsAddress
    )
  }, [
    initialBeanCount,
    estimatedBeansToCoffeeRatio,
    estimatedBeanValueInWei,
    supplyChainTransactionsAddress
  ])

  const useSetInitialBeanCount = useCallback((e) => {
    setInitialBeanCount(e.currentTarget.value)
  }, [ setInitialBeanCount ])

  const useSetEstimatedBeansToCoffeeRatio = useCallback((e) => {
    setEstimatedBeansToCoffeeRatio(e.currentTarget.value)
  }, [ setEstimatedBeansToCoffeeRatio ])

  const useSetEstimatedBeanValueInWei = useCallback((e) => {
    setEstimatedBeanValueInWei(e.currentTarget.value)
  }, [ setEstimatedBeanValueInWei ])

  const useSetSupplyChainTransactionsAddressCallback = useCallback((e) => {
    setSupplyChainTransactionsAddress(e.currentTarget.value)
  }, [ setSupplyChainTransactionsAddress ])


  /**
   * @dev Seems like all component attributes must be handled within 
   * `useCallback()` for it to work
   */
  return (
    <div>
      <ManufacturerForm
        setInitialBeanCount={ useSetInitialBeanCount }
        setEstimatedBeansToCoffeeRatio={ useSetEstimatedBeansToCoffeeRatio }
        setEstimatedBeanValueInWei={ useSetEstimatedBeanValueInWei }
        setSupplyChainTransactionsAddress={ useSetSupplyChainTransactionsAddressCallback }
        handleDeploy={ useHandleDeploy }
      />
    </div>
  )
}

export default DeployManufacturer
import React, { useState, useCallback } from 'react'
import deployManufacturer from '../../../lib/ethereum/web3/deploy/deployManufacturer'
import { ManufacturerForm } from './ManufacturerForm'
import { useEtherPrice } from '../../hooks/useEtherPrice'


const DeployManufacturer = () => {
  const [ initialBeanCount, setInitialBeanCount ] = useState(0)
  const [ estimatedBeansToCoffeeRatio, setEstimatedBeansToCoffeeRatio ] = useState(0)
  const [ estimatedBeanValueInWei, setEstimatedBeanValueInWei ] = useState(0)
  const [ supplyChainTransactionsAddress, setSupplyChainTransactionsAddress ] = useState(null)
  const etherPrice = useEtherPrice()


  const useHandleDeploy = useCallback(async (e) => {
    e.preventDefault()
    await deployManufacturer(
      initialBeanCount,
      estimatedBeansToCoffeeRatio,
      estimatedBeanValueInWei,
      supplyChainTransactionsAddress
    )
    // console.log(
    //   initialBeanCount,
    //   estimatedBeansToCoffeeRatio,
    //   estimatedBeanValueInWei,
    //   supplyChainTransactionsAddress
    // )
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

  return (
    <div>
      <ManufacturerForm
        setInitialBeanCount={ useSetInitialBeanCount }
        setEstimatedBeansToCoffeeRatio={ useSetEstimatedBeansToCoffeeRatio }
        setEstimatedBeanValueInWei={ useSetEstimatedBeanValueInWei }
        setSupplyChainTransactionsAddress={ useSetSupplyChainTransactionsAddressCallback }
        etherPrice={ etherPrice }
        handleDeploy={ useHandleDeploy }
      />
    </div>
  )
}

export default DeployManufacturer
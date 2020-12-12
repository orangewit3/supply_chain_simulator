import React, { useState, useCallback } from 'react'
import deployManufacturer from '../../../lib/ethereum/web3/deploy/deployManufacturer'
import { ManufacturerForm } from './ManufacturerForm'
import { useEtherPrice } from '../../hooks/useEtherPrice'


const DeployManufacturer = () => {
  const [ initialBeanCount, setInitialBeanCount ] = useState(null)
  const [ estimatedBeansToCoffeeRatio, setEstimatedBeansToCoffeeRatio ] = useState(null)
  const [ estimatedBeanValueInWei, setEstimatedBeanValueInWei ] = useState(null)
  const [ supplyChainTransactionsAddress, setSupplyChainTransactionsAddress ] = useState(null)


  /**
   * @dev 
   * @todo
   * If we try to get either of the two values, `usd` or `last_updated_at`
   * from the etherObject, we an error is thrown:
   *  `TypeError: Cannot read property 'usd' of undefined`
   * 
   * Also, need to figure out why the next 3 lines are being called 3 times (
   * and on the 3rd time, we get the object we want, but every other time, the 
   * response returns `undefined)
   */
  const object = useEtherPrice()
  const etherObject = object.ethereum
  console.log(etherObject)



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

  return (
    <div>
      <ManufacturerForm
        setInitialBeanCount={ useSetInitialBeanCount }
        setEstimatedBeansToCoffeeRatio={ useSetEstimatedBeansToCoffeeRatio }
        setEstimatedBeanValueInWei={ useSetEstimatedBeanValueInWei }
        setSupplyChainTransactionsAddress={ useSetSupplyChainTransactionsAddressCallback }
        etherPrice={ etherObject }
        handleDeploy={ useHandleDeploy }
      />
    </div>
  )
}

export default DeployManufacturer
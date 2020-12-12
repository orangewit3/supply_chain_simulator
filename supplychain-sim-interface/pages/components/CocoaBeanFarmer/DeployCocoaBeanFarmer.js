import React, { useState, useCallback } from 'react'
import deployCocoaBeanFarmer from '../../../lib/ethereum/web3/deploy/deployCocoaBeanFarmer'
import { DeployFarmerForm } from './DeployFarmerForm'


const DeployCocoaBeanFarmer = () => {
  const [ initialQuantity, setInitialQuantity ] = useState(0)
  const [ supplyChainTransactionsAddress, setSupplyChainTransactionsAddress ] = useState(null)

  const useHandleDeploy = useCallback(async (e) => {
    e.preventDefault()
    await deployCocoaBeanFarmer(initialQuantity, supplyChainTransactionsAddress)
  }, [ initialQuantity, supplyChainTransactionsAddress ]
  )

  const useSetIntitialQuantityCallback = useCallback((e) => {
    setInitialQuantity(e.currentTarget.value)
  }, [ setInitialQuantity ])

  const useSetSupplyChainTransactionsAddressCallback = useCallback((e) => {
    setSupplyChainTransactionsAddress(e.currentTarget.value)
  }, [ setSupplyChainTransactionsAddress ])

  return (
    <div>
      <DeployFarmerForm
        setInitialQuantity={ useSetIntitialQuantityCallback }
        setSupplyChainTransactionsAddress={ useSetSupplyChainTransactionsAddressCallback }
        handleDeploy={ useHandleDeploy }
      />
    </div>
  )
}

export default DeployCocoaBeanFarmer
import React, { useCallback, useState } from 'react'
import CreateBeanTransactionForm from './CreateBeanTransactionForm'
import { createBeanTransaction } from '../../../lib/ethereum/contract-apis/cocoaBeanFarmer'


const CreateBeanTransaction = () => {
  const [ beanTxnName, setBeanTxnName ] = useState(null)
  const [ beanTxnDescription, setBeanTxnDescription ] = useState(null)
  const [ beanTxnQuantityToSend, setBeanTxnQuantityToSend ] = useState(0)
  const [ cocoaBeanFarmerContractAddress, setCocoaBeanFarmerContractAddress] = useState(null)


  const useSetBeanTxnNameCallback = useCallback((e) => {
    setBeanTxnName(e.currentTarget.value)
  }, [ setBeanTxnName ])

  const useSetBeanTxnDescriptionCallback = useCallback((e) => {
    setBeanTxnDescription(e.currentTarget.value)
  }, [ setBeanTxnDescription ])

  const useSetBeanTxnQuantityToSendCallback = useCallback((e) => {
    setBeanTxnQuantityToSend(e.currentTarget.value)
  }, [ setBeanTxnQuantityToSend ])
  
  const useSetCocoaBeanFarmerContractAddressCallback = useCallback((e) => {
    setCocoaBeanFarmerContractAddress(e.currentTarget.value)
  }, [ setCocoaBeanFarmerContractAddress ])

  const useHandleCreateBeanTransactionCallback = useCallback(async (e) => {
    e.preventDefault()
    createBeanTransaction(
      beanTxnName,
      beanTxnDescription,
      beanTxnQuantityToSend,
      cocoaBeanFarmerContractAddress
    )
  }, [
    beanTxnName,
    beanTxnDescription,
    beanTxnQuantityToSend,
    cocoaBeanFarmerContractAddress
  ])


  return (
    <div class="grid max-h-screen place-items-center">
      <CreateBeanTransactionForm
        setBeanTxnName={ useSetBeanTxnNameCallback }
        setBeanTxnDescription={ useSetBeanTxnDescriptionCallback }
        setBeanTxnQuantityToSend={ useSetBeanTxnQuantityToSendCallback }
        setCocoaBeanFarmerContractAddress={ useSetCocoaBeanFarmerContractAddressCallback }
        handleCreateBeanTransaction={ useHandleCreateBeanTransactionCallback }
      />
    </div>
  )
}

export default CreateBeanTransaction
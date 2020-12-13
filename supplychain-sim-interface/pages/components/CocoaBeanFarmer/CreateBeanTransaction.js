import React, { useCallback, useState } from 'react'
import CreateBeanTransactionForm from './CreateBeanTransactionForm'
import { createBeanTransactionFunction } from '../../../lib/ethereum/contract-apis/cocoaBeanFarmer'

/**
 * @dev 
 * @todo
 * Finish this component and render event log data on client table
 */
const CreateBeanTransaction = () => {
  const [ beanTxnName, setBeanTxnName ] = useState(null)
  const [ beanTxnDescription, setBeanTxnDescription ] = useState(null)
  const [ beanTxnQuantityToSend, setBeanTxnQuantityToSend ] = useState(0)


  const useSetBeanTxnNameCallback = useCallback((e) => {
    setBeanTxnName(e.currentTarget.value)
  }, [ setBeanTxnName ])

  const useSetBeanTxnDescriptionCallback = useCallback((e) => {
    setBeanTxnDescription(e.currentTarget.value)
  }, [ setBeanTxnDescription ])

  const useSetBeanTxnQuantityToSendCallback = useCallback((e) => {
    setBeanTxnQuantityToSend(e.currentTarget.value)
  }, [ setBeanTxnQuantityToSend ])

  const useHandleCreateBeanTransactionCallback = useCallback(async (e) => {
    e.preventDefault()
    await createBeanTransaction(
      beanTxnName,
      beanTxnDescription,
      beanTxnQuantityToSend
    )
  }, [
    beanTxnName,
    beanTxnDescription,
    beanTxnQuantityToSend
  ])


  return (
    <div class="grid max-h-screen place-items-center">
      <CreateBeanTransactionForm
        setBeanTxnName={ useSetBeanTxnNameCallback }
        setBeanTxnDescription={ useSetBeanTxnDescriptionCallback }
        setBeanTxnQuantityToSend={ useSetBeanTxnQuantityToSendCallback }
        handleCreateBeanTransaction={ useHandleCreateBeanTransactionCallback }
      />
    </div>
  )
}

export default CreateBeanTransaction
import React from 'react'
import BeanTransactionsView from './BeanTransactionsView'
import { useDataFromEventLogs } from '../../../../hooks/useEventData'
import { useActiveWeb3React } from '../../../../hooks'
import { useWeb3React } from '@web3-react/core'


const BeanTransactions = () => {
  const { chainId, account } = useWeb3React()
  console.log(chainId)
  console.log(account)
  const beanTxnDataFromEventLogs = useDataFromEventLogs()

  return (
    <div class="grid max-h-screen place-items-center">
      <BeanTransactionsView
        beanTransactionData={beanTxnDataFromEventLogs}
      />
    </div>
  )
}

export default BeanTransactions
import React from 'react'
import BeanTransactionsView from './BeanTransactionsView'
import { useDataFromEventLogs } from '../../../../state/cocoaBeanFarmer/hooks'
import { useActiveWeb3React } from '../../../../hooks'


const BeanTransactions = () => {
  const { chainId, account } = useActiveWeb3React()
  const beanTxnDataFromEventLogs = useDataFromEventLogs()

  return (
    <div className="grid max-h-screen place-items-center">
      <BeanTransactionsView
        beanTransactionData={beanTxnDataFromEventLogs}
      />
    </div>
  )
}

export default BeanTransactions
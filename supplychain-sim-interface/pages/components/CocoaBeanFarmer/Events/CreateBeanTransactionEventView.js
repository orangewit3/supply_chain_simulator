import React, { memo } from 'react'

const CreateBeanTransactionEventView = memo(({
  newBeanTxnEvent
}) => {


  return (
    <div class="grid max-h-screen place-items-center">
      <h3>New Bean Transactions</h3>
      <p>{ newBeanTxnEvent }</p>
    </div>
  )
})

export default CreateBeanTransactionEventView
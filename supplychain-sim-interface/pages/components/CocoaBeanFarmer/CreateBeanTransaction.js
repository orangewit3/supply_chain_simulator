import React, { useState } from 'react'
import contract from '../../../lib/ethereum/contract-api/cocoaBeanFarmer'

/**
 * @dev 
 * @todo
 * Finish this component and render event log data on client table
 */


const CreateBeanTransactionForm = () => {
  // State for form
  const [ beanTxnName, setBeanTxnName ] = useState()
  const [ beanTxnDescription, setBeanTxnDescription ] = useState()
  const [ beanTxnQuantityToSend, setBeanTxnQuantityToSend ] = useState()


  return (
    <div class="grid max-h-screen place-items-center">
      <div class="w-11/12 p-10 bg-white sm:w-max md:w-auto lg:w-auto">
        <h1 class="text-xl font-semibold text-center">Create the cocoa bean farmer's first transaction</h1>
        <form class="mt-4">
          <label for="txn-name" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">Txn name</label>
          <input
            id="txn-name"
            type="text"
            name="txn-name"
            placeholder="txn101"
            class="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={ (e) => setBeanTxnName(e.currentTarget.value) }
          />
          <label for="txn-description" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">Txn description</label>
          <input
            id="txn-description"
            type="text"
            name="txn-description"
            placeholder="first bean transaction"
            class="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={ (e) => setBeanTxnDescription(e.currentTarget.value) }
          />
          <label for="quantity-to-send" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">Quantity to send</label>
          <input
            id="quantity-to-send"
            type="number"
            name="quantity-to-send"
            placeholder="10"
            class="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={ (e) => setBeanTxnQuantityToSend(e.currentTarget.value) }
          />
          <div class='grid place-items-center'>
            <button
              // type="submit"
              class="w-3/4 py-3 mt-6 rounded-3xl  font-normal shadow-lg hover:bg-gray-200 hover:shadow-none"
              onClick={ handleCreateBeanTransaction }
            >
              Create Transaction
          </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBeanTransactionForm
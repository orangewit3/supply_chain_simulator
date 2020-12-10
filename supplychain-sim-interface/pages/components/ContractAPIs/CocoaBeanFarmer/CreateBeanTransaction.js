import React, { useState } from 'react'
import contract from '../../../../lib/ethereum/contract-api/cocoaBeanFarmer'
import styles from '../../../../styles/Home.module.css'


let CocoaBeanFarmer = contract

/**
 * @dev Current attempt at decoupling boolean. See next dev comment for more 
 * info.
 */
export const showBeanEvent = false

/**
 * @dev Below is Jason's previous attempt at decoupling boolean of 
 * `showBeanEvent`, a boolean that we can use in our higher-order component, 
 * `index.js`, to perform an if-check to display the event data of the newly 
 * created transaction.
 */
// export async function useBeanEvent(showBeanEvent) {
//   if (!showBeanEvent) {
//     const [ showBeanEvent, setBeanEvent ] = useState(false)

//     return [ showBeanEvent, setBeanEvent ]
//   }

//   return showBeanEvent
// }

const CreateBeanTransactionForm = () => {
  // State for form
  const [ beanTxnName, setBeanTxnName ] = useState('txn1')
  const [ beanTxnDescription, setBeanTxnDescription ] = useState('first bean txn')
  const [ beanTxnQuantityToSend, setBeanTxnQuantityToSend ] = useState('10')


  const handleCreateBeanTransaction = async () => {
    const contract = new web3.eth.Contract(
      CocoaBeanFarmer.abi,
      // Harded code for demo
      "0xcaDbE04877927d4450335FDbB4b2EA2018883cD2",
    )

    /**
     * @dev If you uncomment the next 3 lines, then this allows MetaMask to
     * request to be connected to the app after we make a call to the
     * `createBeanTransaction` function.
     */
    const ethereum = window.ethereum
    const web3Instance = new Web3(ethereum)
    const enabledWeb3 = await ethereum.enable()
    const account = await web3.eth.getAccounts()
    const accountAddress = await account[ 0 ]

    /**
     * @dev
     * @todo We need an if-check to validate the form has all fields filled
     */
    // if (
    //   beanTxnName != 'txn1' &&
    //   beanTxnDescription != 'first bean txn' &&
    //   beanTxnQuantityToSend != '10'
    // ) {
    await contract.methods
      .createBeanTransaction(
        beanTxnName,
        beanTxnDescription,
        beanTxnQuantityToSend.toString()
      ).send({ from: accountAddress })

    showBeanEvent = true

    //   } else {
    //     console.log()
    //   }
  }

  return (
    <div class="grid max-h-screen place-items-center">
      <div class="w-11/12 p-10 bg-white sm:w-auto md:w-auto lg:w-auto">
        <h1 class="text-xl font-semibold">Start by creating a transaction</h1>
        <form class="mt-4">
          <label for="txn-name" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">Txn Name</label>
          <input
            id="txn-name"
            type="text"
            name="txn-name"
            placeholder="txn101"
            class="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={ (e) => setBeanTxnName(e.currentTarget.value) }
          />
          <label for="txn-description" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">Txn Description</label>
          <input
            id="txn-description"
            type="text"
            name="txn-description"
            placeholder="first bean transaction"
            class="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={ (e) => setBeanTxnDescription(e.currentTarget.value) }
          />
          <label for="quantity-to-send" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">Quantity to Send</label>
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
              onClick={ handleCreateBeanTransaction() }
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
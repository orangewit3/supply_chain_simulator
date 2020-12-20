import { Modal } from '@material-ui/core'
import React, { memo } from 'react'


export const DeployFarmerForm = memo(({
  setInitialQuantity,
  setSupplyChainTransactionsAddress,
  handleDeploy
}) => {

  return (
    <div class="grid max-h-screen place-items-center">
      <div class="w-11/12 p-10 bg-white sm:w-auto md:w-auto lg:w-auto">
        <h1 class="text-xl font-semibold text-center">Deploy CocoaBeanFarmer contract</h1>
        <form class="mt-4">
          <label for="initial-quantity" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">Initial bean quantity</label>
          <input
            id="initial-quantity"
            type="number"
            name="initial-quantity"
            placeholder="100"
            class="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={ setInitialQuantity }
          />
          <label for="supply-chain-transactions-address" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">Contract address of SupplyChainTransactions</label>
          < input
            id="supply-chain-transactions-address"
            type="text"
            name="supply-chain-transactions-address"
            placeholder="0x07bEb9E0586Ea5f88F4b68890EA7..."
            class="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={ setSupplyChainTransactionsAddress }
          />
          <div class='grid place-items-center'>
            <button
              type="submit"
              class="w-3/4 py-3 mt-6 rounded-3xl  font-normal shadow-lg hover:bg-gray-200 hover:shadow-none"
              onClick={ handleDeploy }
            >
              Deploy CocoaBeanFarmer
          </button>
          </div>
        </form>
      </div>
    </div>
  )
})
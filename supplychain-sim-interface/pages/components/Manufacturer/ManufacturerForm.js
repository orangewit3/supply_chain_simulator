import { Modal } from '@material-ui/core'
import React, { memo, useEffect, useState } from 'react'


export const ManufacturerForm = memo(({
  initialBeanCount,
  estimatedBeansToCoffeeRatio,
  estimatedBeanValueInWei,
  setSupplyChainTransactionsAddress,
  etherPrice,
  handleDeploy
}) => {

  return (
    <div class="grid max-h-screen place-items-center">
      <div class="w-11/12 p-10 bg-white sm:w-auto md:w-auto lg:w-auto">
        <h1 class="text-xl font-semibold text-center">Deploy the Manufactuer contract</h1>
        <form class="mt-4">
          <label for="initial-bean-count" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">Initial bean count</label>
          <input
            id="initial-bean-count"
            type="number"
            name="initial-bean-count"
            placeholder="50"
            class="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={ initialBeanCount }
          />
          <label for="estimated-beans-to-coffee-ratio" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">Estimated beans to coffee ratio</label>
          <input
            id="estimated-beans-to-coffee-ratio"
            type="number"
            name="estimated-beans-to-coffee-ratio"
            placeholder="10"
            class="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={ estimatedBeansToCoffeeRatio }
          />
          <label for="estimated-bean-value-in-wei" class="block ml-3 mt-2 text-xs font-semibold text-gray-600">
            Estimated bean value in wei { ' ' }
            <p>
              <a class='hover:underline font-normal text-blue-400' href='https://www.coingecko.com/en/coins/ethereum' target='_blank'>
                { `(Note: WEI/ETH ➡️ 10^18 WEI/1 ETH and 1 ETH/USD = $${etherPrice})` }
              </a>
            </p>
          </label>
          <input
            id="estimated-bean-value-in-wei"
            type="number"
            name="estimated-bean-value-in-wei"
            placeholder="100000000000000 wei = 0.0001 ETH"
            class="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={ initialBeanCount }
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
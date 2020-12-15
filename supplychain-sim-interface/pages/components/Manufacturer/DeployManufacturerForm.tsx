import { Modal } from '@material-ui/core'
import React, { memo } from 'react'


export const DeployManufacturerForm = memo(({
  initialBeanCount,
  estimatedBeansToCoffeeRatio,
  estimatedBeanValueInWei,
  setSupplyChainTransactionsAddress,
  etherPrice,
  handleDeploy
}) => {

  return (
    <div className="grid max-h-screen place-items-center">
      <div className="w-11/12 p-10 bg-white sm:w-auto md:w-auto lg:w-auto">
        <h1 className="text-xl font-semibold text-center">Deploy Manufactuer contract</h1>
        <form className="mt-4">
          <label for="initial-bean-count" className="block ml-3 mt-2 text-xs font-semibold text-gray-600">Initial bean count</label>
          <input
            id="initial-bean-count"
            type="number"
            name="initial-bean-count"
            placeholder="50"
            className="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={initialBeanCount}
          />
          <label for="estimated-beans-to-coffee-ratio" className="block ml-3 mt-2 text-xs font-semibold text-gray-600">Estimated beans to coffee ratio</label>
          <input
            id="estimated-beans-to-coffee-ratio"
            type="number"
            name="estimated-beans-to-coffee-ratio"
            placeholder="10"
            className="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={estimatedBeansToCoffeeRatio}
          />
          <label for="estimated-bean-value-in-wei" className="block ml-3 mt-2 text-xs font-semibold text-gray-600">
            Estimated bean value in wei {' '}
            <p className='inline'>
              <a className='hover:underline font-normal text-blue-400' href='https://www.coingecko.com/en/coins/ethereum' target='_blank'>
                {`(Note: 10^18 WEI ➡️ 1 ETH and 1 ETH/1 USD = $${etherPrice})`}
              </a>
            </p>
          </label>
          <input
            id="estimated-bean-value-in-wei"
            type="number"
            name="estimated-bean-value-in-wei"
            placeholder={`100000000000000 wei = 0.0001 ETH = $${(etherPrice / 10000).toFixed(5)}`}
            className="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={estimatedBeanValueInWei}
          />
          <label for="supply-chain-transactions-address" className="block ml-3 mt-2 text-xs font-semibold text-gray-600">Contract address of SupplyChainTransactions</label>
          <input
            id="supply-chain-transactions-address"
            type="text"
            name="supply-chain-transactions-address"
            placeholder="0x07bEb9E0586Ea5f88F4b68890EA7..."
            className="block w-full p-3 mt-2 rounded-3xl text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
            onChange={setSupplyChainTransactionsAddress}
          />
          <div className='grid place-items-center'>
            <button
              type="submit"
              className="w-3/4 py-3 mt-6 rounded-3xl  font-normal shadow-lg hover:bg-gray-200 hover:shadow-none"
              onClick={handleDeploy}
            >
              Deploy Manufacturer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})
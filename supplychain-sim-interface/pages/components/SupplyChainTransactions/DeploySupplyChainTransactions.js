import { Modal } from '@material-ui/core'
import React, { useState } from 'react'
import deploySupplyChainTransactions from '../../../lib/ethereum/web3/deploy/deploySupplyChainTransactions'

const DeploySupplyChainTransactions = () => {
  const [ walletProviderDeclined, setWalletProviderDeclined ] = useState(false)

  return (
    <div class="grid mt-12 max-h-screen place-items-center">
      <div class="w-11/12 p-10 bg-white sm:w-auto md:w-auto lg:w-auto">
        <h1 class="text-xl font-semibold text-center">Deploy the SupplyChainTransactions contract</h1>
        <div class='grid place-items-center'>
          <button
            class="w-3/4 py-3 mt-6 rounded-3xl  font-normal shadow-lg hover:bg-gray-200 hover:shadow-none"
            onClick={ deploySupplyChainTransactions }
          >
            Deploy SupplyChainTransactions
          </button>
          { walletProviderDeclined && (
            <Modal>
              <h1>Could not deploy contract because wallet integration was declined.</h1>
            </Modal>
          ) }
        </div>
      </div>
    </div >
  )
}

export default DeploySupplyChainTransactions
import { ethers, Contract, ContractFactory } from 'ethers'
import SupplyChainTransactions from '../../../../../build/contracts/SupplyChainTransactions.json'

import getErrorResponse from '../general'
import { unlockBrowser } from '../connect'


export default async function deploySupplyChainTransactions() {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    const signer = walletProvider.getSigner()

    console.log(
      '\n Attempting to deploy SupplyChainTransactions contract from: ',
      signer.getAddress().then(address => console.log(address))
    )

    const factory = new ContractFactory(
      SupplyChainTransactions.abi,
      SupplyChainTransactions.bytecode,
      signer
    )

    const contract = await factory.deploy()

    const receipt = await contract.deployTransaction.wait()
    console.log(
      '\n Transaction receipt: ',
      '\n \ \ blockHash: ',
      receipt.blockHash,
      '\n \ \ blockNumber: ',
      receipt.blockNumber,
      '\n \ \ confirmations: ',
      receipt.confirmations,
      '\n \ \ contractAddress: ',
      receipt.contractAddress,
      '\n \ \ cumulativeGasUsed: ',
      receipt.cumulativeGasUsed,
      '\n \ \ from: ',
      receipt.from,
      '\n \ \ gasUsed: ',
      receipt.gasUsed,
      '\n \ \ logs: ',
      receipt.logs,
      '\n \ \ transactionHash: ',
      receipt.transactionHash,
      '\n \ \ transactionIndex: ',
      receipt.transactionIndex,
    )
    if (receipt.status === 0) return { error: receipt }

    const { contractAddress } = contract
    console.log('\n SupplyChainTransactions contract deployed at: ', address)

    return {
      receipt: receipt,
      contractAddress: contractAddress,
      ownerWalletAddress: walletAddress
    }
  } catch (err) {
    return {
      ...getErrorResponse(err, 'deploy'),
    }
  }
}
import { ethers, Contract, ContractFactory } from 'ethers'
import Manufacturer from '../../../../../build/contracts/Manufacturer.json'

import getErrorResponse from '../general'
import { unlockBrowser } from '../connect'


export default async function deployManufacturer(
  initialBeanCount,
  estimatedBeansToCoffeeRatio,
  estimatedBeanValueInWei,
  supplyChainTransactionsAddress
) {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    const signer = walletProvider.getSigner()

    console.log(
      '\n Attempting to deploy Manufacturer contract from: ',
      signer.getAddress().then(address => console.log(address))
    )

    const factory = new ContractFactory(
      Manufacturer.abi,
      Manufacturer.bytecode,
      signer
    )

    const contract = await factory.deploy(
      initialBeanCount,
      estimatedBeansToCoffeeRatio,
      estimatedBeanValueInWei,
      supplyChainTransactionsAddress
    )


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
    console.log('\n Manufacturer contract deployed at: ', address)

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
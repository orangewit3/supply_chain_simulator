import { ethers, Contract } from 'ethers'

import CocoaBeanFarmer from '../../../../build/contracts/CocoaBeanFarmer.json'

import { unlockBrowser } from '../web3/connect'
import getErrorResponse from '../web3/general'


/** --------- @dev Transact (Not Payable) Functions --------------------------*/
/**
 * @param {String} beanTxnName 
 * @param {String} beanTxnDescription 
 * @param {Number} beanTxnQuantityToSend 
 * @returns {Event} RETURNS EVENT IN AN ETHEREUM BLOCK
 */
export async function createBeanTransaction(
  beanTxnName,
  beanTxnDescription,
  beanTxnQuantityToSend
) {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    console.log('Checking approval...')

    const signer = walletProvider.getSigner()

    // const walletlessProvider = new ethers.providers.InfuraProvider(
    //   'goerli',
    //   process.env.INFURA_ENDPOINT_KEY
    // )
    const cocoaBeanFarmer = new Contract(
      // This contract saved to environment variable after interacting with app
      process.env.COCOA_BEAN_FARMER_CONTRACT_ADDRESS,
      CocoaBeanFarmer.abi,
      signer
    )

    const cocoaBeanFarmerAddress = await cocoaBeanFarmer.address()

    console.log(`\n CocoaBeanFarmer at ${cocoaBeanFarmerAddress} attempting to create a new bean transaction...`)

    const createBeanTransaction = await cocoaBeanFarmer.createBeanTransaction(
      beanTxnName,
      beanTxnDescription,
      beanTxnQuantityToSend
    )

    const receipt = await createBeanTransaction.deployTransaction().wait()
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
    return {
      receipt: receipt,
      contractAddress: cocoaBeanFarmerAddress,
      ownerWalletAddress: walletAddress
    }
  } catch (err) {
    return {
      ...getErrorResponse(err, 'Error when trying to run createBeanTransaction()'),
    }
  }
}



export async function sendBeanTransaction(
  transactionID,
  recipient
) {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    console.log('Checking approval...')

    const signer = walletProvider.getSigner()

    const cocoaBeanFarmer = new Contract(
      // This contract saved to environment variable after interacting with app
      process.env.COCOA_BEAN_FARMER_CONTRACT_ADDRESS,
      CocoaBeanFarmer.abi,
      signer
    )

    const cocoaBeanFarmerAddress = await cocoaBeanFarmer.address()

    console.log(`\n CocoaBeanFarmer at ${cocoaBeanFarmerAddress} attempting to send bean transaction ${transactionID} to ${recipient}`)

    const sendBeanTransaction = await cocoaBeanFarmer.sendBeanTransaction(
      transactionID,
      recipient
    )

    const receipt = await sendBeanTransaction.deployTransaction.wait()
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
    return {
      receipt: receipt,
      contractAddress: cocoaBeanFarmerAddress,
      ownerWalletAddress: walletAddress
    }
  } catch (err) {
    return {
      ...getErrorResponse(err, 'Error when trying to call sendBeanTransaction()'),
    }
  }
}



/**
 * @param {Number > 0} transactionID 
 * @param {Number} action 
 * @return {Event} ?? maybe ??
 */
export async function addPendingTransaction(
  transactionID,
  action
) {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    console.log('Checking approval...')

    const signer = walletProvider.getSigner()

    const cocoaBeanFarmer = new Contract(
      // This contract saved to environment variable after interacting with app
      process.env.COCOA_BEAN_FARMER_CONTRACT_ADDRESS,
      CocoaBeanFarmer.abi,
      signer
    )

    const cocoaBeanFarmerAddress = await cocoaBeanFarmer.address()

    console.log(`\n CocoaBeanFarmer at ${cocoaBeanFarmerAddress} attempting to add pending transaction: ${transactionID}`)

    const addPendingTransaction = await cocoaBeanFarmer.addPendingTransaction(
      transactionID,
      action
    )

    const receipt = await addPendingTransaction.deployTransaction.wait()
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
    return {
      receipt: receipt,
      contractAddress: cocoaBeanFarmerAddress,
      ownerWalletAddress: walletAddress
    }
  } catch (err) {
    return {
      ...getErrorResponse(err, 'Error when trying to call addPendingTransaction()'),
    }
  }
}


/**
 * @param {Number} transactionID 
 * @returns {}
 */
export async function getTransactionRejectedMsg(transactionID) {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    console.log('Checking approval...')

    const signer = walletProvider.getSigner()

    const cocoaBeanFarmer = new Contract(
      // This contract saved to environment variable after interacting with app
      process.env.COCOA_BEAN_FARMER_CONTRACT_ADDRESS,
      CocoaBeanFarmer.abi,
      walletlessProvider
    )

    const cocoaBeanFarmerAddress = await cocoaBeanFarmer.address()

    console.log(`\n CocoaBeanFarmer at ${cocoaBeanFarmerAddress} attempting to get rejected transaction message: ${transactionID}`)

    const getTransactionRejectedMsg = await cocoaBeanFarmer.addPendingTransaction(
      transactionID
    )

    const receipt = await getTransactionRejectedMsg.deployTransaction.wait()
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
    return {
      receipt: receipt,
      contractAddress: cocoaBeanFarmerAddress,
      ownerWalletAddress: walletAddress
    }
  } catch (err) {
    return {
      ...getErrorResponse(err, 'Error when trying to call getTransactionRejectedMsg()'),
    }
  }
}


/**
 * @param {Number} transactionID 
 */
export async function isTransactionAccepted(transactionID) {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    console.log('Checking approval...')

    const signer = walletProvider.getSigner()

    const cocoaBeanFarmer = new Contract(
      // This contract saved to environment variable after interacting with app
      process.env.COCOA_BEAN_FARMER_CONTRACT_ADDRESS,
      CocoaBeanFarmer.abi,
      walletlessProvider
    )

    const cocoaBeanFarmerAddress = await cocoaBeanFarmer.address()

    console.log(`\n CocoaBeanFarmer at ${cocoaBeanFarmerAddress} attempting to check if transaction ${transactionID} is accepted.`)

    const isTransactionAccepted = await cocoaBeanFarmer.isTransactionAccepted(
      transactionID
    )

    const receipt = await isTransactionAccepted.deployTransaction.wait()
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
    return {
      receipt: receipt,
      contractAddress: cocoaBeanFarmerAddress,
      ownerWalletAddress: walletAddress
    }
  } catch (err) {
    return {
      ...getErrorResponse(err, 'Error when trying to call isTransactionAccepted()'),
    }
  }
}



/**
 * @param {Number} transactionID 
 */
export async function isTransactionRejected(transactionID) {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    console.log('Checking approval...')

    const signer = walletProvider.getSigner()

    const cocoaBeanFarmer = new Contract(
      // This contract saved to environment variable after interacting with app
      process.env.COCOA_BEAN_FARMER_CONTRACT_ADDRESS,
      CocoaBeanFarmer.abi,
      signer
    )

    const cocoaBeanFarmerAddress = await cocoaBeanFarmer.address()

    console.log(`\n CocoaBeanFarmer at ${cocoaBeanFarmerAddress} attempting to check if transaction ${transactionID} is rejected.`)

    const isTransactionRejected = await cocoaBeanFarmer.isTransactionRejected(
      transactionID
    )

    const receipt = await isTransactionRejected.deployTransaction.wait()
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
    return {
      receipt: receipt,
      contractAddress: cocoaBeanFarmerAddress,
      ownerWalletAddress: walletAddress
    }
  } catch (err) {
    return {
      ...getErrorResponse(err, 'Error when trying to call isTransactionRejected()'),
    }
  }
}



export async function reclaimRejectedBeans(transactionID) {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    console.log('Checking approval...')

    const signer = walletProvider.getSigner()

    const cocoaBeanFarmer = new Contract(
      // This contract saved to environment variable after interacting with app
      process.env.COCOA_BEAN_FARMER_CONTRACT_ADDRESS,
      CocoaBeanFarmer.abi,
      signer
    )

    const cocoaBeanFarmerAddress = await cocoaBeanFarmer.address()

    console.log(`\n CocoaBeanFarmer at ${cocoaBeanFarmerAddress} attempting to reclaim beans of rejected transaction: ${transactionID}`)

    const reclaimRejectedBeans = await cocoaBeanFarmer.reclaimRejectedBeans(
      transactionID
    )

    const receipt = await reclaimRejectedBeans.deployTransaction.wait()
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
    return {
      receipt: receipt,
      contractAddress: cocoaBeanFarmerAddress,
      ownerWalletAddress: walletAddress
    }
  } catch (err) {
    return {
      ...getErrorResponse(err, 'Error when trying to call reclaimRejectedBeans()'),
    }
  }
}



/** ------------- @dev Call Functions ----------------------------------------*/
/**
 * @param {Number} transactionID 
 */
export async function beanBalance(transactionID) {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    console.log('Checking approval...')

    const signer = walletProvider.getSigner()

    const cocoaBeanFarmer = new Contract(
      // This contract saved to environment variable after interacting with app
      process.env.COCOA_BEAN_FARMER_CONTRACT_ADDRESS,
      CocoaBeanFarmer.abi,
      signer
    )

    const cocoaBeanFarmerAddress = await cocoaBeanFarmer.address()

    console.log(`\n Attempting to get bean balance of CocoaBeanFarmer at ${cocoaBeanFarmerAddress}`)

    const beanBalance = await cocoaBeanFarmer.beanBalance(
      transactionID
    )

    // const receipt = await beanBalance.deployTransaction.wait()
    // console.log(
    //   '\n Transaction receipt: ',
    //   '\n \ \ blockHash: ',
    //   receipt.blockHash,
    //   '\n \ \ blockNumber: ',
    //   receipt.blockNumber,
    //   '\n \ \ confirmations: ',
    //   receipt.confirmations,
    //   '\n \ \ contractAddress: ',
    //   receipt.contractAddress,
    //   '\n \ \ cumulativeGasUsed: ',
    //   receipt.cumulativeGasUsed,
    //   '\n \ \ from: ',
    //   receipt.from,
    //   '\n \ \ gasUsed: ',
    //   receipt.gasUsed,
    //   '\n \ \ logs: ',
    //   receipt.logs,
    //   '\n \ \ transactionHash: ',
    //   receipt.transactionHash,
    //   '\n \ \ transactionIndex: ',
    //   receipt.transactionIndex,
    // )


    /**
     * @dev 
     * @todo NEED TO RETURN BEAN BALANCE
     */
    if (receipt.status === 0) return { error: receipt }
    return {
      receipt: receipt,
      contractAddress: cocoaBeanFarmerAddress,
      ownerWalletAddress: walletAddress
    }
  } catch (err) {
    return {
      ...getErrorResponse(err, 'Error when trying to call beanBalance()'),
    }
  }
}



export async function etherBalance() {
  try {
    const { walletAddress, error, walletProvider } = await unlockBrowser({
      debug: true,
    })

    console.log('Checking approval...')

    const signer = walletProvider.getSigner()

    const cocoaBeanFarmer = new Contract(
      // This contract saved to environment variable after interacting with app
      process.env.COCOA_BEAN_FARMER_CONTRACT_ADDRESS,
      CocoaBeanFarmer.abi,
      signer
    )

    const cocoaBeanFarmerAddress = await cocoaBeanFarmer.address()

    console.log(`\n Attempting to get ether balance of CocoaBeanFarmer at ${cocoaBeanFarmerAddress}`)

    const etherBalance = await cocoaBeanFarmer.etherBalance(
      transactionID
    )

    // const receipt = await etherBalance.deployTransaction.wait()
    // console.log(
    //   '\n Transaction receipt: ',
    //   '\n \ \ blockHash: ',
    //   receipt.blockHash,
    //   '\n \ \ blockNumber: ',
    //   receipt.blockNumber,
    //   '\n \ \ confirmations: ',
    //   receipt.confirmations,
    //   '\n \ \ contractAddress: ',
    //   receipt.contractAddress,
    //   '\n \ \ cumulativeGasUsed: ',
    //   receipt.cumulativeGasUsed,
    //   '\n \ \ from: ',
    //   receipt.from,
    //   '\n \ \ gasUsed: ',
    //   receipt.gasUsed,
    //   '\n \ \ logs: ',
    //   receipt.logs,
    //   '\n \ \ transactionHash: ',
    //   receipt.transactionHash,
    //   '\n \ \ transactionIndex: ',
    //   receipt.transactionIndex,
    // )


    /**
     * @dev 
     * @todo NEED TO RETURN ETHER BALANCE
     */
    if (receipt.status === 0) return { error: receipt }
    return {
      receipt: receipt,
      contractAddress: cocoaBeanFarmerAddress,
      ownerWalletAddress: walletAddress
    }
  } catch (err) {
    return {
      ...getErrorResponse(err, 'Error when trying to call reclaimRejectedBeans()'),
    }
  }
}
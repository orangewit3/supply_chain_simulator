import { ethers, Contract } from 'ethers'
import CocoaBeanFarmer from '../../../../../build/contracts/CocoaBeanFarmer.json'


export default async function api() {
  const walletlessProvider = new ethers.providers.InfuraProvider(
    'goerli',
    process.env.INFURA_ENDPOINT_KEY
  )

  const contract = new Contract(
    process.env.COCOA_BEAN_FARMER_CONTRACT_ADDRESS,
    CocoaBeanFarmer.abi,
    walletlessProvider
  )

  return contract
}


/*
const instance = () => {
  const contract = new web3.eth.Contract(
    CocoaBeanFarmer.abi,
    // Harded code for demo
    "0xcaDbE04877927d4450335FDbB4b2EA2018883cD2",
  )

  return contract

  // const addresses = await web3.eth.getAccounts()

  // await contract.methods.emitEvent(
  //   "test event!"
  // ).send({
  //   from: addresses[ 0 ]
  // })

  // contract.events.BeanTransaction({
  //   fromBlock: 0
  // }).on('bean transaction data', event => console.log(event))

}

export default instance
*/
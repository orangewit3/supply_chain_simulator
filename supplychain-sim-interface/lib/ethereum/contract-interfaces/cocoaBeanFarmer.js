import web3 from '../ethereum/web3'
import CocoaBeanFarmer from '../../../build/contracts/CocoaBeanFarmer.json'


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
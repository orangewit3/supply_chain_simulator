import web3 from '../web3'
import Manufacturer from '../../../../build/contracts/Manufacturer.json'


const instance = () => {
  const contract = new web3.eth.Contract(
    Manufacturer.abi,
    // Harded code for demo
    "0xEC64eb846C1c46E8dC01BD3B14663A034D4F34A8",
  )

  return contract
}

export default instance
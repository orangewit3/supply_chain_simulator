import web3 from '../../pages/api/ethereum/web3'
import Manufacturer from '../../../build/contracts/Manufacturer.json'

export default address => {
  return new web3.eth.Contract(Manufacturer.abi, address)
}
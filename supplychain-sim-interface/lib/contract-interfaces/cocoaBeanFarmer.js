import web3 from '../../pages/api/ethereum/web3'
import CocoaBeanFarmer from '../../../build/contracts/CocoaBeanFarmer.json'

async function useSupplyChainTransactionsContractAddress() {
  const [ address, setAddress ] = useState([])

  useEffect(() => {
    fetch('../deploy')
      .then(address => {
        setAddress(address)
      })
  }, [])

  return address
}

const init = async () => {
  const contract = new web3.eth.Contract(
    CocoaBeanFarmer.abi,

    useSupplyChainTransactionsContractAddress(),
  )

  const addresses = await web3.eth.getAccounts()

  await contract.methods.emitEvent(
    "test event!"
  ).send({
    from: addresses[ 0 ]
  })

  contract.events.BeanTransaction({
    fromBlock: 0
  }).on('bean transaction data', event => console.log(event))
}

export default init
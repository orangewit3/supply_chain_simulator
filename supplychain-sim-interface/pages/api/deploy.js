const { ethers } = require('ethers')
const SupplyChainTransactions = require('../../../build/contracts/SupplyChainTransactions.json')
const CocoaBeanFarmer = require('../../../build/contracts/CocoaBeanFarmer.json')
const Manufacturer = require('../../../build/contracts/Manufacturer.json')
// const Carrer = require('../../../build/contracts/Carrier.json')

let provider = new ethers.providers.InfuraProvider(
  'goerli',
  process.env.INFURA_ENDPOINT_KEY,
  walletlessProvider
)


export default async function deploy(req, res) {
  const addresses = await web3.eth.getAccounts()

  console.log(
    '\n Attempting to deploy SupplyChainTransactions contract from address: ',
    addresses[ 0 ]
  )

  const supplyChainTransactionsContract = await new web3.eth.Contract(
    SupplyChainTransactions.abi
  )
    .deploy({ data: SupplyChainTransactions.bytecode })
    .send({ gas: '1500000', from: addresses[ 0 ] })

  console.log(`
    SupplyChainsTransactions deployed to: 
    ${supplyChainTransactionsContract.options.address} \n`
  )

  console.log(
    'Attempting to deploy CocoaBeanFarmer contract from address: ',
    addresses[ 0 ]
  )

  const cocoaBeanFarmerContract = await new web3.eth.Contract(
    CocoaBeanFarmer.abi
  )
    .deploy({
      data: CocoaBeanFarmer.bytecode,
      // Set `initialQuantity` = 100
      arguments: [
        100,
        supplyChainTransactionsContract.options.address
      ]
    })
    .send({ gas: '1500000', from: addresses[ 0 ] })

  console.log(`
    CocoaBeanFarmer contract deployed to: 
    ${cocoaBeanFarmerContract.options.address} \n`
  )

  console.log(
    'Attempting to deploy Manufacturer contract from address: ',
    addresses[ 0 ]
  )

  const manufacturerContract = await new web3.eth.Contract(
    Manufacturer.abi
  )
    .deploy({
      data: Manufacturer.bytecode,
      // Set `initialBeanCount` = 100
      // Set `estimatedBeansToCoffeeRatio` = 1
      // Set `estimatedBeanValueInWei` = 1
      arguments: [
        100,
        1,
        1,
        supplyChainTransactionsContract.options.address
      ]
    }).send({ gas: '1500000', from: addresses[ 0 ] })

  console.log(`
    Manufacturer contract deployed to: 
    ${manufacturerContract.options.address} \n`
  )

  console.log(
    'Attempting to deploy Carrier contract from address: ',
    addresses[ 0 ]
  )

  const carrierContract = await new web3.eth.Contract(
    Carrer.abi
  )
    .deploy({
      data: Carrer.bytecode,
      // Set `maxCapacityPerTransit` = 10
      arguments: [
        10,
        supplyChainTransactionsContract.options.address
      ]
    }).send({ gas: '1500000', from: addresses[ 0 ] })

  console.log(`\n 
    Carrier deployed to: 
    ${carrierContract.options.address} \n`
  )

  // Hard coded the addresses of these for the demo only
  res.send([
    cocoaBeanFarmerContract.options.address,
    manufacturerContract.options.address
  ])
}
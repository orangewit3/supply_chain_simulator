const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledSupplyChainTransactions = require('../../../../build/contracts/SupplyChainTransactions.json')
const compiledCocoaBeanFarmer = require('../../../../build/contracts/CocoaBeanFarmer.json.json')
const compiledManufacturer = require('../../../../build/contracts/Manufacturer.json.json')
const compiledCarrier = require('../../../../build/contracts/Carrier.json.json')

console.log(process.env.INFURA_ENDPOINT)

let provider = new HDWalletProvider({
  // HDWalletProvider documentation (for more info): 
  // https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider
  mnemonic: process.env.WALLET_MNEMONIC,
  providerOrUrl: process.env.INFURA_ENDPOINT,
})

const web3 = new Web3(provider)

export default async function deploy(req, res) {
  const addresses = await web3.eth.getAccounts()

  const supplyChainTransactionsContract = await new web3.eth.Contract(
    compiledSupplyChainTransactions.abi
  )
    .deploy({ data: compiledSupplyChainTransactions.bytecode })
    .send({ gas: '1500000', from: addresses[ 0 ] })

  const cocoaBeanFarmerContract = await new web3.eth.Contract(
    compiledCocoaBeanFarmer.abi
  )
    .deploy({
      data: compiledCocoaBeanFarmer.bytecode,
      // Set `initialQuantity` = 100
      arguments: [ 100 ]
    })
    .send({ gas: '1500000', from: addresses[ 1 ] })

  const manufacturerContract = await new web3.eth.Contract(
    compiledManufacturer.abi
  )
    .deploy({
      data: compiledManufacturer.bytecode,
      // Set `initialBeanCount` = 100
      // Set `estimatedBeansToCoffeeRatio` = 1
      // Set `estimatedBeanValueInWei` = 1
      arguments: [ 100, 1, 1 ]
    })

  const carrierContract = await new web3.eth.Contract(
    compiledCarrier.abi
  )
    .deploy({
      data: compiledCarrier.bytecode,
      // Set `maxCapacityPerTransit` = 10
      arguments: [ 10 ]
    })

  let cocoaBeanFarmerContractAddress = cocoaBeanFarmerContract.options.address
  let manufacturerContractAddress = manufacturerContract.options.address
  let carrierContractAddress = carrierContract.options.address

  res.send([
    cocoaBeanFarmerContractAddress,
    manufacturerContractAddress,
    carrierContractAddress
  ])
}
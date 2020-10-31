/**
 * @dev 
 * One test file for all contracts in `supplyChain.test.js`
 */
const assert = require('assert')
const ganache = require("ganache-core")
const Web3 = require('web3')
// Making an instance of Web3
const web3 = new Web3(ganache.provider())

const compiledCocoaBeanFarmer = require('../../build/contracts/cocoBeanFarmer.json')
const compiledManufacturer = require('../../build/contracts/manufacturer.json')
const compiledSupplyChainNode = require('../../build/contracts/supplyChainNode.json')
const compiledSupplyChainTransactions = require('../../build/contracts/SupplyChainTransactions.json')

let accounts,
  cocoBeanFarmer,
  manufacturer,
  supplyChain,
  supplyChainAddress,
  SupplyChainTransactions


/**
 * @todo 
 * Write tests for the `cocoaBeanFarmer.json` ABI
 */
beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  factory = await new web3.eth.Contract(JSON.parse(compiledCocoaBeanFarmer.interface))
    .deploy({ data: compiledCocoaBeanFarmer.bytecode })
    .send({ from: accounts[ 0 ], gas: '1000000' })

  await factory.methods.beanBalance()
})
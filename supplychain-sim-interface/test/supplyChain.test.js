/**
 * @dev
 * One test file for all contracts in `supplyChain.test.js`
 */
const assert = require('assert')
const ganache = require('ganache-core')
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

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  SupplyChainTransactions =
    await new web3.eth.Contract(compiledSupplyChainTransactions.abi)
      .deploy({ data: compiledSupplyChainTransactions.bytecode })
      .send({ from: accounts[ 0 ], gas: 1500000, gasPrice: '300000000' })

  cocoBeanFarmer = await new web3.eth.Contract(compiledCocoaBeanFarmer.abi)
    .deploy({
      data: compiledCocoaBeanFarmer.bytecode,
      arguments: [100, SupplyChainTransactions.options.address]
    })
    .send({ from: accounts[ 0 ], gas: 1500000, gasPrice: '30000000000' })
})

describe('Cocoa Bean Farmer', () => {
  it('can get beans', async () => {
    assert.equal(100, (await cocoBeanFarmer.methods.beanBalance().call()))
  })

  it('can claim beans', async () => {
    await cocoBeanFarmer.methods.claimBeans(15).send({ from: accounts[ 0 ] })
    assert.equal(115, (await cocoBeanFarmer.methods.beanBalance().call()))
  })

  it('can get current balance', async () => {
    assert.equal(0, (await cocoBeanFarmer.methods.etherBalance().call()))
  })

  it('can accept ether', async () => {
    let receipt = await web3.eth.sendTransaction({
      from: accounts[ 1 ],
      to: cocoBeanFarmer.options.address,
      value: web3.utils.toWei('1', 'ether')
    })
    assert(receipt.status)
    assert.equal(web3.utils.toWei('1', 'ether'), (await cocoBeanFarmer.methods.etherBalance().call()))
  })
})
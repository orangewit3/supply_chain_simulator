/**
 * @dev
 * One test file for all contracts in `supplyChain.test.js`
 */
const assert = require('assert')
const ganache = require('ganache-core')
const truffleAssert = require('truffle-assertions')
const Web3 = require('web3')
// Making an instance of Web3
const web3 = new Web3(ganache.provider())

const compiledSupplyChainTransactions = require('../../build/contracts/SupplyChainTransactions.json')
const compiledSupplyChainNode = require('../../build/contracts/supplyChainNode.json')
const compiledManufacturer = require('../../build/contracts/Manufacturer.json')
const compiledCocoaBeanFarmer = require('../../build/contracts/CocoaBeanFarmer.json')

let accounts,
  CocoaBeanFarmer,
  Manufacturer,
  SupplyChainTransactions

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  SupplyChainTransactions =
    await new web3.eth.Contract(compiledSupplyChainTransactions.abi)
      .deploy({ data: compiledSupplyChainTransactions.bytecode })
      .send({ from: accounts[ 0 ], gas: 1500000, gasPrice: '300000000' })

  CocoaBeanFarmer = await new web3.eth.Contract(compiledCocoaBeanFarmer.abi)
    .deploy({
      data: compiledCocoaBeanFarmer.bytecode,
      arguments: [ 100, SupplyChainTransactions.options.address ]
    })
    .send({ from: accounts[ 0 ], gas: 1500000, gasPrice: '30000000000' })
})

describe('Supply Chain Transactions Authorized Creators', () => {
  // note: accounts[ 0 ] is being used to run most methods
  // accounts[ 1 ] is being used as the authorized transaction creator

  it('aborts on adding transactions with unauthorized creators', async () => {
    await truffleAssert.reverts(SupplyChainTransactions.methods
      .addTransaction('example', 'example', 100)
      .send({ from: accounts[ 0 ], gas: 1500000, gasPrice: '30000000000' }))
  })

  it('can add an authorized creator', async () => {
    await SupplyChainTransactions.methods
      .addTransactionCreator(accounts[ 1 ])
      .send({ from: accounts[ 0 ] })
  })

  it('adds transactions and returns their order with authorized creators', async () => {
    await SupplyChainTransactions.methods
      .addTransactionCreator(accounts[ 1 ])
      .send({ from: accounts[ 0 ] })

    await SupplyChainTransactions.methods
      .addTransaction('example', 'example', 100)
      .send({ from: accounts[ 1 ], gas: 1500000, gasPrice: '30000000000' })

    const secondTransactionId = await SupplyChainTransactions.methods
      .addTransaction('second', 'second', 100)
      .call({ from: accounts[ 1 ], gas: 1500000, gasPrice: '30000000000' })

    assert.strictEqual(+secondTransactionId, 1)
  })
})

describe('Supply Chain Transactions Transaction Tests', () => {
  beforeEach(async () => { // this is why this is a separate `describe`
    await SupplyChainTransactions.methods
      .addTransactionCreator(accounts[ 1 ])
      .send({ from: accounts[ 0 ] })

    await SupplyChainTransactions.methods
      .addTransaction('example', 'example', 100)
      .send({ from: accounts[ 1 ], gas: 1500000, gasPrice: '30000000000' })
  })

  it('can accept a transaction', async () => {
    let accepted = await SupplyChainTransactions.methods
      .isTransactionAccepted(0).call()
    assert(!accepted)
    await SupplyChainTransactions.methods.acceptTransaction(0).send({ from: accounts[ 0 ] })
    accepted = await SupplyChainTransactions.methods
      .isTransactionAccepted(0).call()
    assert(accepted)
  })

  it('can reject a transaction with a message', async () => {
    let rejected = await SupplyChainTransactions.methods
      .isTransactionRejected(0).call()
    assert(!rejected)
    await SupplyChainTransactions.methods.rejectTransaction(0, 'your beans suck').send({ from: accounts[ 0 ] })
    rejected = await SupplyChainTransactions.methods
      .isTransactionRejected(0).call()
    assert(rejected)
    const rejectedMsg = await SupplyChainTransactions.methods
      .getTransactionRejectedMsg(0).call()
    assert.strictEqual('your beans suck', rejectedMsg)
  })

  it('can get the transaction name', async () => {
    const name = await SupplyChainTransactions.methods.getTransactionName(0).call()
    assert.strictEqual('example', name)
  })
})

describe('Cocoa Bean Farmer', () => {
  it('can get beans', async () => {
    const beans = await CocoaBeanFarmer.methods.beanBalance().call()
    assert.strictEqual(+beans, 100) // the `+` converts string to number
  })

  it('can claim beans', async () => {
    await CocoaBeanFarmer.methods.claimBeans(15).send({ from: accounts[ 0 ] })
    const beans = await CocoaBeanFarmer.methods.beanBalance().call()
    assert.strictEqual(+beans, 115)
  })

  it('can get current balance', async () => {
    const balance = await CocoaBeanFarmer.methods.etherBalance().call()
    assert.strictEqual(+balance, 0)
  })

  it('can accept ether', async () => {
    const receipt = await web3.eth.sendTransaction({
      from: accounts[ 1 ],
      to: CocoaBeanFarmer.options.address,
      value: web3.utils.toWei('1', 'ether')
    })
    assert(receipt.status)

    const balance = await CocoaBeanFarmer.methods.etherBalance().call()
    assert.strictEqual(balance, web3.utils.toWei('1', 'ether'))
  })
})
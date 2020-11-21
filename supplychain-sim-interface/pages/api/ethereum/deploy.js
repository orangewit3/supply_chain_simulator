const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledSupplyChainTransactions = require('../../../../build/contracts/SupplyChainTransactions.json')

console.log(process.env.INFURA_ENDPOINT)

let provider = new HDWalletProvider({
  // HDWalletProvider documentation (for more info): 
  // https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider
  mnemonic: process.env.WALLET_MNEMONIC,
  providerOrUrl: process.env.INFURA_ENDPOINT,
})

const web3 = new Web3(provider)

async function deploy() {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account ' + accounts[ 0 ])

  const txn = await new web3.eth.Contract(compiledSupplyChainTransactions.abi)
    .deploy({ data: compiledSupplyChainTransactions.bytecode })
    .send({ gas: '1500000', from: accounts[ 0 ] })

  console.log('Contract deployed to', txn.options.address)
}
deploy()
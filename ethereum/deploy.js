const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledSupplyChainTransactions = require('../build/contracts/SupplyChainTransactions.json')

/**
 * @dev
 * Instantiating Web3 provider.
 * 
 * @todo
 * 1) Copy your mnemonic seed phrase from your MetaMask wallet into the 
 * `.env-sample` file. 
 * 2) Make sure to rename `.env-sample` to `.env` so that we're able to import 
 * the appropriate environment variables
 */
let provider = new HDWalletProvider({
  // HDWalletProvider documentation (for more info): 
  // https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider
  mnemonic: /** @todo WALLET_MNEMONIC */,
  providerOrUrl: /** @todo Similar method as above */,
})

const web3 = new Web3(provider)

/**
 * @dev
 * This is a helper function to deploy `compiledSupplyChainTransactions`. 
 * 
 * @todo 
 * 1) Deploy `compiledSupplyChainTransactions`.
 * 2) Deploy all other contracts.
 */
async function deploy() {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account ' + accounts[ 0 ])

  const txn = await new web3.eth.Contract(compiledSupplyChainTransactions.abi)
    .deploy({ data: compiledSupplyChainTransactions.bytecode })
    // Figure out what gas amount you need (easy)
    // You can use https://ethgasstation.info/calculatorTxV.php as a reference
    .send({ gas: '1000000', from: accounts[ 0 ] })

  console.log('Contract deployed to', txn.options.address)
}
deploy()

/**
 * @dev
 * Copy and paste the address of our deployed contract below:
 * <DEPLOYED_CONTRACT>
 *
 * We will use this contract address later in to test our app.
 */

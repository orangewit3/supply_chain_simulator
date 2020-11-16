const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')

/**
@dev
the purpose of HDWalletProvider package is to both connect to some target
network AND unlock an account for use on that network.

In this case we unlocked an account by using our 12 word mneumonic device,
just this mneumonic we were able to unlock and generate the public and
private key and address of our account.

Specified that our provider connect to an infura node
Anytime we want to connect to a real network, and not one that is just
hosted locally on our machine, we have to connect to a real node.

You will see a lot of documentation out there that advises you to use modules
like geth or parity on your local machine to connect to the Ethereum
network.

However, setting either of those up is a real pain in the ass.

So, wherever possible, it is recommended to ues infura because it is easy
and straightforward to use and does not require you to host really
expensive nodes on your local machine.
*/
let provider = new HDWalletProvider({
  providerOrUrl: 'http://localhost:8545'
})

// taking our provider, passing to the 'Web3()' constructor and getting out an
// instance of web3
const web3 = new Web3(provider)

// just a little helper function to let us use async/await
const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[ 0 ])

  // Doing JSON parsing but of the 'compiledFactory.interface'
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[ 0 ] })

  console.log('Contract deployed to', result.options.address)
}
deploy()

/**
 * @dev
 * Address of our deployed contract:
 * 
 */

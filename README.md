# supply_chain_simulator
Supply chain simulator for Gies Disruption Lab at University of Illinois at Urbana-Champaign.

## Truffle and Ganache
We'll be using the popular `truffle` library, an extensive smart contract testing and development framework.

More importantly, we'll use Truffle to compile our `.sol` contracts, then use the compiled ABIs for our frontend.

### Install
Unfortunately, we forced to install this library globally:
```bash
npm i -g truffle
```

### Compiling contracts
There's some a priori setup must be done to change the version of `truffle` to match our Solidity file. For the sake of simplicity, this has been done for you (see `truffle-config.js`), but if you want to learn more, you can read the library's ["Compiler configuration" documentation](https://www.trufflesuite.com/docs/truffle/reference/configuration#compiler-configuration).

After installing `truffle` globally, we can compile contracts by running this command in the project's root directory:
```bash
truffle compile
```

The above command compiles all Solidity files located under `./contracts/` to an ABI format ([in-depth details here](https://solidity.readthedocs.io/en/v0.7.4/abi-spec.html#json)) _per contract_. The ABIs are then stored in `./build/contracts/`A contract's ABI is a giant list of JSON objects that contain all the relevant contract information that you'd need to query. 

Thus, we on the client/frontend, we use the [web3.js](https://web3js.readthedocs.io/) library to interface to with compiled ABI.

### Ganache CLI
Ganache is another tool of TruffleSuite that simulates the Ethereum blockchain for testing/dev purposes.

However, we'll be making modest use of its features, primarily, for interfacing with it's web3 provider tool.

Also, make sure to install the ganache-cli globally:
```bash
npm install -g ganache-cli
```

##### Now you're ready to move on to the developing the UI in `supplychain-sim-interface`.
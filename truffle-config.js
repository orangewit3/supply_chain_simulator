module.exports = {
  compilers: {
    solc: {
      version: "0.4.26", // A version or constraint - Ex. "^0.5.0"
      // Can also be set to "native" to use a native solc
      docker: false, // Use a version obtained through docker
      parser: "solcjs",  // Leverages solc-js purely for speedy parsing
      // settings: {
      //   optimizer: {
      //     enabled: false,
      //     runs: 10   // Optimize for how many times you intend to run the code
      //   },
      //   evmVersion: "petersburg" // Default: "petersburg"
      // }
    }
  },
  networks: {
    development: {
      provider: () =>
        new HDWalletProvider({
          providerOrUrl: /** @todo Use the right environment variable here */,
          numberOfAddresses: 1,
          shareNonce: true,
          derivationPath: "m/44'/1'/0'/0/"
        }),
    },
    /** @dev We may not end up using this */
    rinkeby: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          providerOrUrl: /** @todo Use the right environment variable here */,
          numberOfAddresses: 1,
          shareNonce: true,
          derivationPath: "m/44'/1'/0'/0/"
        }),
      network_id: '3',
    }
  }
}
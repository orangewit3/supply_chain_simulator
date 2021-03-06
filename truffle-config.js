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
      //   evmVersion: "petersburga // Default: "petersburg"
      // }
    }
  }
}
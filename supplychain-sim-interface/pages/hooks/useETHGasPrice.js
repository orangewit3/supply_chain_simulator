import { useEffect, useState } from 'react'

/**
 * @dev
 * @todo This needs to update in real-time to the user
 */
export const useETHGasPrice = () => {
  const [ ethGasPrice, setETHGasPrice ] = useState([])
  const [ loadingETHGasPrice, setLoadingETHGasPrice ] = useState(true)
  const [ ethGasPriceError, setETHGasPriceError ] = useState()

  async function getETHGasPrice() {
    try {
      setLoadingETHGasPrice(true)
      const res = await fetch('api/getETHGasPrice')
      const json = await res.json()
      setETHGasPrice(json)
    } catch (error) {
      setETHGasPrice(error)
    } finally {
      setLoadingETHGasPrice(false)
    }
  }

  useEffect(() => {
    getETHGasPrice()
  }, [])

  /**
   * @dev
   * @todo The line that follows is very likely redundant due to the error check
   * in the API call itself in `pages/api/`
   */
  if (ethGasPriceError) return "Error in retrieving current ETH gas price from ETH Gas Station"

  return loadingETHGasPrice ? "Loading ETH gas price...." : ethGasPrice
}
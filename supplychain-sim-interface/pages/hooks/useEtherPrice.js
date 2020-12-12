import { useEffect, useState } from 'react'


export const useEtherPrice = () => {
  const [ etherPrice, setEtherPrice ] = useState([])
  const [ loadingPrice, setLoadingPrice ] = useState(true)
  const [ priceError, setPriceError ] = useState()

  async function getPrice() {
    try {
      setLoadingPrice(true)
      const res = await fetch('api/getEtherPrice')
      const json = await res.json()
      setEtherPrice(json.ethereum.usd)
    } catch (error) {
      setPriceError(error)
    } finally {
      setLoadingPrice(false)
    }
  }

  useEffect(() => {
    getPrice()
  }, [])

  /**
   * @dev
   * @todo The line that follows is very likely redundant due to the error check
   * in the API call itself in `pages/api/`
   */
  if (priceError) return "Error in retrieving current price from CoinGecko"

  return loadingPrice ? "Loading ETH price...." : etherPrice
}
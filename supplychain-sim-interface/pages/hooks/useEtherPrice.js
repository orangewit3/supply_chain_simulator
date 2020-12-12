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

  if (priceError) return "Error in retrieving current price from CoinGecko"

  return loadingPrice ? "Loading ETH price...." : etherPrice
}
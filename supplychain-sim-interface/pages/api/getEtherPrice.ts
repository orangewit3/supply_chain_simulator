const coinGeckoRequestUrl = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_last_updated_at=true"


/**
 * @dev
 * @todo This needs to update in real-time to the user
 */
export default async function getEtherPrice(req, res) {
  const resp = await fetch(coinGeckoRequestUrl)
  const json = await resp.json()

  if (!json) {
    return res.status(200).send(
      "Error in getting ETH price from CoinGecko"
    )
  }

  res.status(200).send(json)
}
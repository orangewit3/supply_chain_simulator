const coinGeckoRequestUrl = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_last_updated_at=true"


export default async function getEtherPrice(req, res) {
  const etherPrice = await fetch(coinGeckoRequestUrl)
    .then(res => res.json())
    .then(json => {
      return json
    })

  if (!etherPrice) {
    return res.status(200).send(
      "Error in getting ETH price from CoinGecko"
    )
  }

  res.status(200).send(etherPrice)
}
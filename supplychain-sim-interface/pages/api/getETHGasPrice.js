const gasStationEndpoint = "https://ethgasstation.info/api/ethgasAPI.json?api-key=2b20b216691d35e897020f2cd722cd2416727a65d0a69bd4cc2780db588d"


export default async function getETHGasPrice(req, res) {
  const resp = await fetch(gasStationEndpoint)
  const json = await resp.json()

  if (!json) {
    return res.status(200).send(
      "Error in getting ETH gas price from ETH Gas Station"
    )
  }

  res.status(200).send(json)
}
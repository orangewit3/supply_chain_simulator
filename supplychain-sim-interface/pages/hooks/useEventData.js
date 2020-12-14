import { useState, useEffect } from 'react'
import { useActiveWeb3React } from '../hooks'
import { useCocoaBeanFarmerContract } from '../hooks/useContract'
import { ethers } from 'ethers'
import { abi as COCOA_BEAN_FARMER_ABI } from '../../../build/contracts/CocoaBeanFarmer.json'


/**
 * Need new bean transaction events to get description data emitted from
 * new bean transaction event.
 */
export function useDataFromEventLogs() {
  const { library } = useActiveWeb3React()
  const [ formattedEvents, setFormattedEvents ] = useState()
  const ccbfContract = useCocoaBeanFarmerContract()

  // create filter for these specific events
  const filter = {
    ...ccbfContract?.filters?.[ 'NewBeanTransaction' ](),
    fromBlock: 0, toBlock: 'latest'
  }

  const eventParser = new ethers.utils.Interface(COCOA_BEAN_FARMER_ABI)

  useEffect(() => {
    async function fetchEventData() {
      /**
       * @dev
       * @todo DESTRUCTURE HERE!
       */
      const pastEvents = await library?.getLogs(filter)
      // reverse events to get them from newest to oldest
      const formattedEventData = pastEvents?.map(event => {
        const eventParsed = eventParser.parseLog(event).args

        return {
          description: eventParsed.description,
          details: eventParsed.targets.map((target, i) => {
            const signature = eventParsed.signatures[ i ]
            const [ name, types ] = signature.substr(
              0,
              signature.length - 1
            ).split('(')

            const calldata = eventParsed.calldatas[ i ]
            const decoded = utils.defaultAbiCoder.decode(
              types.split(','),
              calldata
            )

            return {
              target,
              functionSig: name,
              callData: decoded.join(', ')
            }
          })
        }
      }).reverse()

      setFormattedEvents(formattedEventData)
    }

    if (!formattedEvents) {
      fetchEventData()
    }
  }, [ eventParser, filter, library, formattedEvents ])

  return formattedEvents
}
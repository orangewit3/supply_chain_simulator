import React, { useState } from 'react'
import { useETHGasPrice } from '../../../hooks/useETHGasPrice'
import ETHGasTable from './ETHGasTable'

import ReactTooltip from 'react-tooltip'


const ETHGasCard = () => {
  const ethGasPriceObject: any = useETHGasPrice()
  const fastETHGasPrice = ethGasPriceObject.fast / 10
  const fastestETHGasPrice = ethGasPriceObject.fastest / 10
  const safeLowETHGasPrice = ethGasPriceObject.safeLow / 10
  const averageETHGasPrice = ethGasPriceObject.average / 10

  const avgETHGasPriceWait = ethGasPriceObject.avgWait
  const fastETHGasPriceWait = ethGasPriceObject.fastWait
  const fastestETHGasPriceWait = ethGasPriceObject.fastestWait
  const safeLowETHGasPriceWait = ethGasPriceObject.safeLowWait

  const ethBlockTime = ethGasPriceObject.block_time
  // console.log(ethGasPriceObject)

  return (
    <div class="grid mt-12 max-h-screen place-items-center">
      <div class="w-11/12 py-5 sm:w-auto md:w-auto lg:w-auto">
        <div class='text-center text-lg'>
          <a
            class='hover:underline hover:text-blue-400'
            href='https://ethgasstation.info/'
            target='_blank'
          >
            Current ETH gas prices
          </a>
          <a class='inline absolute mx-1' data-tip='' data-for='eth-gas-station'>
            <img
              src='./tooltip-icon.png'
              width='13'
            />
          </a>
          <ReactTooltip id='eth-gas-station' effect='solid' type='dark'>
            <span>Gas price info taken from ETH Gas Station</span>
          </ReactTooltip>
        </div>
        <div class='flex my-5 mx-3'>
          <ETHGasTable
            fastGasPrice={ fastETHGasPrice }
            fastestGasPrice={ fastestETHGasPrice }
            safeLowGasPrice={ safeLowETHGasPrice }
            averageGasPrice={ averageETHGasPrice }
            avgGasWait={ avgETHGasPriceWait }
            fastGasWait={ fastETHGasPriceWait }
            fastestGasWait={ fastestETHGasPriceWait }
            safeLowGasWait={ safeLowETHGasPriceWait }
            blockTime={ ethBlockTime }
          />
        </div>
      </div>
    </div >
  )
}

export default ETHGasCard
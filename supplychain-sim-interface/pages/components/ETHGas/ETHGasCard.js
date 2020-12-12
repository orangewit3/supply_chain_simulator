import React, { useState } from 'react'
import { useETHGasPrice } from '../../hooks/useETHGasPrice'
import ETHGasTable from './ETHGasTable'

import ReactTooltip from 'react-tooltip'


const ETHGasCard = () => {
  const ethGasPriceObject = useETHGasPrice()
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
      <div class="w-11/12 py-5 bg-gray-200 sm:w-auto md:w-auto lg:w-auto shadow-lg rounded-3xl">
        <div class='text-center text-lg'>
          <a
            class='hover:underline hover:text-blue-400'
            href='https://ethgasstation.info/'
            target='_blank'
          >
            Current ETH gas prices
          </a>
          <a class='inline absolute mx-1' data-tip data-form='eth-gas-station'>
            <img
              // class='inline absolute mx-1'
              src='./tooltip-icon.png'
              width='13'
            />
          </a>
          <ReactTooltip id='eth-gas-station' place='right' effect='solid'>
            <span>Gas price info taken from ETH Gas Station</span>
          </ReactTooltip>
        </div>
        <div class='grid my-5 mx-3'>
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
import React from 'react'


export default function ETHGasTable({
  fastGasPrice,
  fastestGasPrice,
  safeLowGasPrice,
  averageGasPrice,
  avgGasWait,
  fastGasWait,
  fastestGasWait,
  safeLowGasWait,
  blockTime
}) {

  /**
   * @dev
   * @todo Table responsiveness to window size needs to be refactored to support
   * mobile devices
   */
  return (
    <table class="w-full flex flex-row flex-no-wrap overflow-hidden rounded-3xl shadow-lg">
      <thead class="">
        <tr class="bg-gray-800 flex flex-col flex-no-wrap sm:table-row rounded-l-3xl ">
          <th class="py-2 text-gray-300">Speed</th>
          <th class="py-2 text-gray-300">Price (Gwei)</th>
          <th class="py-2 text-gray-300">Block time</th>
          <th class="py-2 text-gray-300">Est. Wait (min.)</th>
        </tr>
        <tbody class="bg-gray-200 flex-1 sm:flex-none">
          <tr class="bg-white border-4 border-gray-200">
            <td class='ml-2 font-semibold'>Fast</td>
            <td class="px-16 py-2">{ fastGasPrice + " Gwei" }
            </td>
            <td class="px-16 py-2">{ blockTime }
            </td>

            <td class="px-16 py-2">{ fastGasWait + " min" }
            </td>
          </tr>
          <tr class="bg-white border-4 border-gray-200">
            <td class="ml-2 font-semibold">Fastest</td>
            <td class="px-16 py-2">{ fastestGasPrice + " Gwei" }</td>
            <td class="px-16 py-2">{ blockTime }</td>
            <td class="px-16 py-2">{ fastestGasWait + " min" }</td>
          </tr>
          <tr class="bg-white border-4 border-gray-200">
            <td class="ml-2 font-semibold">Safe Slow</td>
            <td class="px-16 py-2">{ safeLowGasPrice + " Gwei" }</td>
            <td class="px-16 py-2">{ blockTime }</td>
            <td class="px-16 py-2">{ safeLowGasWait + " min" }</td>
          </tr>
          <tr class="bg-white border-4 border-gray-200">
            <td class="ml-2 font-semibold">Average</td>
            <td class="px-16 py-2">{ averageGasPrice + " Gwei" }</td>
            <td class="px-16 py-2">{ blockTime }</td>
            <td class="px-16 py-2">{ avgGasWait + " min" }</td>
          </tr>
        </tbody>
      </thead>
    </table>
  )
}
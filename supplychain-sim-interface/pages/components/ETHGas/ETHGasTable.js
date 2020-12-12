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
  return (
    <table class="max-w-1/2 table-fixed rounded-3xl">
      <thead class="justify-between">
        <tr class="bg-gray-800 w-1/2 rounded-3xl">
          <th class="px-5 py-2">
            <span class="text-gray-300">Speed</span>
          </th>
          <th class="px-5 py-2">
            <span class="text-gray-300">Price (Gwei)</span>
          </th>
          <th class="px-5 py-2">
            <span class="text-gray-300">Block time</span>
          </th>

          <th class="px-5 py-2">
            <span class="text-gray-300">Wait (minutes)</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-gray-200">
        <tr class="bg-white border-4 border-gray-200 w-1/2 rounded-3xl">
          <td>
            <span class="text-center ml-2 font-semibold">Fast</span>
          </td>
          <td class="px-16 py-2">
            <span>{ fastGasPrice + " Gwei" }</span>
          </td>
          <td class="px-16 py-2">
            <span>{ blockTime }</span>
          </td>

          <td class="px-16 py-2">
            <span>{ fastGasWait + " min" }</span>
          </td>
        </tr>
        <tr class="bg-white border-4 border-gray-200 w-1/2 rounded-3xl">
          <td>
            <span class="text-center ml-2 font-semibold">Fastest</span>
          </td>
          <td class="px-16 py-2">
            <span>{ fastestGasPrice + " Gwei" }</span>
          </td>
          <td class="px-16 py-2">
            <span>{ blockTime }</span>
          </td>

          <td class="px-16 py-2">
            <span>{ fastestGasWait + " min" }</span>
          </td>
        </tr>
        <tr class="bg-white border-4 border-gray-200 w-1/2 rounded-3xl">

          <td>
            <span class="text-center ml-2 font-semibold">Safe Slow</span>
          </td>
          <td class="px-16 py-2">
            <span>{ safeLowGasPrice + " Gwei" }</span>
          </td>
          <td class="px-16 py-2">
            <span>{ blockTime }</span>
          </td>

          <td class="px-16 py-2">
            <span>{ safeLowGasWait + " min" }</span>
          </td>
        </tr>
        <tr class="bg-white border-4 border-gray-200 w-1/2 rounded-3xl">

          <td>
            <span class="text-center ml-2 font-semibold">Average</span>
          </td>
          <td class="px-16 py-2">
            <span>{ averageGasPrice + " Gwei" }</span>
          </td>
          <td class="px-16 py-2">
            <span>{ blockTime }</span>
          </td>

          <td class="px-16 py-2">
            <span>{ avgGasWait + " min" }</span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import {
  useWeb3React
} from '@web3-react/core'


export function useActiveWeb3React() {
  const context = useWeb3React()
  // console.log(context)
  return context
}

import { useRef } from 'react'

export const useSomeHook = () => {
  const someEvent = useRef(0)
  console.log("Count of some event: ", someEvent.current++)
}
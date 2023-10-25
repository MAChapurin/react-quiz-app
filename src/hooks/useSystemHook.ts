import { MAC_KEYS, WINDOWS_KEYS } from "@/constants"
import { useEffect, useState } from "react"

export const useSystemHook = (handleClick: () => void) => {
  const [system, setSystem] = useState('')

  useEffect(() => {
    const detectSystem = () => {
      if(navigator.platform.indexOf('Mac') == 0)  {
        return MAC_KEYS
      } else if (navigator.platform.indexOf('Win') == 0) {
        return WINDOWS_KEYS
      } else return 'Unknown'
    }

    const detectedSystem = detectSystem()
    setSystem(detectedSystem)
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if(event.keyCode == 13 && !event.altKey) {
        event.preventDefault()
        return
      }

      if(event.keyCode == 13 && event.altKey) {
        handleClick()
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  })

  return system
}

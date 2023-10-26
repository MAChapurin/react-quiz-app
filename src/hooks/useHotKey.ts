import { useState, useEffect } from 'react'
import { HOTKEYS_MAC, HOTKEYS_OTHER, TIP } from '../constants'

export const useHotKey = (onHotkeyPress: () => void) => {
  const [shortcut, setShortcut] = useState('')
  const [tip, setTip] = useState('')

  useEffect(() => {
    const isMac = /Macintosh|Mac OS X/i.test(navigator.userAgent)

    if (isMac) setShortcut(HOTKEYS_MAC)
    else setShortcut(HOTKEYS_OTHER)
    setTip(TIP)
  }, [])

  const handleHotkey = (e: KeyboardEvent) => {
    if ((e.code === 'Enter' && e.altKey) || (e.code === 'Enter' && e.metaKey)) {
      e.preventDefault()
      onHotkeyPress()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleHotkey)
    return () => window.removeEventListener('keydown', handleHotkey)
  }, [onHotkeyPress])

  return { shortcut, tip }
}

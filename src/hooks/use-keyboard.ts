import { useEffect, useRef } from 'react'
import type { GameKeys } from '@/types/game'

export function useKeyboard(onReset: () => void) {
  const keysRef = useRef<GameKeys>({
    up: false,
    down: false,
    left: false,
    right: false
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') keysRef.current.up = true
      if (e.key === 'ArrowDown') keysRef.current.down = true
      if (e.key === 'ArrowLeft') keysRef.current.left = true
      if (e.key === 'ArrowRight') keysRef.current.right = true
      if (e.key === 'r' || e.key === 'R') onReset()
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') keysRef.current.up = false
      if (e.key === 'ArrowDown') keysRef.current.down = false
      if (e.key === 'ArrowLeft') keysRef.current.left = false
      if (e.key === 'ArrowRight') keysRef.current.right = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [onReset])

  return keysRef
}

'use client'

import { forwardRef } from 'react'

interface GameCanvasProps {
  width: number
  height: number
}

export const GameCanvas = forwardRef<HTMLCanvasElement, GameCanvasProps>(
  ({ width, height }, ref) => {
    return (
      <canvas
        ref={ref}
        width={width}
        height={height}
        className="border-4 border-[#ff006e] rounded-lg shadow-2xl shadow-[#ff006e]/50 bg-black"
      />
    )
  }
)

GameCanvas.displayName = 'GameCanvas'

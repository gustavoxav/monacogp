export interface Car {
  x: number
  y: number
  width: number
  height: number
  color: string
  speed: number
  direction: number
  isLeft: boolean
  isRight: boolean
  passed?: boolean
}

export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

export interface Player {
  x: number
  y: number
  width: number
  height: number
  speed: number
  cameraY: number
  color: string
}

export interface GameKeys {
  left: boolean
  right: boolean
}

export type GameState = 'playing' | 'gameOver'

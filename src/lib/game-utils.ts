import type { Car, Particle } from '@/types/game'

export const checkCollision = (
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

export const createParticles = (
  x: number,
  y: number,
  color: string,
  particles: Particle[]
) => {
  for (let i = 0; i < 3; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 1,
      life: 1,
      color
    })
  }
}

export const initializeRacers = (colors: string[], mapHeight: number): Car[] => {
  return colors.map(color => {
    const isLeft = Math.random() > 0.5
    return {
      x: Math.random() * 180 + 110,
      y: Math.random() * mapHeight,
      width: 20,
      height: 35,
      color,
      speed: Math.random() * 0.5 + 0.5,
      direction: Math.random(),
      isLeft,
      isRight: !isLeft
    }
  })
}

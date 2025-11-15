'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { GameCanvas } from './game/game-canvas'
import { GameOverScreen } from './game/game-over-screen'
import { GameRenderer } from './game/game-renderer'
import { useKeyboard } from '@/hooks/use-keyboard'
import { checkCollision, createParticles, initializeRacers } from '@/lib/game-utils'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAP_HEIGHT,
  PLAYER_INITIAL_STATE,
  RACER_COLORS
} from '@/lib/game-constants'
import type { Car, GameState, Particle, Player } from '@/types/game'

const MonacoGPGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<GameState>('playing')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const gameRef = useRef({
    player: { ...PLAYER_INITIAL_STATE } as Player,
    racers: [] as Car[],
    particles: [] as Particle[],
    distance: 0,
    animationId: 0
  })

  const resetGame = () => {
    gameRef.current.player = { ...PLAYER_INITIAL_STATE }
    gameRef.current.distance = 0
    gameRef.current.particles = []
    setScore(0)
    setGameState('playing')
  }

  const keysRef = useKeyboard(resetGame)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const renderer = new GameRenderer(ctx)

    // Initialize racers
    gameRef.current.racers = initializeRacers(RACER_COLORS, MAP_HEIGHT)

    const gameLoop = () => {
      const game = gameRef.current
      const keys = keysRef.current

      if (gameState !== 'playing') return

      renderer.clearCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
      renderer.drawRoad(CANVAS_WIDTH, CANVAS_HEIGHT, game.player.cameraY)

      // Update and draw racers
      game.racers.forEach(racer => {
        racer.y -= 1

        if (racer.y < -MAP_HEIGHT) {
          racer.y = 0
        }

        if (racer.isLeft) {
          racer.x -= racer.speed
        } else if (racer.isRight) {
          racer.x += racer.speed
        }

        if (racer.x > 290) {
          racer.isRight = false
          racer.isLeft = true
        } else if (racer.x < 110) {
          racer.isRight = true
          racer.isLeft = false
        }

        // Draw racer and clones
        ctx.save()
        ctx.translate(0, CANVAS_HEIGHT / 2 - game.player.cameraY)
        renderer.drawCar(racer.x, racer.y, racer.width, racer.height, racer.color)
        renderer.drawCar(racer.x, racer.y + MAP_HEIGHT, racer.width, racer.height, racer.color)
        renderer.drawCar(racer.x, racer.y - MAP_HEIGHT, racer.width, racer.height, racer.color)
        ctx.restore()

        // Check collision with player
        const racerPositions = [
          { x: racer.x, y: racer.y },
          { x: racer.x, y: racer.y + MAP_HEIGHT },
          { x: racer.x, y: racer.y - MAP_HEIGHT }
        ]

        racerPositions.forEach(pos => {
          if (
            checkCollision(
              {
                x: game.player.x - game.player.width / 2,
                y: game.player.y - game.player.height / 2,
                width: game.player.width,
                height: game.player.height
              },
              {
                x: pos.x - racer.width / 2,
                y: pos.y - racer.height / 2,
                width: racer.width,
                height: racer.height
              }
            )
          ) {
            setGameState('gameOver')
            if (game.distance > highScore) {
              setHighScore(Math.floor(game.distance))
            }
          }
        })
      })

      // Update player
      if (keys.up && game.player.speed < 10) {
        game.player.speed += 0.05
      }
      if (keys.down && game.player.speed > 0.1) {
        game.player.speed -= 0.05
      }
      if (keys.left && game.player.x > 110) {
        game.player.x -= 2
      }
      if (keys.right && game.player.x < 290) {
        game.player.x += 2
      }

      game.player.y -= 2
      game.player.cameraY = game.player.y

      if (game.player.y < -MAP_HEIGHT) {
        game.player.y = 0
      }

      // Create speed particles
      if (Math.random() < 0.3) {
        createParticles(
          game.player.x,
          game.player.y + game.player.height / 2,
          game.player.color,
          game.particles
        )
      }

      // Update and draw particles
      ctx.save()
      ctx.translate(0, CANVAS_HEIGHT / 2 - game.player.cameraY)
      game.particles = game.particles.filter(particle => {
        particle.y += particle.vy * game.player.speed
        particle.x += particle.vx
        particle.life -= 0.02

        if (particle.life > 0) {
          renderer.drawParticle(particle)
          return true
        }
        return false
      })
      ctx.restore()

      // Draw player
      ctx.save()
      ctx.translate(0, CANVAS_HEIGHT / 2 - game.player.cameraY)
      renderer.drawCar(
        game.player.x,
        game.player.y,
        game.player.width,
        game.player.height,
        game.player.color,
        true
      )
      ctx.restore()

      // Update distance
      game.distance += game.player.speed / 100
      setScore(Math.floor(game.distance))

      // Draw HUD
      renderer.drawHUD(game.distance, game.player.speed, highScore, CANVAS_WIDTH)

      game.animationId = requestAnimationFrame(gameLoop)
    }

    gameLoop()

    return () => {
      cancelAnimationFrame(gameRef.current.animationId)
    }
  }, [gameState, highScore, keysRef])

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative inline-block">
        <GameCanvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef} />

        {gameState === 'gameOver' && (
          <GameOverScreen score={score} highScore={highScore} onRestart={resetGame} />
        )}
      </div>
    </div>
  )
}

export { MonacoGPGame }

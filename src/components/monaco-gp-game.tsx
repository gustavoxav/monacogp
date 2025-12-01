"use client";

import { useEffect, useRef, useState } from "react";
import { GameCanvas } from "./game/game-canvas";
import { GameOverScreen } from "./game/game-over-screen";
import { PauseScreen } from "./game/pause-screen";
import { ColorSelector } from "./game/color-selector";
import { GameRenderer } from "./game/game-renderer";
import { useKeyboard } from "@/hooks/use-keyboard";
import {
  checkCollision,
  createParticles,
  initializeRacers,
} from "@/lib/game-utils";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAP_HEIGHT,
  PLAYER_INITIAL_STATE,
  RACER_COLORS,
  PLAYER_CAR_COLORS,
  SPEED_INCREMENT,
  BASE_SPEED_KMH,
  KM_CONVERSION_FACTOR,
} from "@/lib/game-constants";
import type { Car, GameState, Particle, Player } from "@/types/game";

const HIGH_SCORE_KEY = "monaco-gp-high-score";

const MonacoGPGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      return saved ? Number.parseFloat(saved) : 0;
    }
    return 0;
  });
  const [playerColor, setPlayerColor] = useState(PLAYER_INITIAL_STATE.color);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const gameRef = useRef({
    player: { ...PLAYER_INITIAL_STATE } as Player,
    racers: [] as Car[],
    particles: [] as Particle[],
    distance: 0,
    animationId: 0,
    carsPassed: 0,
    baseSpeed: 1,
  });

  const resetGame = () => {
    gameRef.current.player = { ...PLAYER_INITIAL_STATE, color: playerColor };
    gameRef.current.distance = 0;
    gameRef.current.particles = [];
    gameRef.current.carsPassed = 0;
    gameRef.current.baseSpeed = 1;
    setScore(0);
    setGameState("playing");
  };

  const handleColorSelect = (color: string) => {
    setPlayerColor(color);
    gameRef.current.player.color = color;
  };

  const handlePause = () => {
    if (gameState === "playing") {
      setGameState("paused");
    }
  };

  const handleResume = () => {
    if (gameState === "paused") {
      setGameState("playing");
    }
  };

  const keysRef = useKeyboard(resetGame);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && gameState === "playing") {
        setGameState("paused");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [gameState]);

  useEffect(() => {
    if (typeof window !== "undefined" && highScore > 0) {
      localStorage.setItem(HIGH_SCORE_KEY, highScore.toString());
    }
  }, [highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setTouchStartX(touch.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (touchStartX === null) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const game = gameRef.current;

      if (deltaX < -10 && game.player.x > 110) {
        game.player.x -= 4;
      } else if (deltaX > 10 && game.player.x < 290) {
        game.player.x += 4;
      }

      setTouchStartX(touch.clientX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setTouchStartX(null);
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStartX]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderer = new GameRenderer(ctx);

    // Initialize racers
    gameRef.current.racers = initializeRacers(RACER_COLORS, MAP_HEIGHT);
    gameRef.current.player.color = playerColor;

    const gameLoop = () => {
      const game = gameRef.current;
      const keys = keysRef.current;

      if (gameState !== "playing") return;

      renderer.clearCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      renderer.drawRoad(CANVAS_WIDTH, CANVAS_HEIGHT, game.player.cameraY);

      // Update and draw racers
      game.racers.forEach((racer) => {
        racer.y -= game.player.speed;

        const racerScreenY = racer.y - game.player.cameraY + CANVAS_HEIGHT / 2;
        const playerScreenY = CANVAS_HEIGHT / 2;

        if (racerScreenY < playerScreenY - 50 && racer.y > -MAP_HEIGHT + 100) {
          if (!racer.passed) {
            racer.passed = true;
            game.carsPassed++;

            game.baseSpeed += SPEED_INCREMENT;
            game.player.speed = game.baseSpeed;
          }
        }

        if (racer.y < -MAP_HEIGHT) {
          racer.y = 0;
          racer.passed = false;
        }

        if (racer.isLeft) {
          racer.x -= racer.speed;
        } else if (racer.isRight) {
          racer.x += racer.speed;
        }

        if (racer.x > 290) {
          racer.isRight = false;
          racer.isLeft = true;
        } else if (racer.x < 110) {
          racer.isRight = true;
          racer.isLeft = false;
        }

        // Draw racer and clones
        ctx.save();
        ctx.translate(0, CANVAS_HEIGHT / 2 - game.player.cameraY);
        renderer.drawCar(
          racer.x,
          racer.y,
          racer.width,
          racer.height,
          racer.color
        );
        renderer.drawCar(
          racer.x,
          racer.y + MAP_HEIGHT,
          racer.width,
          racer.height,
          racer.color
        );
        renderer.drawCar(
          racer.x,
          racer.y - MAP_HEIGHT,
          racer.width,
          racer.height,
          racer.color
        );
        ctx.restore();

        // Check collision with player
        const racerPositions = [
          { x: racer.x, y: racer.y },
          { x: racer.x, y: racer.y + MAP_HEIGHT },
          { x: racer.x, y: racer.y - MAP_HEIGHT },
        ];

        racerPositions.forEach((pos) => {
          if (
            checkCollision(
              {
                x: game.player.x - game.player.width / 2,
                y: game.player.y - game.player.height / 2,
                width: game.player.width,
                height: game.player.height,
              },
              {
                x: pos.x - racer.width / 2,
                y: pos.y - racer.height / 2,
                width: racer.width,
                height: racer.height,
              }
            )
          ) {
            setGameState("gameOver");
            if (game.distance > highScore) {
              setHighScore(Number.parseFloat(game.distance.toFixed(2)));
            }
          }
        });
      });

      if (keys.left && game.player.x > 110) {
        game.player.x -= 2;
      }
      if (keys.right && game.player.x < 290) {
        game.player.x += 2;
      }

      game.player.y -= game.player.speed * 2;
      game.player.cameraY = game.player.y;

      if (game.player.y < -MAP_HEIGHT) {
        game.player.y = 0;
      }

      // Create speed particles
      if (Math.random() < 0.3) {
        createParticles(
          game.player.x,
          game.player.y + game.player.height / 2,
          game.player.color,
          game.particles
        );
      }

      // Update and draw particles
      ctx.save();
      ctx.translate(0, CANVAS_HEIGHT / 2 - game.player.cameraY);
      game.particles = game.particles.filter((particle) => {
        particle.y += particle.vy * game.player.speed;
        particle.x += particle.vx;
        particle.life -= 0.02;

        if (particle.life > 0) {
          renderer.drawParticle(particle);
          return true;
        }
        return false;
      });
      ctx.restore();

      // Draw player
      ctx.save();
      ctx.translate(0, CANVAS_HEIGHT / 2 - game.player.cameraY);
      renderer.drawCar(
        game.player.x,
        game.player.y,
        game.player.width,
        game.player.height,
        game.player.color,
        true
      );
      ctx.restore();

      game.distance += game.player.speed * KM_CONVERSION_FACTOR;
      setScore(Number.parseFloat(game.distance.toFixed(2)));

      const currentSpeedKmh = BASE_SPEED_KMH + (game.player.speed - 1) * 20;

      renderer.drawHUD(
        game.distance,
        currentSpeedKmh,
        highScore,
        game.carsPassed,
        CANVAS_WIDTH
      );

      game.animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(gameRef.current.animationId);
    };
  }, [gameState, highScore, keysRef, playerColor]);

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative inline-block">
        <ColorSelector
          colors={PLAYER_CAR_COLORS}
          selectedColor={playerColor}
          onColorSelect={handleColorSelect}
        />

        <GameCanvas
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          ref={canvasRef}
        />
        {gameState === "playing" && (
          <button
            onClick={handlePause}
            className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-[#ff006e] to-[#fb5607] text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-[#ff006e]/50">
            Pausar
          </button>
        )}

        {gameState === "paused" && <PauseScreen onResume={handleResume} />}

        {gameState === "gameOver" && (
          <GameOverScreen
            score={score}
            highScore={highScore}
            onRestart={resetGame}
          />
        )}
      </div>
    </div>
  );
};

export { MonacoGPGame };

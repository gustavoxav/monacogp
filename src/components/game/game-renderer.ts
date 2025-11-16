import type { Particle } from "@/types/game";
import { MAP_HEIGHT } from "@/lib/game-constants";

export class GameRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  drawCar(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    isPlayer = false
  ) {
    this.ctx.save();

    // Shadow for depth
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    this.ctx.shadowBlur = 10;
    this.ctx.shadowOffsetY = 5;

    // Car body
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - width / 2, y - height / 2, width, height);

    // Windshield
    this.ctx.fillStyle = isPlayer
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(0, 0, 0, 0.4)";
    this.ctx.fillRect(
      x - width / 2 + 3,
      y - height / 2 + 5,
      width - 6,
      height * 0.3
    );

    // Wheels
    this.ctx.fillStyle = "#1a1a1a";
    this.ctx.fillRect(x - width / 2 - 2, y - height / 2 + 5, 3, 8);
    this.ctx.fillRect(x + width / 2 - 1, y - height / 2 + 5, 3, 8);
    this.ctx.fillRect(x - width / 2 - 2, y + height / 2 - 13, 3, 8);
    this.ctx.fillRect(x + width / 2 - 1, y + height / 2 - 13, 3, 8);

    // Highlights
    if (isPlayer) {
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x - width / 2, y - height / 2, width, height);
    }

    this.ctx.restore();
  }

  drawRoad(canvasWidth: number, canvasHeight: number, cameraY: number) {
    this.ctx.save();
    this.ctx.translate(0, canvasHeight / 2 - cameraY);

    // Road base
    this.ctx.fillStyle = "#2a2a3e";
    this.ctx.fillRect(100, -MAP_HEIGHT * 2, 200, MAP_HEIGHT * 3);

    // Road edges with neon effect
    const roadGradientLeft = this.ctx.createLinearGradient(95, 0, 100, 0);
    roadGradientLeft.addColorStop(0, "#ff006e");
    roadGradientLeft.addColorStop(1, "transparent");
    this.ctx.fillStyle = roadGradientLeft;
    this.ctx.fillRect(95, -MAP_HEIGHT * 2, 5, MAP_HEIGHT * 3);

    const roadGradientRight = this.ctx.createLinearGradient(300, 0, 305, 0);
    roadGradientRight.addColorStop(0, "transparent");
    roadGradientRight.addColorStop(1, "#ff006e");
    this.ctx.fillStyle = roadGradientRight;
    this.ctx.fillRect(300, -MAP_HEIGHT * 2, 5, MAP_HEIGHT * 3);

    // Road markings
    this.ctx.strokeStyle = "#ffbe0b";
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([20, 20]);
    const offset = cameraY % 40;
    for (let i = -MAP_HEIGHT * 2; i < MAP_HEIGHT; i += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(200, i - offset);
      this.ctx.lineTo(200, i + 20 - offset);
      this.ctx.stroke();
    }
    this.ctx.setLineDash([]);

    this.ctx.restore();
  }

  drawParticle(particle: Particle) {
    const alpha = Math.floor(particle.life * 255)
      .toString(16)
      .padStart(2, "0");
    this.ctx.fillStyle = `${particle.color}${alpha}`;
    this.ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
  }

  drawHUD(
    distance: number,
    speed: number,
    highScore: number,
    carsPassed: number,
    canvasWidth: number
  ) {
    this.ctx.save();
    this.ctx.shadowColor = "#00f5ff";
    this.ctx.shadowBlur = 20;
    this.ctx.fillStyle = "#00f5ff";
    this.ctx.font = "bold 40px monospace";
    this.ctx.textAlign = "right";
    this.ctx.fillText(`${Math.floor(distance)}m`, canvasWidth - 20, 50);

    this.ctx.font = "bold 16px monospace";
    this.ctx.fillStyle = "#ffbe0b";
    this.ctx.fillText(
      `VELOCIDADE: ${(speed * 10).toFixed(0)}`,
      canvasWidth - 20,
      80
    );

    this.ctx.fillStyle = "#8338ec";
    this.ctx.fillText(`DISTÂNCIA: ${distance.toFixed(0)}`, canvasWidth - 20, 105);

    if (highScore > 0) {
      this.ctx.fillStyle = "#ff006e";
      this.ctx.fillText(`RECORDE: ${highScore}m`, canvasWidth - 20, 130);
    }
    this.ctx.restore();
  }

  clearCanvas(width: number, height: number) {
    this.ctx.fillStyle = "#0a0a1f";
    this.ctx.fillRect(0, 0, width, height);
  }
}

export const MAP_HEIGHT = 800;
export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 600;

export const RACER_COLORS = [
  "#ff006e",
  "#8338ec",
  "#3a86ff",
  "#fb5607",
  "#ffbe0b",
];

export const PLAYER_CAR_COLORS = [
  { name: "Cyan", value: "#00f5ff" },
  { name: "Pink", value: "#ff006e" },
  { name: "Purple", value: "#8338ec" },
  { name: "Blue", value: "#3a86ff" },
  { name: "Orange", value: "#fb5607" },
  { name: "Yellow", value: "#ffbe0b" },
];

export const PLAYER_INITIAL_STATE = {
  x: CANVAS_WIDTH / 2,
  y: MAP_HEIGHT / 2,
  width: 20,
  height: 35,
  speed: 1,
  cameraY: 0,
  color: "#00f5ff",
};

export const SPEED_INCREMENT = 1;
export const CARS_PER_SPEED_UP = 1;

export type Point = {
  x: number;
  y: number;
};

const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x: -1, y: 0 };
const RIGHT = { x: 1, y: 0 };

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export function getDirectionVector(direction: Direction): Point {
  switch (direction) {
    case Direction.UP:
      return UP;
    case Direction.DOWN:
      return DOWN;
    case Direction.LEFT:
      return LEFT;
    case Direction.RIGHT:
      return RIGHT;
  }
}

import { Point, Direction } from "./model";

export function isPointEqual(p1: Point, p2: Point) {
  return p1.x === p2.x && p1.y === p2.y;
}

export function isPointNear(p1: Point, p2: Point, distance: number) {
  console.log(
    "distance",
    Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
  );
  return (
    Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) <= distance
  );
}

export function sumPoints(p1: Point, p2: Point) {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
  };
}

export function getNearPoints(points: Point[], point: Point, distance: number) {
  const result: Point[] = [];

  points.forEach((p) => {
    if (isPointNear(p, point, distance)) {
      result.push(p);
    }
  });

  return result;
}

export function containsNearPoint(
  points: Point[],
  point: Point,
  distance: number
) {
  let result = false;

  points.forEach((p) => {
    if (isPointNear(p, point, distance)) {
      result = true;
    }
  });

  return result;
}

export function containsEqualPoint(points: Point[], point: Point) {
  let result = false;

  points.forEach((p) => {
    if (isPointEqual(p, point)) {
      result = true;
    }
  });

  return result;
}

export function isValidMove(v1: Point, v2: Point) {
  const horizontal = v1.x + v2.x;
  const vertical = v1.y + v2.y;

  return horizontal !== 0 || vertical !== 0;
}

export function isInsideGrid([rows, cols]: [number, number], point: Point) {
  return point.x >= 0 && point.x < cols && point.y >= 0 && point.y < rows;
}

export function isDirectionOpposite(d1: Direction, d2: Direction) {
  switch (d1) {
    case Direction.UP:
      return d2 === Direction.DOWN ? true : false;
    case Direction.LEFT:
      return d2 === Direction.RIGHT ? true : false;
    case Direction.DOWN:
      return d2 === Direction.UP ? true : false;
    case Direction.RIGHT:
      return d2 === Direction.LEFT ? true : false;
  }
}

export function lerp(v0: number, v1: number, t: number) {
  return v0 * (1 - t) + v1 * t;
}

export function getRandomPosition(rows: number, cols: number) {
  return {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
  };
}

export function getRandomColor() {
  const r = Math.floor(Math.random() * 255) + 1;
  const g = Math.floor(Math.random() * 255) + 1;
  const b = Math.floor(Math.random() * 255) + 1;
  return `rgb(${r},${g},${b})`;
}

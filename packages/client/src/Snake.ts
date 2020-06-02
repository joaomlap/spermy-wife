import { Direction, Point, getDirectionVector } from "./model";
import { isPointEqual, isValidMove } from "./helpers";

export class Snake {
  public cells: Point[] = [];

  init = (point: Point) => {
    this.cells.push(point);
  };

  get head() {
    return this.cells[0];
  }

  move = (direction: Direction, ate: boolean) => {
    const directionVector = getDirectionVector(direction);

    const newHead: Point = {
      x: this.head.x + directionVector.x,
      y: this.head.y + directionVector.y,
    };

    this.cells.unshift(newHead);
    !ate && this.cells.pop();
  };
}

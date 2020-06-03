import { Point } from "./model";
import { isPointEqual } from "./helpers";

export class Food {
  public cells: Point[] = [];

  add = (position: Point) => {
    this.cells.push(position);
  };

  remove = (position: Point) => {
    const index = this.cells.findIndex((cell) => isPointEqual(cell, position));
    this.cells.splice(index, 1);
  };
}

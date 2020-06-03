import { Point, Direction, getDirectionVector } from "./model";
import { Snake } from "./Snake";
import { Food } from "./Food";
import { sumPoints, isDirectionOpposite } from "./helpers";
import { SnakeDto } from "./App";

export class Game {
  cols = 64;
  rows = 64;
  currentDirection = Direction.RIGHT;
  snake?: SnakeDto;

  setDirection = (direction: Direction) => {
    if (!isDirectionOpposite(this.currentDirection, direction)) {
      this.currentDirection = direction;
    }
  };

  update = (snake: SnakeDto) => {
    this.snake = snake;
  };

  reset = () => {
    this.currentDirection = Direction.RIGHT;
  };

  next = () => {
    if (this.snake) {
      return sumPoints(
        this.snake.cells[0],
        getDirectionVector(this.currentDirection)
      );
    }
  };
}

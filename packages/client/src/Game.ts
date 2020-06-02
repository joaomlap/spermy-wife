import { Point, Direction, getDirectionVector } from "./model";
import { Snake } from "./Snake";
import { Food } from "./Food";
import {
  isPointEqual,
  sumPoints,
  containsEqualPoint,
  isValidMove,
  isDirectionOpposite,
  isInsideGrid,
} from "./helpers";

export class Game {
  cols = 64;
  rows = 64;
  currentDirection = Direction.RIGHT;
  snake: Snake = new Snake();
  food: Food = new Food();

  setDirection = (direction: Direction) => {
    if (!isDirectionOpposite(this.currentDirection, direction)) {
      this.currentDirection = direction;
    }
  };

  getRandomPosition = () => ({
    x: Math.floor(Math.random() * this.cols),
    y: Math.floor(Math.random() * this.rows),
  });

  willSnakeEat = (nextHead: Point) => {
    return containsEqualPoint(this.food.cells, nextHead);
  };

  willSnakeCrash = (nextHead: Point) => {
    let result = true;

    if (isInsideGrid([this.rows, this.cols], nextHead)) {
      result = containsEqualPoint(this.snake.cells, nextHead);
    }

    return result;
  };

  reset = () => {
    this.currentDirection = Direction.RIGHT;
    this.snake = new Snake();
    this.food = new Food();
  };

  next = () => {
    if (!this.snake.cells.length) {
      this.snake.init({ x: 20, y: 20 });
    }

    const nextHead = sumPoints(
      this.snake.head,
      getDirectionVector(this.currentDirection)
    );

    const snakeWillEat = this.willSnakeEat(nextHead);
    const snakeWillCrash = this.willSnakeCrash(nextHead);

    !this.food.cells.length && this.food.add(this.getRandomPosition());

    if (snakeWillCrash) {
      this.reset();
    } else {
      this.snake.move(this.currentDirection, snakeWillEat);
    }

    snakeWillEat && this.food.remove(this.snake.head);
  };
}

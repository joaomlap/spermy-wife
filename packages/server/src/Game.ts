import { Point, Direction, getDirectionVector } from "./model";
import { Snake, SnakeDto } from "./Snake";
import {
  isInsideGrid,
  containsEqualPoint,
  getRandomPosition,
  isPointEqual,
  sumPoints,
  containsNearPoint,
  getNearPoints,
} from "./helpers";
import { Food } from "./Food";

export type GameState = {
  snakes: Snake[];
  food: Point[];
};

export class Game {
  cols = 848;
  rows = 480;
  state: GameState = {
    snakes: [],
    food: [],
  };

  init = () => {
    this.state.food.push(getRandomPosition(this.rows, this.cols));
  };

  updateState = (newState: GameState) => {
    this.state = newState;
  };

  addSnake = (id: string) => {
    this.state.snakes.push(new Snake(id));
  };

  removeSnake = (snakeId: string) => {
    const index = this.state.snakes.findIndex((snake) => snake.id === snakeId);
    this.state.snakes.splice(index, 1);
  };

  private willSnakeCrash = (nextHead: Point): boolean => {
    let result = true;
    const flatSnakes: Point[] = [];

    this.state.snakes.forEach((snake) => flatSnakes.push(...snake.cells));

    if (isInsideGrid([this.rows, this.cols], nextHead)) {
      result = containsEqualPoint(flatSnakes, nextHead);
    }

    return result;
  };

  private willSnakeEat = (nextHead: Point): Point[] => {
    return getNearPoints(this.state.food, nextHead, 16);
  };

  private renewFood = (points: Point[]) => {
    const newFood = this.state.food.slice();

    points.forEach((point) => {
      const index = newFood.findIndex((f) => isPointEqual(f, point));
      if (index !== -1) {
        newFood.splice(index, 1);

        newFood.push(getRandomPosition(this.rows, this.cols));
      }
    });

    return (this.state.food = newFood);
  };

  loop = () => {
    this.state.snakes.forEach((snake) => {
      if (!snake.cells.length) {
        snake.init(getRandomPosition(this.rows, this.cols));
      }

      const nextHead = sumPoints(
        snake.head,
        getDirectionVector(snake.direction)
      );
      const snakeEatenFood = this.willSnakeEat(nextHead);
      const snakeWillCrash = this.willSnakeCrash(nextHead);

      if (snakeWillCrash) {
        snake.die();
      } else {
        snake.move(snakeEatenFood.length);
      }

      this.renewFood(snakeEatenFood);
    });

    return this.state;
  };

  onDirectionChange = (snakeId: string, direction: Direction) => {
    const snake = this.state.snakes.find((s) => s.id === snakeId);

    if (!snake) {
      return this.state;
    }

    snake.setDirection(direction);
  };
}

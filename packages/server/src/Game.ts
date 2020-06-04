import { Point, Direction, getDirectionVector } from "./model";
import { Snake, SnakeDto } from "./Snake";
import {
  isInsideGrid,
  containsEqualPoint,
  getRandomPosition,
  isPointEqual,
  sumPoints,
} from "./helpers";
import { Food } from "./Food";

export type GameState = {
  snakes: Snake[];
  food: Point[];
};

export class Game {
  cols = 64;
  rows = 64;
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
    console.log(this.state);
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

  private willSnakeEat = (nextHead: Point): boolean => {
    return containsEqualPoint(this.state.food, nextHead);
  };

  private renewFood = (point: Point) => {
    const newFood = this.state.food.slice();
    const index = newFood.findIndex((f) => isPointEqual(f, point));

    if (index !== -1) {
      newFood.splice(index, 1);

      newFood.push(getRandomPosition(this.rows, this.cols));
    }

    return (this.state.food = newFood);
  };

  loop = () => {
    this.state.snakes.forEach((snake) => {
      if (!snake.cells.length) {
        console.log("BEF SNAKE", snake);
        snake.init(getRandomPosition(this.rows, this.cols));
        console.log("SNAKE", snake);
      }

      const nextHead = sumPoints(
        snake.head,
        getDirectionVector(snake.direction)
      );
      const snakeWillEat = this.willSnakeEat(nextHead);
      const snakeWillCrash = this.willSnakeCrash(nextHead);

      if (snakeWillCrash) {
        snake.die();
      } else {
        snake.move(snakeWillEat);
      }

      snakeWillEat && this.renewFood(nextHead);
    });

    return this.state;
  };

  onDirectionChange = (snakeId: string, direction: Direction) => {
    const snake = this.state.snakes.find((s) => s.id === snakeId);

    if (!snake) {
      return this.state;
    }

    snake.direction = direction;
    console.log("STA", this.state);
  };
}

import { Point } from "./model";
import { Snake, SnakeDto } from "./Snake";
import { isInsideGrid, containsEqualPoint, getRandomPosition } from "./helpers";
import { Food } from "./Food";

export type GameState = {
  snakes: SnakeDto[];
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

  addSnake = (id: string) => {
    const newState = { ...this.state };

    newState.snakes.push(
      Snake.toDto(
        new Snake(id, getRandomPosition(this.rows - 4, this.cols - 4))
      )
    );

    return newState;
  };

  removeSnake = (snakeId: string) => {
    const newState = { ...this.state };

    const index = newState.snakes.findIndex((snake) => snake.id === snakeId);
    newState.snakes.splice(index, 1);

    return newState;
  };

  willSnakeCrash = (nextHead: Point): boolean => {
    let result = true;
    const flatSnakes: Point[] = [];

    this.state.snakes.forEach((snake) => flatSnakes.push(...snake.cells));

    if (isInsideGrid([this.rows, this.cols], nextHead)) {
      result = containsEqualPoint(flatSnakes, nextHead);
    }

    return result;
  };

  willSnakeEat = (nextHead: Point): boolean => {
    return containsEqualPoint(this.state.food, nextHead);
  };

  removeFood = (point: Point) => {
    const newFood = this.state.food.slice();
    const index = newFood.findIndex((f) => f === point);

    if (index !== -1) {
      newFood.splice(index, 1);
    }

    return newFood;
  };

  onSnakeMove = (snakeId: string, nextHead: Point): GameState => {
    const newState: GameState = { ...this.state };
    const snakeIndex = newState.snakes.findIndex((snake) => snake.id);
    let snake: Snake;

    if (snakeIndex === -1) {
      console.error("Received unknown id!");

      newState.snakes = this.addSnake(snakeId).snakes;
    } else {
      const snakeDto = newState.snakes[snakeIndex];
      snake = Snake.fromDto(snakeDto);

      if (this.willSnakeCrash(nextHead)) {
        snake.die();
      } else {
        const newFood = this.removeFood(nextHead);
        newState.food = newFood;

        snake.move(nextHead, this.willSnakeEat(nextHead));
      }

      newState.snakes[snakeIndex] = Snake.toDto(snake);
    }

    return newState;
  };
}

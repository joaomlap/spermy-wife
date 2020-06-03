import { Point } from "./model";
import { getRandomColor } from "./helpers";

export enum SnakeState {
  BORN,
  ALIVE,
  DEAD,
}

export type SnakeDto = {
  id: string;
  cells: Point[];
  state: SnakeState;
  color: string;
};

export class Snake {
  cells: Point[] = [];
  state: SnakeState = SnakeState.BORN;
  color: string = getRandomColor();

  constructor(public id: string, head: Point) {
    this.cells.push(head);
    this.state = SnakeState.ALIVE;
  }

  // live = (id: string, point: Point) => {
  //   this.cells.push(point);
  //   this.state = SnakeState.ALIVE;
  // };

  get head() {
    return this.cells[0];
  }

  move = (nextHead: Point, ate: boolean) => {
    this.cells.unshift(nextHead);
    !ate && this.cells.pop();
  };

  die = () => {
    this.cells = [];
    this.state = SnakeState.DEAD;
  };

  static fromDto = (snakeDto: SnakeDto): Snake => {
    const snake = new Snake(snakeDto.id, snakeDto.cells[0]);
    snake.cells = [...snakeDto.cells];
    snake.state = snakeDto.state;
    snake.color = snakeDto.color;

    return snake;
  };

  static toDto = (snake: Snake): SnakeDto => ({
    id: snake.id,
    cells: snake.cells,
    state: snake.state,
    color: snake.color,
  });
}

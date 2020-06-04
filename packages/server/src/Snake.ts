import { Point, Direction, getDirectionVector } from "./model";
import { getRandomColor, sumPoints, getRandomPosition } from "./helpers";

export enum SnakeState {
  BORN,
  ALIVE,
  DEAD,
}

export type SnakeDto = {
  id: string;
  cells: Point[];
  state: SnakeState;
  direction: Direction;
  color: string;
};

export class Snake {
  cells: Point[] = [];
  state: SnakeState = SnakeState.BORN;
  color: string = getRandomColor();
  direction: Direction = Direction.RIGHT;

  constructor(public id: string) {
    // this.cells.push(head);
    this.state = SnakeState.ALIVE;
  }

  init = (point: Point) => {
    this.cells.push(point);
  };

  // live = (id: string, point: Point) => {
  //   this.cells.push(point);
  //   this.state = SnakeState.ALIVE;
  // };

  get head() {
    return this.cells[0];
  }

  move = (ate: boolean) => {
    const directionVector = getDirectionVector(this.direction);

    const newHead: Point = {
      x: this.head.x + directionVector.x,
      y: this.head.y + directionVector.y,
    };

    this.cells.unshift(newHead);
    !ate && this.cells.pop();
  };

  die = () => {
    this.cells = [];
    this.state = SnakeState.DEAD;
  };

  static fromDto = (snakeDto: SnakeDto): Snake => {
    const snake = new Snake(snakeDto.id);
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
    direction: snake.direction,
  });
}

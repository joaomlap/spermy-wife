import { Point, Direction, getDirectionVector } from "./model";
import {
  getRandomColor,
  sumPoints,
  getRandomPosition,
  isDirectionOpposite,
} from "./helpers";

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
    let current = Object.assign({}, point);
    const unitDirection = getDirectionVector(this.direction);

    for (let i = 0; i < 10; i++) {
      this.cells.unshift(current);
      current = sumPoints(point, unitDirection);
    }
    console.log(point, this.cells, this.direction, unitDirection);
  };

  get head() {
    return this.cells[0];
  }

  move = (growLength: number) => {
    const directionVector = getDirectionVector(this.direction);

    const newHead: Point = {
      x: this.head.x + directionVector.x,
      y: this.head.y + directionVector.y,
    };

    this.cells.unshift(newHead);
    growLength < 1 && this.cells.pop();
  };

  die = () => {
    this.cells = [];
    this.state = SnakeState.DEAD;
  };

  setDirection = (direction: Direction) => {
    if (!isDirectionOpposite(this.direction, direction)) {
      this.direction = direction;
    }
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

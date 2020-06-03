import { Snake } from "./Snake";
import { Game } from "./Game";
import { Direction, Point } from "./model";
import io from "socket.io-client";
import { getSocketEndpoint } from "./helpers";

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

type GameState = {
  snakes: SnakeDto[];
  food: Point[];
};

export class App {
  private context: CanvasRenderingContext2D;
  private game: Game = new Game();
  socket: SocketIOClient.Socket;

  constructor(private canvas: HTMLCanvasElement) {
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");

    if (!this.context) {
      throw new Error("Could not find Canvas context!");
    }

    this.socket = io(getSocketEndpoint());
  }

  init = () => {
    // Key events
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          this.game.setDirection(Direction.UP);
          break;
        case "a":
        case "ArrowLeft":
          this.game.setDirection(Direction.LEFT);
          break;
        case "s":
        case "ArrowDown":
          this.game.setDirection(Direction.DOWN);
          break;
        case "d":
        case "ArrowRight":
          this.game.setDirection(Direction.RIGHT);
          break;
      }
    });

    this.socket.on("update", (state: GameState) => {
      console.log(state);
    });

    // requestAnimationFrame(this.step(0));
  };

  // step = (t1: number) => (t2: number) => {
  //   if (t2 - t1 > 20) {
  //     console.log("update", this.game.next());
  //     this.socket.emit("update", this.game.next());
  //     window.requestAnimationFrame(this.step(t2));
  //   } else {
  //     window.requestAnimationFrame(this.step(t1));
  //   }
  // };

  getXGridPoint = (x: number) =>
    Math.round((x * this.canvas.width) / this.game.cols);
  getYGridPoint = (y: number) =>
    Math.round((y * this.canvas.height) / this.game.rows);

  draw = (state: GameState) => {
    // clear
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw snake
    this.context.fillStyle = "rgb(0,200,50)";
    state.snakes.map((snake) =>
      snake.cells.map((cell) =>
        this.context.fillRect(
          this.getXGridPoint(cell.x),
          this.getYGridPoint(cell.y),
          this.getXGridPoint(1),
          this.getYGridPoint(1)
        )
      )
    );

    // draw food
    this.context.fillStyle = "rgb(255,50,0)";
    state.food.map((cell) =>
      this.context.fillRect(
        this.getXGridPoint(cell.x),
        this.getYGridPoint(cell.y),
        this.getXGridPoint(1),
        this.getYGridPoint(1)
      )
    );

    // add crash
    // if (state.snakes.length == 0) {
    //   this.context.fillStyle = "rgb(255,0,0)";
    //   this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // }
  };
}

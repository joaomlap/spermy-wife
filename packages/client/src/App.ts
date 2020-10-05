import { Snake } from "./Snake";
import { Game } from "./Game";
import { Direction, Point } from "./model";
import io from "socket.io-client";
import { getServerEndpoint, lerp } from "./helpers";

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

export type GameState = {
  snakes: SnakeDto[];
  food: Point[];
};

export class App {
  private context: CanvasRenderingContext2D;
  private game: Game = new Game();
  socket: SocketIOClient.Socket;

  constructor(private canvas: HTMLCanvasElement) {
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");

    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;

    if (!this.context) {
      throw new Error("Could not find Canvas context!");
    }

    this.socket = io(getServerEndpoint(), { transports: ["websocket"] });
  }

  init = () => {
    // Key events
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          this.socket.emit("update", { direction: Direction.UP });
          // this.game.setDirection(Direction.UP);
          break;
        case "a":
        case "ArrowLeft":
          this.socket.emit("update", { direction: Direction.LEFT });
          // this.game.setDirection(Direction.LEFT);
          break;
        case "s":
        case "ArrowDown":
          this.socket.emit("update", { direction: Direction.DOWN });
          // this.game.setDirection(Direction.DOWN);
          break;
        case "d":
        case "ArrowRight":
          this.socket.emit("update", { direction: Direction.RIGHT });
          // this.game.setDirection(Direction.RIGHT);
          break;
      }
    });

    this.socket.on("heartbeat", (state: GameState) => {
      this.game.applyState(state);
    });

    requestAnimationFrame(this.step(0));
  };

  step = (t1: number) => (t2: number) => {
    console.log("oi?");
    if (t2 - t1 > 10) {
      this.draw(this.game.getState());
      requestAnimationFrame(this.step(t2));
    } else {
      requestAnimationFrame(this.step(t1));
    }
  };

  getXGridPoint = (x: number) =>
    Math.round((x * this.canvas.width) / this.game.cols);
  getYGridPoint = (y: number) =>
    Math.round((y * this.canvas.height) / this.game.rows);

  draw = (state: GameState) => {
    // clear
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw snake
    state.snakes.map((snake) => {
      this.context.fillStyle = snake.color;
      snake.cells.map((cell) =>
        this.context.fillRect(
          this.getXGridPoint(cell.x),
          this.getYGridPoint(cell.y),
          this.getXGridPoint(4),
          this.getYGridPoint(4)
        )
      );
    });

    // draw food
    this.context.fillStyle = "rgb(255,50,0)";
    state.food.map((cell) =>
      this.context.fillRect(
        this.getXGridPoint(cell.x),
        this.getYGridPoint(cell.y),
        this.getXGridPoint(4),
        this.getYGridPoint(4)
      )
    );

    // add crash
    // if (state.snakes.length == 0) {
    //   this.context.fillStyle = "rgb(255,0,0)";
    //   this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // }
  };
}

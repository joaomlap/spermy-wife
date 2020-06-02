import { Snake } from "./Snake";
import { Game } from "./Game";
import { Direction, Point } from "./model";
import io from "socket.io-client";

export class App {
  private context: CanvasRenderingContext2D;
  private game: Game = new Game();

  constructor(private canvas: HTMLCanvasElement) {
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");

    if (!this.context) {
      throw new Error("Could not find Canvas context!");
    }

    io(process.env.API || "http://localhost:3000", { path: "/socket.io" });
  }

  init = () => {
    // Key events
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
        case "h":
        case "ArrowUp":
          console.log("UP");
          this.game.setDirection(Direction.UP);
          break;
        case "a":
        case "j":
        case "ArrowLeft":
          console.log("LEFT");
          this.game.setDirection(Direction.LEFT);
          break;
        case "s":
        case "k":
        case "ArrowDown":
          console.log("DOWN");
          this.game.setDirection(Direction.DOWN);
          break;
        case "d":
        case "l":
        case "ArrowRight":
          console.log("RIGHT");
          this.game.setDirection(Direction.RIGHT);
          break;
      }
    });

    this.draw();
    requestAnimationFrame(this.step(0));
  };

  step = (t1: number) => (t2: number) => {
    if (t2 - t1 > 20) {
      this.game.next();
      this.draw();
      window.requestAnimationFrame(this.step(t2));
    } else {
      window.requestAnimationFrame(this.step(t1));
    }
  };

  getXGridPoint = (x: number) =>
    Math.round((x * this.canvas.width) / this.game.cols);
  getYGridPoint = (y: number) =>
    Math.round((y * this.canvas.height) / this.game.rows);

  draw = () => {
    // clear
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw snake
    this.context.fillStyle = "rgb(0,200,50)";
    this.game.snake.cells.map((cell) =>
      this.context.fillRect(
        this.getXGridPoint(cell.x),
        this.getYGridPoint(cell.y),
        this.getXGridPoint(1),
        this.getYGridPoint(1)
      )
    );

    // draw food
    this.context.fillStyle = "rgb(255,50,0)";
    this.game.food.cells.map((cell) =>
      this.context.fillRect(
        this.getXGridPoint(cell.x),
        this.getYGridPoint(cell.y),
        this.getXGridPoint(1),
        this.getYGridPoint(1)
      )
    );

    // add crash
    if (this.game.snake.cells.length == 0) {
      this.context.fillStyle = "rgb(255,0,0)";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };
}

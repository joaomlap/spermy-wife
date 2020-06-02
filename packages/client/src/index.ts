import { App } from "./App";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");

// function resizeCanvas() {
//   canvas.style.width = window.innerWidth + "px";
//   setTimeout(function () {
//     canvas.style.height = window.innerHeight + "px";
//   }, 0);
// }

// // Webkit/Blink will fire this on load, but Gecko doesn't.
// window.onresize = resizeCanvas;

// // So we fire it manually...
// resizeCanvas();

if (!canvas) {
  throw new Error("Canvas could not be found!");
}

const app = new App(canvas);

app.init();

import Express from "express";
import bodyParser from "body-parser";
import socketIo from "socket.io";
import http from "http";
import { Game } from "./Game";

function main() {
  const app = Express();
  const server = http.createServer(app);
  const io = socketIo(server);

  const middlewares = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
  ];

  app.use(middlewares);

  // move this later...
  const game = new Game();
  game.init();

  io.on("connection", (socket) => {
    console.log("A user connected.", socket);
    game.addSnake(socket.id);

    socket.on("update", (data) => {
      game.onSnakeMove(socket.id, data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      game.removeSnake(socket.id);
    });
  });

  setInterval(() => {
    io.sockets.emit("update", game.state);
  }, 20);

  server.listen(5000, () =>
    console.log("Spermy Wife is listening on port 5000")
  );
}

main();

import Express from "express";
import bodyParser from "body-parser";
import socketIo from "socket.io";
import http from "http";

function main() {
  const app = Express();
  const server = http.createServer(app);
  const io = socketIo(server);

  app.use([bodyParser.json(), bodyParser.urlencoded({ extended: false })]);

  io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  server.listen(5000, () =>
    console.log("Spermy Wife is listening on port 5000")
  );
}

main();

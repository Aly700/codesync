const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

app.get("/", (_req, res) => {
  res.json({ status: "CodeSync server running" });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`CodeSync server listening on port ${PORT}`);
});

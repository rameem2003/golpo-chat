const { Server } = require("socket.io");
const { verifyJWTToken } = require("../services/auth.service");
const { registerUserEvents } = require("./userEvents");
const { setSocketStore } = require("./socket-store");

const onlineUsers = new Map();

const initSocket = (server) => {
  console.log("Socket");

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decode = verifyJWTToken(token);

    if (!decode) {
      return next(new Error("Authentication error"));
    }

    console.log("socket" + JSON.stringify(decode));

    let user = decode;
    socket.data = user;
    socket.data.id = decode.id;

    next();
  });

  io.on("connection", (socket) => {
    const userId = socket.data.id;
    console.log(`User connected: ${userId}, username: ${socket.data.name}`);

    onlineUsers.set(userId, socket.id);

    registerUserEvents(io, socket, onlineUsers);
    setSocketStore(io, onlineUsers);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${userId}`);
      onlineUsers.delete(userId);
    });
  });

  return io;
};

module.exports = { initSocket };

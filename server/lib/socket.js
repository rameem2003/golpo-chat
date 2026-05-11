const { Server } = require("socket.io");
const userModel = require("../models/user.model");

let io = null;

// userId -> socket count
const onlineUsers = new Map();

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  //   io.on("connection", (socket) => {
  //     socket.on("user:join", async (userId) => {
  //       socket.userId = userId;
  //       socket.join(userId);

  //       const count = onlineUsers.get(userId) || 0;
  //       onlineUsers.set(userId, count + 1);

  //       // first active connection
  //       if (count === 0) {
  //         io.emit("user:online", {
  //           userId,
  //           status: "online",
  //         });
  //       }

  //       console.log(userId, "online");
  //       // update status to active
  //       await userModel.findByIdAndUpdate(userId, {
  //         active: true,
  //         lastSeen: new Date(),
  //       });
  //     });

  //     socket.on("disconnect", async () => {
  //       const userId = socket.userId;

  //       if (!userId) return;

  //       const count = onlineUsers.get(userId) || 0;

  //       if (count <= 1) {
  //         onlineUsers.delete(userId);

  //         io.emit("user:offline", {
  //           userId,
  //           status: "offline",
  //         });

  //         console.log(userId, "offline");
  //         // update status to inactive
  //         await userModel.findByIdAndUpdate(userId, {
  //           active: false,
  //           lastSeen: new Date(),
  //         });
  //       } else {
  //         onlineUsers.set(userId, count - 1);
  //       }
  //     });

  //     // typing start
  //     socket.on("typing:start", ({ receiverId, senderId }) => {
  //       io.to(receiverId).emit("typing:start", {
  //         senderId,
  //       });
  //     });

  //     // typing stop
  //     socket.on("typing:stop", ({ receiverId, senderId }) => {
  //       io.to(receiverId).emit("typing:stop", {
  //         senderId,
  //       });
  //     });
  //   });

  io.on("connection", (socket) => {
    // console.log(socket);
    console.log(onlineUsers);

    socket.on("user:join", async (userId) => {
      console.log("Join " + userId);

      socket.userId = userId;

      socket.join(userId);

      const count = onlineUsers.get(userId) || 0;
      onlineUsers.set(userId, count + 1);

      if (count === 0) {
        io.emit("user:online", { userId });
      }
    });

    socket.on("disconnect", async () => {
      // console.log(onlineUsers);
      const userId = socket.userId;
      if (!userId) return;

      const count = onlineUsers.get(userId) || 0;

      if (count <= 1) {
        onlineUsers.delete(userId);

        io.emit("user:offline", { userId });

        await userModel.findByIdAndUpdate(userId, {
          lastSeen: new Date(),
        });
      } else {
        onlineUsers.set(userId, count - 1);
      }
    });

    socket.on("typing:start", ({ receiverId }) => {
      io.to(receiverId).emit("typing:start", {
        senderId: socket.userId,
      });
    });

    socket.on("typing:stop", ({ receiverId }) => {
      io.to(receiverId).emit("typing:stop", {
        senderId: socket.userId,
      });
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }

  return io;
};

module.exports = {
  initSocket,
  getIO,
};

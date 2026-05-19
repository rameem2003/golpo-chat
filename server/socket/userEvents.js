const registerUserEvents = (io, socket) => {
  socket.on("testSocket", (data) => {
    socket.emit("testSocket", {
      message: "This is a test event from the server!",
    });
  });
};

module.exports = { registerUserEvents };

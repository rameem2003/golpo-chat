const registerChatEvents = (io, socket) => {
  // join chat room
  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.data.id} joined chat ${chatId}`);
  });

  // leave chat room
  socket.on("leave-chat", (chatId) => {
    socket.leave(chatId);
    console.log(`User ${socket.data.id} left chat ${chatId}`);
  });

  // typing event
  socket.on("typing", ({ chatId, userId, userName }) => {
    socket.to(chatId).emit("user-typing", {
      userId,
      userName,
    });
  });

  // Stop Typing
  socket.on("stop-typing", ({ chatId, userId }) => {
    socket.to(chatId).emit("user-stop-typing", {
      userId,
    });
  });
};

module.exports = { registerChatEvents };

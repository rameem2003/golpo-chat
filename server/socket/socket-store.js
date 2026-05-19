let io = null;
let onlineUsers = null;

const setSocketStore = (socketIO, users) => {
  io = socketIO;
  onlineUsers = users;
};

const getIO = () => io;

const getOnlineUsers = () => onlineUsers;

module.exports = {
  setSocketStore,
  getIO,
  getOnlineUsers,
};

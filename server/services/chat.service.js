const chatModel = require("../models/chat.model");

const getUserChats = async (userId) => {
  let res = await chatModel
    .find({
      users: userId,
    })
    .populate("users", "name email avatar")
    .populate("admin", "name email avatar")
    .sort({ updatedAt: -1 });

  // set the chat name for private chats name will be the name of the other user
  res = res.map((chat) => {
    if (!chat.isGroupChat) {
      const otherUser = chat.users.find(
        (user) => user._id.toString() !== userId,
      );
      chat.chatName = otherUser.name;
    }
    return chat;
  });
  return res;
};

const findExistingPrivateChat = async (user1, user2) => {
  let res = await chatModel
    .findOne({
      isGroupChat: false,
      users: { $all: [user1, user2] },
    })
    .populate("users", "name email avatar")
    .populate("admin", "name email avatar");

  return res;
};

const createPrivateChat = async (user1, user2) => {
  let res = await chatModel.create({
    isGroupChat: false,
    users: [user1, user2],
  });

  return res;
};

module.exports = {
  getUserChats,
  findExistingPrivateChat,
  createPrivateChat,
};

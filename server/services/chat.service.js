const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");

// get all chats for a user, including the users in the chat and the admin of the chat, sorted by updatedAt in descending order
const getUserChats = async (userId) => {
  let res = await chatModel
    .find({
      users: userId,
    })
    .populate("users", "name email avatar")
    .populate("admin", "name email avatar")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    })
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

// find users by chat id
const findUsersByChatId = async (chatId) => {
  let res = await chatModel.findById(chatId).populate("users");
  // .populate("admin", "name email avatar");

  return res.users;
};

// find if a private chat already exists between two users, if it does return the chat, if it doesn't return null
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

// create a private chat between two users
const createPrivateChat = async (user1, user2) => {
  let res = await chatModel.create({
    isGroupChat: false,
    users: [user1, user2],
  });

  return res;
};

// get all messages for a chat, including the sender of the message, sorted by createdAt in ascending order
const getMessages = async (chatId, page = 1) => {
  // const limit = 20;

  return await messageModel
    .find({
      chat: chatId,
    })
    .populate("sender", "name email avatar")
    .sort({ createdAt: 1 });
  // .skip((page - 1) * limit)
  // .limit(limit);
};

// Send Message to a chat
const createMessage = async (sender, chat, content, media) => {
  let msg = await messageModel.create({
    sender,
    chat,
    content,
    media,
    readBy: [sender],
  });

  await chatModel.findByIdAndUpdate(chat, {
    updatedAt: Date.now(),
    latestMessage: msg._id,
  });

  return await messageModel
    .findById(msg._id)
    .populate("sender", "name email avatar")
    .populate("chat");
};

module.exports = {
  getUserChats,
  findUsersByChatId,
  findExistingPrivateChat,
  createPrivateChat,
  createMessage,
  getMessages,
};

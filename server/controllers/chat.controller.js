const { findUserById } = require("../services/auth.service");
const {
  getUserChats,
  createMessage,
  getMessages,
  findUsersByChatId,
} = require("../services/chat.service");
const { sendPushNotification } = require("../services/notification.service");
const { getIO, getOnlineUsers } = require("../socket/socket-store");

/**
 * Get all chats for a user,
 * including the users in the chat and the admin of the chat,
 * sorted by updatedAt in descending order
 */
const getAllChats = async (req, res) => {
  let userId = req.user.id;
  try {
    let chats = await getUserChats(userId);
    res.status(200).send({
      success: true,
      data: chats,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Failed to fetch chats",
      error: err.message,
    });
  }
};

/**
 * Get all messages for a chat, including the sender of the message, sorted by createdAt in ascending order
 */
const getChatMessages = async (req, res) => {
  let { chatId } = req.params;
  try {
    let messages = await getMessages(chatId);

    res.status(200).send({ success: true, data: messages });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};

/**
 * Send a message in a chat
 */
const sendMessage = async (req, res) => {
  const io = getIO();
  const onlineUsers = getOnlineUsers();
  const sender = req.user.id;
  const { chatId, content } = req.body;
  // get the media files from the request, if any
  let media = req.files.length > 0 ? req.files.map((file) => file.filename) : [];

  // formated content message with media files if the user dont write any content but upload media files, the content will be "Sent a media file" or "Sent X media files"
  if (!content && media.length > 0) {
    content = media.length === 1 ? "Sent an attachment" : `Sent ${media.length} attachments`;
  }

  try {
    let message = await createMessage(sender, chatId, content, media);

    let users = await findUsersByChatId(chatId);
    console.log(users);

    users.forEach((user) => {
      let userSocketId = onlineUsers.get(user._id.toString());
      console.log("userSocketId", userSocketId);
      io.to(userSocketId).emit("chat:message:new", { message });
    });

    let receiver = users.find((user) => user._id.toString() !== sender).id;
    let receiverUser = await findUserById(receiver);
    let senderUser = await findUserById(sender);

    await sendPushNotification(
      receiverUser.notificationToken,
      senderUser.name,
      message.content,
      {},
    );

    res.status(200).send({ success: true, data: message });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

module.exports = {
  getAllChats,
  getChatMessages,
  sendMessage,
};

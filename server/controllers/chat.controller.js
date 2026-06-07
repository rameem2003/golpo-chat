const {
  getUserChats,
  createMessage,
  getMessages,
} = require("../services/chat.service");

/**
 * Get all chats for a user,
 * including the users in the chat and the admin of the chat,
 * sorted by updatedAt in descending order
 */
const getAllChats = async (req, res) => {
  let userId = req.user.id;
  try {
    let chats = await getUserChats(userId);
    res.status(200).send(chats);
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
  const sender = req.user.id;
  const { chatId, content } = req.body;

  try {
    let message = await createMessage(sender, chatId, content);

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

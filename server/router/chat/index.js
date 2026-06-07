const {
  getAllChats,
  sendMessage,
  getChatMessages,
} = require("../../controllers/chat.controller");
const verifyAuthentication = require("../../middlewares/middleware");

const router = require("express").Router();

/**
 * Get all chat
 * https://localhost:5000/api/v1/chats
 */
router.get("/chats", verifyAuthentication, getAllChats);

/**
 * Get all messages for a chat
 * https://localhost:5000/api/v1/chats/:chatId/messages
 */
router.get("/chats/:chatId/messages", verifyAuthentication, getChatMessages);

/**
 * Send a message in a chat
 * https://localhost:5000/api/v1/chats/message
 */
router.post("/chats/message", verifyAuthentication, sendMessage);

module.exports = router;

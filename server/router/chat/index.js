const {
  getAllChats,
  sendMessage,
  getChatMessages,
} = require("../../controllers/chat.controller");
const createUploadMiddleware = require("../../middlewares/fileUpload");
const verifyAuthentication = require("../../middlewares/middleware");

const router = require("express").Router();
const upload = createUploadMiddleware({ type: "media" });

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
router.post("/chats/message", verifyAuthentication, upload.array("media"), sendMessage);

module.exports = router;

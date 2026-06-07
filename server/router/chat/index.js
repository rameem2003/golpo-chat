const { getAllChats } = require("../../controllers/chat.controller");
const verifyAuthentication = require("../../middlewares/middleware");

const router = require("express").Router();

/**
 * Get all chat
 * https://localhost:5000/api/v1/chats
 */
router.get("/chats", verifyAuthentication, getAllChats);

module.exports = router;

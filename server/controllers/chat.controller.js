const { getUserChats } = require("../services/chat.service");

const getAllChats = async (req, res) => {
  let userId = req.user.id;
  try {
    let chats = await getUserChats(userId);
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};

module.exports = {
  getAllChats,
};

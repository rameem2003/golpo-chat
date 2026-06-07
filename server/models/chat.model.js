const { default: mongoose } = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    isGroupChat: Boolean,
    chatName: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chat", chatSchema);

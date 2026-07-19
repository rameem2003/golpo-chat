const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content: String,
    media: [String],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

schema.index({ chat: 1, createdAt: -1 });

module.exports = mongoose.model("Message", schema);

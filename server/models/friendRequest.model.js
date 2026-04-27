const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "accepted"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("FriendRequest", schema);
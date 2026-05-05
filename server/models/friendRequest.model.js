const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

// A pair of users should not have more than one pending request
schema.index({ sender: 1, receiver: 1, status: 1 }, { unique: true, partialFilterExpression: { status: "pending" } });

module.exports = mongoose.model("FriendRequest", schema);
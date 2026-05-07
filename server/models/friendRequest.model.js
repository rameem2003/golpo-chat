const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema(
  {
    // normalized pair
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // who initiated
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // who receives
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled"],
      default: "pending",
    },

    actionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

friendRequestSchema.index(
  {
    user1: 1,
    user2: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: "pending",
    },
  },
);

module.exports = mongoose.model("FriendRequest", friendRequestSchema);

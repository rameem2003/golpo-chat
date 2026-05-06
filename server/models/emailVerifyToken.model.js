const { default: mongoose } = require("mongoose");

const emailVerifyTokenSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: Number,
  expiresAt: {
    type: Date,
    default: Date.now,
    // expires: 2 * 60, // 2 minutes (in seconds)
  },
});

module.exports = mongoose.model("EmailVerifyToken", emailVerifyTokenSchema);

/**
 * Create TTL for 2 minutes
 */
emailVerifyTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 2 * 60 });

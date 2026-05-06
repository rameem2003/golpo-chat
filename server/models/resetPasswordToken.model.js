const { default: mongoose } = require("mongoose");

const resetPasswordTokenSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: Number,
  expiresAt: {
    type: Date,
    default: Date.now,
    // expires: 15 * 60, // 15 minutes (in seconds)
  },
});

/**
 * Create TTL for 15 minutes
 */

resetPasswordTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 15 * 60 },
);

module.exports = mongoose.model("ResetPasswordToken", resetPasswordTokenSchema);

const {
  sendFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
} = require("../../controllers/friendRequest.controller");
const verifyAuthentication = require("../../middlewares/middleware");

const router = require("express").Router();

/**
 * Send friend request route
 * https://localhost:5000/api/v1/friend-request/send/:userId
 */
router.post(
  "/friend-request/send/:userId",
  verifyAuthentication,
  sendFriendRequest,
);

/**
 * Get sent friend requests route
 * https://localhost:5000/api/v1/friend-request/sent
 */
router.get("/friend-request/sent", verifyAuthentication, getSentFriendRequests);

/**
 * Get received friend requests route
 * https://localhost:5000/api/v1/friend-request/received
 */
router.get(
  "/friend-request/received",
  verifyAuthentication,
  getReceivedFriendRequests,
);

module.exports = router;

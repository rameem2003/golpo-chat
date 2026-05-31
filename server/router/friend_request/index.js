const {
  sendFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  findFriend,
} = require("../../controllers/friendRequest.controller");
const verifyAuthentication = require("../../middlewares/middleware");

const router = require("express").Router();

/**
 * Find friend by name route
 * https://localhost:5000/api/v1/friend-request/search?name=John
 */
router.get("/friend-request/search", verifyAuthentication, findFriend);

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
 * Accept friend request route
 * https://localhost:5000/api/v1/friend-request/accept/:requestId
 */
router.post(
  "/friend-request/accept/:requestId",
  verifyAuthentication,
  acceptFriendRequest,
);

/**
 * Reject friend request route
 * https://localhost:5000/api/v1/friend-request/reject/:requestId
 */
router.post(
  "/friend-request/reject/:requestId",
  verifyAuthentication,
  rejectFriendRequest,
);

/**
 * Cancel friend request route
 * https://localhost:5000/api/v1/friend-request/cancel/:requestId
 */
router.post(
  "/friend-request/cancel/:requestId",
  verifyAuthentication,
  cancelFriendRequest,
);

module.exports = router;

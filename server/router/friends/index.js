const { getAllFriends } = require("../../controllers/friendship.controller");
const verifyAuthentication = require("../../middlewares/middleware");

const router = require("express").Router();

/**
 * Get all friends route
 * https://localhost:5000/api/v1/friends
 */
router.get("/friends", verifyAuthentication, getAllFriends);

module.exports = router;

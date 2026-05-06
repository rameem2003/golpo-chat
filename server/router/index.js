const router = require("express").Router();

const auth = require("./auth");
const friendRequest = require("./friend_request");
const api_base = process.env.API_VERSION_BASE || "/api/v1";

/**
 * Auth Routes
 * https://localhost:5000/api/v1/auth
 */
router.use(api_base, auth);

/**
 * Friend Request Routes
 * https://localhost:5000/api/v1/friend-request
 */
router.use(api_base, friendRequest);

module.exports = router;

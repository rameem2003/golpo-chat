const router = require("express").Router();

const auth = require("./auth");
const api_base = process.env.API_VERSION_BASE || "/api/v1";


/**
 * Auth Routes
 * https://localhost:5000/api/v1/auth
 */
router.use(api_base, auth);



module.exports = router;

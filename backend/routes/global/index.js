const router = require("express").Router();
const controller = require("./controller");

router.post("/searchuser", controller.searchuser);

module.exports = router
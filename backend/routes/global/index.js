const router = require("express").Router();
const controller = require("./controller");

router.post("/searchuser", controller.searchuser);
router.post("/getusers", controller.getusers);

module.exports = router
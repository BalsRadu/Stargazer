const router = require("express").Router();
const controller = require("./controller");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/deletepost", controller.deletePost);


module.exports = router



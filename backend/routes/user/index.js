const router = require("express").Router();
const controller = require("./controller");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/getprofile", controller.getProfile);
router.post("/getsearchedprofile", controller.getsearchedprofile);
router.post("/editprofile", controller.editprofile);
router.post("/follow", controller.follow);
router.post("/unfollow", controller.unfollow);

module.exports = router;

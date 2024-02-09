const router = require("express").Router();
const userController = require("../../controllers/api/user.controller");

router.get("/list", userController.list);
router.post("/view", userController.view);
router.post("/addEdit", userController.addEdit);
router.post("/delete", userController.delete);
module.exports = router;

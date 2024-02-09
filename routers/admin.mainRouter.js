const router = require("express").Router();
const adminRouter = require("../routers/admin/admin.router");

router.use("/admin", adminRouter);
// router.use("/testeminials", adminRouter);

module.exports = router;
